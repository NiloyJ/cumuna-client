
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('User signed out');
            })
            .catch(error => {
                console.log('Error:', error);
            })
    }

    const links = <>
        <li><NavLink to="/about" className="hover:text-blue-600">About MUN</NavLink></li>
        <li><NavLink to="/conference" className="hover:text-blue-600">CUMUNA</NavLink></li>
        <li><NavLink to="/committee" className="hover:text-blue-600">Our Committee</NavLink></li>
        {/* <li><NavLink to="/addpost" className="hover:text-blue-600">Add a post</NavLink></li> */}
        {user && <li><NavLink to="/addpost" className="hover:text-blue-600">Add a post</NavLink></li>}
        {user && <li><NavLink to="/addpresident" className="hover:text-blue-600">Add president</NavLink></li>}
        {user && <li><NavLink to="/addevent" className="hover:text-blue-600">Add events</NavLink></li>}
        <li><NavLink to="/blogs" className="hover:text-blue-600">Blogs</NavLink></li>
        <li><NavLink to="/resources" className="hover:text-blue-600">Resources</NavLink></li>
    </>

    return (
        <div className="navbar bg-white shadow-md px-4 sm:px-8 lg:px-16 w-full">
            {/* Full width container */}
            <div className="flex justify-between items-center w-full">
                {/* Left side - Logo and mobile menu */}
                <div className="flex items-center">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                            {user ? (
                                <li><button onClick={handleSignOut}>Logout</button></li>
                            ) : (
                                <>
                                    <li><Link to="/register">Register</Link></li>
                                    <li><Link to="/signin">Sign In</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center ml-2 lg:ml-0">
                        <img width="40" height="40" src="https://img.icons8.com/color/48/united-nations.png" alt="united-nations" className="mr-2" />
                        <span className="text-xl font-bold text-blue-600 hidden sm:inline">MUN Club</span>
                    </Link>
                </div>

                {/* Center - Desktop navigation */}
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2 px-1">
                        {links}
                    </ul>
                </div>

                {/* Right side - Auth buttons */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hidden sm:inline-flex hover:text-blue-600">Dashboard</Link>
                            <button
                                onClick={handleSignOut}
                                className="btn btn-outline btn-sm sm:btn-md border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="hidden sm:inline-flex hover:text-blue-600">Register</Link>
                            <Link to="/signin">
                                <button className="btn btn-sm sm:btn-md bg-blue-600 text-white hover:bg-blue-700">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;