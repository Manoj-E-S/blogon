import "./Search.css";

import { useState } from "react";

import { Blog } from '../../interfaces/database'

const API_SEARCH_blogs = "http://localhost:3454/blogs/search?q"

type SearchProps = {
    blogResponseSetter: (data: Blog[]) => void,
}

export default function Search({ blogResponseSetter}: SearchProps) {
    const [query, setQuery] = useState<string>("");

    const doSearch = async () => {
        try {
            const response = await fetch(`${API_SEARCH_blogs}=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
            console.log(data);

            if(response.ok) {
                blogResponseSetter(data);
            } else {
                console.error("Could not Search...")
            }

        } catch (ex) {
            console.error(ex);
        }
    }

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        doSearch();
    }

    return (
        <form className="mx-auto mb-12 -mt-12" onSubmit={handleSearch}>
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Search tags, categories, content..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-4 py-2"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
