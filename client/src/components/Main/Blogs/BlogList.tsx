import './BlogList.css';

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Blog } from '../../../interfaces/database'
import Line from '../Line/Line';
import BlogItem from './BlogItem/BlogItem';
import Search from '../../Search/Search';

const API_URL = 'http://localhost:3454/blogs';

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagination, setPagination] = useState<boolean>(true);
    
    const navigate = useNavigate();
    const { authorId } = useParams();

    const isLoggedIn = Boolean(localStorage.getItem("loggedIn")) || false

    const fetchBlogs = useCallback(async (page: number) => {
        try {
            let response;
            if (authorId !== undefined) {
                response = await fetch(`${API_URL}/author/${authorId}?page=${page}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + `${localStorage.getItem("accessToken")}`,
                    }
                })
            } else {
                response = await fetch(`${API_URL}?page=${page}`);
            }
            
            const data = await response.json();
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }, [authorId]);
    
    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage, fetchBlogs]);
    
    const fetchAfterEvent = () => {
        fetchBlogs(currentPage);
    }
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    const handleBlogClick = (blogId: string) => {
        navigate(`/blog/${blogId}`);
    };
    
    const handleCreateBlog = () => {
        navigate("/blogs/new", { replace: true })
    };
    
    const blogResponseSetter = (blogs: Blog[]) => {
        setBlogs(blogs);
        setPagination(false);
    }
    
    if(!blogs) {
        return <p>Loding...</p>
    }
    
    return (
        <div className="w-full px-20">
            {(authorId === undefined) && (
                <Search blogResponseSetter={blogResponseSetter} />
            )}
            <div className="flex flex-col md:flex-row justify-between">
                <h1 className="charmonman-bold">Blogs</h1>
                {isLoggedIn && (
                    <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 max-w-24 rounded focus:outline-none focus:shadow-outline self-end" onClick={handleCreateBlog}> <h4>+</h4> Blog</button>
                )}
            </div>
            {isLoggedIn ? (
                <Line className="-mt-6 mb-8"/>
            ) : (
                <Line className="-mt-2\1 mb-8"/>
            )}

            {blogs.length === 0 ? (
                <p>No blogs to display yet</p>
            ) : (
                <>
                    <div className="">
                        {blogs.map(blog => (
                            <BlogItem 
                                key={blog._id}
                                onClick={() => handleBlogClick(blog._id)}
                                fetchAfterEvent={fetchAfterEvent}
                                blog={blog}
                            />
                        ))}
                    </div>
                    {(pagination) && (
                        <div className="pagination flex flex-row justify-end">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 max-w-20 mx-2 rounded focus:outline-none focus:shadow-outline`}
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    disabled={currentPage === index + 1}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

        </div>
    );
};

export default BlogList;
