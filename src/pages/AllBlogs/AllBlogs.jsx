

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import BlogCard from '../Home/HotBlogCard';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/blogs');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                const normalizedData = data.map(blog => ({
                    ...blog,
                    category: normalizeCategory(blog.category),
                    image: blog.thumbnailUrl || blog.bannerUrl,
                }));
                setBlogs(normalizedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/blogs/${id}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                
                if (data.deletedCount) {
                    Swal.fire("Deleted!", "Your blog has been deleted.", "success");
                    setBlogs(blogs.filter(blog => blog._id !== id));
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const normalizeCategory = (category) => {
        if (!category) return '';
        const lowerCaseCategory = category.toLowerCase();
        if (lowerCaseCategory.includes('mun') || lowerCaseCategory.includes('tips')) return 'MUN tips';
        if (lowerCaseCategory.includes('delegate') || lowerCaseCategory.includes('training')) return 'Delegate training';
        if (lowerCaseCategory.includes('conference') || lowerCaseCategory.includes('recap')) return 'Conference recap';
        if (lowerCaseCategory.includes('global') || lowerCaseCategory.includes('news')) return 'Global news';
        return category;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        if (isNaN(date)) return 'Unknown date';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter || blog.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">CUMUNA Blog</h1>
                    <p className="text-xl text-gray-600">Discover the latest articles and updates</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="input input-bordered flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="select select-bordered w-full md:w-64"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="MUN tips">MUN tips</option>
                        <option value="Delegate training">Delegate training</option>
                        <option value="Conference recap">Conference recap</option>
                        <option value="Global news">Global news</option>
                    </select>
                </div>

                {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlogs.map((blog) => (
                            <BlogCard 
                                key={blog._id} 
                                job={blog} 
                                onDelete={handleDelete} 
                                user={user} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <p className="text-xl text-gray-600 mb-4">No blog posts found matching your criteria.</p>
                        <button
                            className="btn btn-outline"
                            onClick={() => {
                                setSearchTerm('');
                                setCategoryFilter('');
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllBlogs;