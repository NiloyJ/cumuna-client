import React, { useEffect, useState } from 'react';
import HotBlogCard from './HotBlogCard';
import { motion } from 'framer-motion';
const HotBlog = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [])

    return (
        <div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-8 text-center"
            >
                <span className="relative inline-block">
                    <span className="text-primary">Blogs</span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
                    <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full origin-left"
                    ></motion.span>
                </span>
                <span className="text-neutral"> and updates</span>
            </motion.h2>
            <div className='px-2 sm:px-4'>
                <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4'>
                    {
                        jobs.map(job => <HotBlogCard blogData={jobs} setJobs={setJobs} key={job._id} job={job}></HotBlogCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default HotBlog;