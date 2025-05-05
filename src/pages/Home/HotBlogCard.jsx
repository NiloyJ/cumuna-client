import { div } from 'framer-motion/client';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import AllBlogs from '../AllBlogs/AllBlogs';
import { API_URL } from '../../config/config';

const BlogCard = ({ job, blogData, setJobs }) => {
    const { title, thumbnailUrl, _id, author, category, content, tags = [] } = job;
    const { user, signOutUser } = useContext(AuthContext);


    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`${API_URL}/blogs/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            // update the loaded coffee state
                            const remainingCoffees = blogData.filter(coffee => coffee._id !== _id);
                            setJobs(remainingCoffees);

                            console.log(job)

                        }
                    })

            }
        });
    }

    return (

        <div className="card w-full bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200">

            <figure className="px-6 pt-6 pb-0">
                <img
                    src={thumbnailUrl || 'https://via.placeholder.com/600x400?text=Blog+Thumbnail'}
                    alt={title}
                    className="rounded-lg h-48 w-full object-cover"
                />
            </figure>

            <div className="card-body p-6">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                    <div className="flex flex-wrap gap-1">
                        <span className="badge badge-primary badge-outline text-xs sm:text-sm">{category}</span>

                        {tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="badge badge-ghost text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[100px]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                <span className="text-xs">{author?.charAt(0) || 'A'}</span>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{author || 'Anonymous'}</span>
                    </div>
                </div>


                <h2 className="card-title text-lg sm:text-xl font-bold mb-3 line-clamp-2">{title}</h2>




                <div className="card-actions justify-end mt-auto">
                    <Link to={`/blogs/${_id}`} className="w-full">
                        <button className="btn btn-primary btn-sm w-full">Read More</button>
                    </Link>
                    {user && <button onClick={() => handleDelete(_id)} className="btn bg-red-500 hover:bg-red-600 text-white border-0 btn-sm w-full">Delete</button>}
    
                </div>
            </div>
          

        </div>


    );
};

export default BlogCard;



