import './UserMenu.css'

import { useNavigate } from 'react-router-dom'

type UserMenuProps = {
    closeSelf: () => void,
}

export default function UserMenu({ closeSelf }: UserMenuProps) {
    const username = localStorage.getItem("username") || "Unknown"
    const email = localStorage.getItem("email") || "Unknown"

    const navigate = useNavigate();

    const API_LOGOUT = "http://localhost:3454/auth/logout"

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        closeSelf();

        const response = await fetch(API_LOGOUT, {
            method: "GET",
            headers: {'Authorization': 'Bearer ' + `${localStorage.getItem("accessToken")}`}
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        localStorage.clear();
        navigate("/", { replace: true });
    }

    return (
        <div className="userMenu shadow-xl bg-zinc-300">
            <div className="userProfile">
                <p className="username">
                    <h4>{username}</h4>
                </p>
                <p className="useremail">{email}</p>
            </div>
            <ul className="userlinks">
                {/* <li className="userlink bg-slate-100">
                    <a href="">
                        <p>
                            <i className="c-icon-sm las la-user-circle la-lg"></i>
                            Profile
                        </p>
                    </a>
                </li> */}
                <li className="userlink bg-slate-100">
                    <a onClick={(e) => handleLogout(e)}>
                        <p>
                            <i className="c-icon-sm las la-sign-out-alt la-lg"></i>
                            Logout
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    );
}
