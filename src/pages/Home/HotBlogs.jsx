
import React, { useEffect, useState } from 'react';
import HotBlogCard from './HotBlogCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/config';

const HotBlog = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/blogs`)
            .then(res => res.json())
            .then(data => setJobs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, [])

    // Robust sorting with multiple fallbacks
    const displayedJobs = [...jobs].sort((a, b) => {
        // Try createdAt first
        if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        // Fallback to updatedAt
        if (a.updatedAt && b.updatedAt) {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        // Fallback to _id (assuming MongoDB-style IDs with timestamps)
        return b._id.localeCompare(a._id);
    }).slice(0, 5);

    return (
        <div>
            {/* ... rest of your existing JSX remains exactly the same ... */}
            <div className='px-2 sm:px-4'>
                <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4'>
                    {displayedJobs.map(job => (
                        <HotBlogCard 
                            blogData={jobs} 
                            setJobs={setJobs} 
                            key={job._id} 
                            job={job}
                        />
                    ))}
                </div>
                {jobs.length > 5 && (
                    <div className="text-center mt-6">
                        <Link to="/blogs" className="btn btn-primary">
                            See All Blogs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotBlog;