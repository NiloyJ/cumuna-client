import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import BlogCard from '../Home/HotBlogCard';
import { API_URL } from '../../config/config';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null); // Track which blog is being deleted
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const { user } = useContext(AuthContext);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_URL}/blogs`);
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

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this blog?");
        
        if (result) {
            setDeletingId(id); // Set the deleting state
            try {
                const response = await fetch(`${API_URL}/blogs/${id}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                
                if (data.deletedCount) {
                    alert("Blog deleted successfully!");
                    fetchBlogs(); // Re-fetch the blogs after deletion
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
                alert("Failed to delete blog");
            } finally {
                setDeletingId(null); // Reset deleting state
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

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()));
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
                {/* Global loading overlay when deleting */}
                {deletingId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="text-white text-xl font-semibold flex items-center">
                            <span className="loading loading-spinner loading-lg mr-3"></span>
                            Deleting blog...
                        </div>
                    </div>
                )}

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
                                isDeleting={deletingId === blog._id} // Pass deleting state to card
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
