import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const API_ROUTE = "http://localhost:3454/auth/login";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        };

        try {
            const response = await fetch(API_ROUTE, requestOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            const { token, profileImageUrl, username, userId } = data;
            console.log(data);

            localStorage.setItem("accessToken", token);
            localStorage.setItem("profileImageUrl", profileImageUrl);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("userId", userId);
            localStorage.setItem("loggedIn", "true");

            navigate("/blogs", { replace: true })
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <div className="formContainer">
            <div className="heading my-4 w-full max-w-7xl">
                <h2 className="pl-8">Login</h2>
            </div>
            {(error !== null) && (
                <div className="my-2 w-full max-w-7xl">
                        <h4 className="pl-8 text-red-600">{error}</h4>
                </div>
            )}
            <div className="w-full max-w-7xl">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="john.doe@mail.com"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between text-center flex-col-reverse lg:flex-row">
                        <button
                            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <a
                            className="inline-block align-baseline my-2 font-bold text-sm text-gray-900 hover:text-gray-500"
                            href="/signup"
                        >
                            Don't have an account yet? Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
