import "./BlogItem.css";

import { Blog } from "../../../../interfaces/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "http://localhost:3454/public/uploads/profileImages";
const API_DELETE_Blog = "http://localhost:3454/blogs";

type BlogItemProps = {
    blog: Blog;
    onClick: () => void;
    fetchAfterEvent: () => void;
};

const BlogItem = ({ blog, onClick, fetchAfterEvent }: BlogItemProps) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const isLoggedIn = Boolean(localStorage.getItem("loggedIn")) || false;
    const userId = String(localStorage.getItem("userId")) || "";

    const handleDelete = async (blogId: string) => {
        setError(null);
        try {
            const response = await fetch(`${API_DELETE_Blog}/${blogId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + `${localStorage.getItem("accessToken")}`,
                },
            });

            if (!response.ok) {
                console.error("Failed to delete, try again.");
                setError("Unable to delete as you are not authorised");
            } else {
                fetchAfterEvent();
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            setError("Failed to delete, try again");
        }
    };

    const handleUpdate = async (blogId: string) => {
        navigate(`/blog/edit/${blogId}`, { replace: true })
    };

    return (
        <>
            {error !== null && (
                <div className="-mb-7 w-full">
                    <h4 className="text-red-600">{error}</h4>
                </div>
            )}
            <div
                className="blog-item bg-slate-100 p-4 my-8 rounded-md shadow-xl"
                onClick={onClick}
            >
                <h3 className="">{blog.title}</h3>
                <div
                    id="blogHeader"
                    className="flex flex-col sm:flex-row justify-between"
                >
                    <div className="blog-meta">
                        {blog.authorId.profileImage ? (
                            <img
                                src={`${IMAGE_BASE_URL}/${blog.authorId.profileImage}`}
                                alt={`${blog.authorId.username}`}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                        ) : (
                            <i className="las la-user-circle la-3x mr-4"></i>
                        )}
                        <div className="author-details text-left">
                            <p className="text-2xl">{blog.authorId.username}</p>
                            <p className="text-gray-500 text-sm">
                                {new Date(blog.createdAt).toDateString()}
                            </p>
                        </div>
                    </div>
                    {(isLoggedIn && (userId === blog.authorId._id)) && (
                        <div id="buttonPair" className="">
                            <button
                                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 my-2 mr-3 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdate(blog._id);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(blog._id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-gray-500 mt-8">
                    {blog.content.slice(0, 100)}...
                </p>
            </div>
        </>
    );
};

export default BlogItem;
