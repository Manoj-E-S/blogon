import "./EditBlog.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "../../../../interfaces/database";

const API_PUT_blog = "http://localhost:3454/blogs";
const API_GET_categories = "http://localhost:3454/categories";
const API_GET_blog = "http://localhost:3454/blogs";

const CreateBlog: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [existingImageUrl, setExistingImageUrl] = useState<string>("");
    const [newTag, setNewTag] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);

    const navigate = useNavigate();

    const { blogId } = useParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(API_GET_categories, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setCategories(data);
                    setSelectedCategory(data[0]._id);
                } else {
                    console.error("Failed to get categories");
                }
            } catch (error) {
                console.error("Error getting categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${API_GET_blog}/${blogId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    setTitle(data.title);
                    setContent(data.content);
                    setTags(data.tags);
                    setSelectedCategory(data.category);
                    setExistingImageUrl(data.coverImage);
                } else {
                    console.error("Failed to get categories");
                }
            } catch (error) {
                console.error("Error getting categories:", error);
            }
        };

        fetchBlog();
    }, [blogId]);

    const handleEditBlog = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("tags", JSON.stringify(tags));
        formData.append("content", content);
        formData.append("category", selectedCategory);
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }

        try {
            const response = await fetch(`${API_PUT_blog}/${blogId}`, {
                method: "PUT",
                headers: {
                    Authorization:
                        "Bearer " + `${localStorage.getItem("accessToken")}`,
                },
                body: formData,
            });

            if (response.ok) {
                navigate("/blogs", { replace: true });
            } else {
                console.error("Failed to edit blog");
                setError("Failed to edit blog");
            }
        } catch (error) {
            console.error("Error editing blog:", error);
            setError("Error editing blog");
        }
    };

    const addNewTag = () => {
        if (newTag && newTag !== "") {
            setTags((oldTags) => {
                return [newTag, ...oldTags];
            });
            setNewTag("");
        }
    };

    const removeTag = (targetIndex: number) => {
        setTags(tags.filter((_, index) => index !== targetIndex));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCoverImage(e.target.files[0]);
        }
    };

    return (
        <div className="formContainer">
            <div className="heading my-4 w-full max-w-7xl">
                <h2 className="pl-8">Edit {title}</h2>
            </div>
            {error !== null && (
                <div className="my-2 w-full max-w-7xl">
                    <h4 className="pl-8 text-red-600">{error}</h4>
                </div>
            )}
            <div className="w-full max-w-7xl">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleEditBlog}
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="content"
                        >
                            Content
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="content"
                            rows={30}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="tags"
                        >
                            Tags
                        </label>
                        <div id="tags">
                            {tags.map((tag, index) => {
                                return (
                                    <div
                                        className="tag flex flex-col lg:flex-row"
                                        key={index}
                                    >
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id={`tag-${index}`}
                                            value={tag}
                                            disabled
                                        />
                                        <button
                                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => removeTag(index)}
                                        >
                                            -
                                        </button>
                                    </div>
                                );
                            })}
                            <div className="tag flex flex-col lg:flex-row">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    id={`newTag`}
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                />
                                <button
                                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={addNewTag}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="categories"
                        >
                            Categories
                        </label>
                        <select
                            id="categories"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            name="categories"
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            {categories.map((category, index) => {
                                return (
                                    <option
                                        className="category"
                                        id={`category-${index}`}
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {existingImageUrl && (
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Current Image
                            </label>
                                <img
                                    src={existingImageUrl}
                                    alt="Current blog"
                                    width="200"
                                />
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="coverImage"
                        >
                            Change Cover Image
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="coverImage"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Edit Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
