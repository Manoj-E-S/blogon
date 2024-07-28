import "./BlogDetail.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Blog } from "../../../../interfaces/database";
import Line from "../../Line/Line";

const API_URL = "http://localhost:3454/blogs";
const PROFILE_IMAGE_BASE_URL =
    "http://localhost:3454/public/uploads/profileImages";

const BlogDetail = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`${API_URL}/${blogId}`);
            const data: Blog = await response.json();
            setBlog(data);
        };
        fetchBlog();
    }, [blogId]);

    if (!blog) return <p>Loading...</p>;

    const paras: string[] = blog.content.split("\n");

    return (
        <div className="w-full">
            {blog.coverImage && (
                <div className="w-full h-[25rem] -mt-28 mb-10">
                    <img
                        src={`${blog.coverImage}`}
                        alt=""
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            )}
            <div className="w-full px-20">
                <div className="flex flex-col md:flex-row justify-between">
                    <h1 className="charmonman-bold">{blog.title}</h1>
                    <div className="blog-meta">
                        <div className="author-details text-end">
                            <p className="text-2xl">{blog.authorId.username}</p>
                            <p className="text-gray-500 text-sm">
                                {new Date(blog.createdAt).toDateString()}
                            </p>
                        </div>
                        {blog.authorId.profileImage ? (
                            <img
                                src={`${PROFILE_IMAGE_BASE_URL}/${blog.authorId.profileImage}`}
                                alt={`${blog.authorId.username}`}
                                className="w-12 h-12 rounded-full ml-4"
                            />
                        ) : (
                            <i className="c-icon las la-user-circle la-3x ml-4"></i>
                        )}
                    </div>
                </div>
                <Line className="mt-2 mb-2" />
                <div className="blog-content mt-10 text-justify">
                    {paras.map((para, idx) => {
                        return (
                            <>
                                <p className="my-10" key={idx}>
                                    {para}
                                </p>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
