
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log('User signed out'))
            .catch(error => console.log('Error:', error));
    };

    // Adjusted text sizes for different screen widths
    const textSizes = {
        base: 'text-base lg:text-lg', // Smaller base size that grows at lg breakpoint
        dropdown: 'text-lg',
        mobileMenu: 'text-lg'
    };

    return (
        <div className="navbar bg-white shadow-md px-4 sm:px-6 lg:px-8 xl:px-12 w-full min-h-[100px] md:min-h-[120px] sticky top-0 z-50">
            <div className="flex justify-between items-center w-full">

                {/* Mobile Menu & Logo */}
                <div className="flex items-center justify-between w-full lg:w-auto">

                    {/* Hamburger Menu */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg">
                            {/* Mobile menu items remain the same */}
                            <li><NavLink to="/" className={textSizes.base}>Home</NavLink></li>
                            <li><NavLink to="/aboutus" className={textSizes.base}>About</NavLink></li>
                            <li>
                                <details className={textSizes.base}>
                                    <summary className={`${textSizes.dropdown} font-semibold`}>Community</summary>
                                    <ul className="p-2 space-y-2">
                                        <li><NavLink className={textSizes.dropdown} to="/about/advisors">Advisors</NavLink></li>
                                        <li><NavLink className={textSizes.dropdown} to="/about/founders">Founders</NavLink></li>
                                        <li><NavLink className={textSizes.dropdown} to="/about/trustees">Trustees</NavLink></li>
                                        <li><NavLink className={textSizes.dropdown} to="/about/governingboard">Board</NavLink></li>
                                    </ul>
                                </details>
                            </li>
                            <li><NavLink to="/allconferences" className={textSizes.base}>CUMUN</NavLink></li>
                            <li><NavLink to="/resources" className={textSizes.base}>Resources</NavLink></li>
                            <li><NavLink to="/blogs" className={textSizes.base}>Blogs</NavLink></li>
                            <li><NavLink to="/announcements" className={textSizes.base}>Announcements</NavLink></li>
                            <li><NavLink to="/extraevents" className={textSizes.base}>Events</NavLink></li>
                            <li><NavLink to="/contactus" className={textSizes.base}>Contact</NavLink></li>
                            {user && (
                                <>
                                    <li><NavLink to="/committee" className={textSizes.base}>Add Community</NavLink></li>
                                    <li><NavLink to="/addpost" className={textSizes.base}>Add post</NavLink></li>
                                    <li><NavLink to="/addpresident" className={textSizes.base}>Add president</NavLink></li>
                                    <li><NavLink to="/addevent" className={textSizes.base}>Add Conference</NavLink></li>
                                    <li><NavLink to="/extraevents" className={textSizes.base}>Add Events</NavLink></li>
                                    <li><NavLink to="/changebanner" className={textSizes.base}>Change Banner</NavLink></li>
                                </>
                            )}
                            {user ? (
                                <li><button onClick={handleSignOut} className={textSizes.base}>Logout</button></li>
                            ) : (
                                <li><Link to="/signin" className={textSizes.base}>Sign In</Link></li>
                            )}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="flex items-center ml-2 lg:ml-0">
                        <img width="40" height="40" src="https://img.icons8.com/color/48/united-nations.png" alt="united-nations" className="mr-2" />
                        <span className="text-lg md:text-xl font-bold text-blue-600 hidden sm:inline">MUN Club</span>
                    </Link>
                </div>

                {/* Desktop Navigation - Adjusted for better spacing */}
                <div className="hidden lg:flex flex-grow">
                    <ul className="menu menu-horizontal gap-1 px-1 items-center w-full justify-center">
                        <li><NavLink to="/" className={`hover:text-blue-600 ${textSizes.base} px-2 py-1`}>Home</NavLink></li>
                        <li><NavLink to="/aboutus" className={`hover:text-blue-600 ${textSizes.base} px-2 py-1`}>About</NavLink></li>
                        
                        {/* Community Dropdown - Shortened label */}
                        <li tabIndex={0} className="dropdown dropdown-hover">
                            <div className={`hover:text-blue-600 cursor-pointer flex items-center gap-1 ${textSizes.base} px-2 py-1`}>
                                Community
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <ul className={`dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-48 ${textSizes.dropdown}`}>
                                <li><NavLink to="/about/advisors" className="px-2 py-1">Advisors</NavLink></li>
                                <li><NavLink to="/about/founders" className="px-2 py-1">Founders</NavLink></li>
                                <li><NavLink to="/about/trustees" className="px-2 py-1">Trustees</NavLink></li>
                                <li><NavLink to="/about/governingboard" className="px-2 py-1">Board</NavLink></li>
                            </ul>
                        </li>
                        
                        <li><NavLink to="/allconferences" className={`hover:text-blue-600 ${textSizes.base} px-2 py-1`}>CUMUN</NavLink></li>
                        <li><NavLink to="/resources" className={`hover:text-blue-600 ${textSizes.base} px-2 py-1`}>Resources</NavLink></li>
                        <li><NavLink to="/blogs" className={`hover:text-blue-600 ${textSizes.base} px-2 py-1`}>Blogs</NavLink></li>
                        <li><NavLink to="/announcements" className={`hover:text-blue-600 ${textSizes.base} px-2 py-1`}>Announcements</NavLink></li>
                        <li><NavLink to="/extraevents" className={`hover:text-blue-600 ${textSizes.base} px-2 py-1`}>Events</NavLink></li>
                        <li><NavLink to="/contactus" className={`hover:text-blue-600 ${textSizes.base} px-2 py-1`}>Contact</NavLink></li>
                    </ul>
                </div>

                {/* Auth Buttons on Desktop - Adjusted spacing */}
                <div className="hidden lg:flex items-center gap-2 ml-2">
                    {user ? (
                        <>
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} className="btn btn-ghost btn-sm px-2">
                                    Admin
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-48">
                                    <li><NavLink to="/committee" className="px-2 py-1">Add Community</NavLink></li>
                                    <li><NavLink to="/addpost" className="px-2 py-1">Add post</NavLink></li>
                                    <li><NavLink to="/addpresident" className="px-2 py-1">Add president</NavLink></li>
                                    <li><NavLink to="/extraevents" className="px-2 py-1">Add Event</NavLink></li>
                                    <li><NavLink to="/addevent" className="px-2 py-1">Add Conference</NavLink></li>
                                    <li><NavLink to="/changebanner" className="px-2 py-1">Change Banner</NavLink></li>
                                </ul>
                            </div>
                            <Link to="/dashboard" className="hover:text-blue-600 text-sm px-2">Dashboard</Link>
                            <button
                                onClick={handleSignOut}
                                className="btn btn-outline btn-sm border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-3">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/signin"
                            className="btn bg-[#1963a7] text-white hover:bg-primary-700 rounded-full px-4 py-1 text-sm"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

