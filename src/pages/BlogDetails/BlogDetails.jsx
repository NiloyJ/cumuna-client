

import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const BlogDetails = () => {
    const blog = useLoaderData();
    const { 
        _id, 
        title = '', 
        author = '', 
        category = 'MUN Tips', 
        tags = [], 
        thumbnailUrl = '', 
        bannerUrl = '', 
        content = '' 
    } = blog || {};

    const sanitizedContent = DOMPurify.sanitize(content);

    // Function to format the current date and time
    const getCurrentDateTime = () => {
        const now = new Date();
        const options = { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return now.toLocaleString('en-US', options);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Blog Header with Banner */}
            <div className="relative h-70 w-full overflow-hidden">
                <img 
                    src={bannerUrl || 'https://via.placeholder.com/1600x400?text=Blog+Banner'} 
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/1600x400?text=Banner+Not+Found';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
                    <div className="max-w-3xl mx-auto">
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white bg-blue-600 rounded-full">
                            {category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
                        <div className="flex items-center text-gray-200">
                            <span className="mr-4">By {author}</span>
                            <span className="text-sm">{getCurrentDateTime()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Thumbnail Image */}
                    {thumbnailUrl && (
                        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                            <img 
                                src={thumbnailUrl} 
                                alt={title} 
                                className="w-full h-74 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/800x400?text=Thumbnail+Not+Found';
                                }}
                            />
                        </div>
                    )}

                    {/* Date and time at the top of content */}
                    <div className="text-right text-gray-500 text-sm mb-4">
                        Last updated: {getCurrentDateTime()}
                    </div>

                    {/* Blog Content */}
                    <article className="prose prose-lg max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    </article>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-12">
                            <h3 className="text-lg font-semibold mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span 
                                        key={index} 
                                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back Button */}
                    <div className="mt-12 text-center">
                        <Link 
                            to="/blogs" 
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ← Back to All Blogs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;