

// import React, { useContext } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import AuthContext from '../../context/AuthContext/AuthContext';

// const Navbar = () => {
//     const { user, signOutUser } = useContext(AuthContext);

//     const handleSignOut = () => {
//         signOutUser()
//             .then(() => console.log('User signed out'))
//             .catch(error => console.log('Error:', error));
//     };

//     const textSizes = {
//         base: 'text-lg',
//         dropdown: 'text-xl',
//         mobileMenu: 'text-lg'
//     };

//     const links = (
//         <>
//             <li><NavLink to="/" className={`hover:text-blue-600 ${textSizes.base}`}>Home</NavLink></li>

//             {/* MEET THE COMMITTEE DROPDOWN - MOBILE */}
//             <li className="lg:hidden">
//                 <details className={`${textSizes.base}`}>
//                     <summary className={`${textSizes.dropdown} font-semibold`}>Meet the Committee</summary>
//                     <ul className="p-2 space-y-2">
//                         <li><NavLink className={textSizes.dropdown} to="/about/advisors">Advisors</NavLink></li>
//                         <li><NavLink className={textSizes.dropdown} to="/about/founders">Founders</NavLink></li>
//                         <li><NavLink className={textSizes.dropdown} to="/about/trustees">Trustees</NavLink></li>
//                         <li><NavLink className={textSizes.dropdown} to="/about/governingboard">Governing Board</NavLink></li>
//                         <li><NavLink className={textSizes.dropdown} to="/conference">CUMUN</NavLink></li>
//                     </ul>
//                 </details>
//             </li>

//             <li><NavLink to="/committee" className={`hover:text-blue-600 ${textSizes.base}`}>Committee</NavLink></li>
//             <li><NavLink to="/aboutus" className={`hover:text-blue-600 ${textSizes.base}`}>About</NavLink></li>
//             <li><NavLink to="/contactus" className={`hover:text-blue-600 ${textSizes.base}`}>Contact us</NavLink></li>
//             {user && <li><NavLink to="/addpost" className={`hover:text-blue-600 ${textSizes.base}`}>Add a post</NavLink></li>}
//             {user && <li><NavLink to="/addpresident" className={`hover:text-blue-600 ${textSizes.base}`}>Add president</NavLink></li>}
//             {user && <li><NavLink to="/addevent" className={`hover:text-blue-600 ${textSizes.base}`}>Add events</NavLink></li>}
//             <li><NavLink to="/announcements" className={`hover:text-blue-600 ${textSizes.base}`}>Announcements</NavLink></li>
//             {user && <li><NavLink to="/changebanner" className={`hover:text-blue-600 ${textSizes.base}`}>Change Banner</NavLink></li>}
//             <li><NavLink to="/blogs" className={`hover:text-blue-600 ${textSizes.base}`}>Blogs</NavLink></li>
//             <li><NavLink to="/extraevents" className={`hover:text-blue-600 ${textSizes.base}`}>Events</NavLink></li>
//             <li><NavLink to="/resources" className={`hover:text-blue-600 ${textSizes.base}`}>Study Guides</NavLink></li>
//         </>
//     );

//     return (
//         <div className="navbar bg-white shadow-md px-4 sm:px-8 lg:px-16 w-full min-h-[120px] sticky top-0 z-50">
//             <div className="flex justify-between items-center w-full">

//                 {/* Mobile Menu & Logo */}
//                 <div className="flex items-center">
//                     <div className="dropdown lg:hidden">
//                         <div tabIndex={0} role="button" className="btn btn-ghost">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                         </div>
//                         <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${textSizes.mobileMenu}`}>
//                             {links}
//                             {user ? (
//                                 <li><button onClick={handleSignOut}>Logout</button></li>
//                             ) : (
//                                 <>
//                                     <li><Link to="/register">Register</Link></li>
//                                     <li><Link to="/signin">Sign In</Link></li>
//                                 </>
//                             )}
//                         </ul>
//                     </div>

//                     <Link to="/" className="flex items-center ml-2 lg:ml-0">
//                         <img width="40" height="40" src="https://img.icons8.com/color/48/united-nations.png" alt="united-nations" className="mr-2" />
//                         <span className={`text-xl font-bold text-blue-600 hidden sm:inline ${textSizes.base}`}>MUN Club</span>
//                     </Link>
//                 </div>

//                 {/* Desktop Navigation */}
//                 <div className="hidden lg:flex">
//                     <ul className="menu menu-horizontal gap-2 px-1 items-center">
//                         <li><NavLink to="/" className={`hover:text-blue-600 ${textSizes.base}`}>Home</NavLink></li>

//                         {/* MEET THE COMMITTEE DROPDOWN - DESKTOP */}
//                         <li tabIndex={0} className="dropdown dropdown-hover">
//                             <div className={`hover:text-blue-600 cursor-pointer flex items-center gap-1 ${textSizes.base}`}>
//                                 Meet the Committee
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>
//                             <ul className={`dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 ${textSizes.dropdown}`}>
//                                 <li><NavLink to="/about/advisors">Advisors</NavLink></li>
//                                 <li><NavLink to="/about/founders">Founders</NavLink></li>
//                                 <li><NavLink to="/about/trustees">Trustees</NavLink></li>
//                                 <li><NavLink to="/about/governingboard">Governing Board</NavLink></li>
//                                 <li><NavLink to="/conference">CUMUN</NavLink></li>
//                             </ul>
//                         </li>

//                         <li><NavLink to="/committee" className={`hover:text-blue-600 ${textSizes.base}`}>Committee</NavLink></li>
//                         <li><NavLink to="/aboutus" className={`hover:text-blue-600 ${textSizes.base}`}>About</NavLink></li>
//                         <li><NavLink to="/contactus" className={`hover:text-blue-600 ${textSizes.base}`}>Contact us</NavLink></li>
//                         {user && <li><NavLink to="/addpost" className={`hover:text-blue-600 ${textSizes.base}`}>Add a post</NavLink></li>}
//                         {user && <li><NavLink to="/addpresident" className={`hover:text-blue-600 ${textSizes.base}`}>Add president</NavLink></li>}
//                         {user && <li><NavLink to="/addevent" className={`hover:text-blue-600 ${textSizes.base}`}>Add events</NavLink></li>}
//                         <li><NavLink to="/announcements" className={`hover:text-blue-600 ${textSizes.base}`}>Announcements</NavLink></li>
//                         {user && <li><NavLink to="/changebanner" className={`hover:text-blue-600 ${textSizes.base}`}>Change Banner</NavLink></li>}
//                         <li><NavLink to="/blogs" className={`hover:text-blue-600 ${textSizes.base}`}>Blogs</NavLink></li>
//                         <li><NavLink to="/extraevents" className={`hover:text-blue-600 ${textSizes.base}`}>Events</NavLink></li>
//                         <li><NavLink to="/resources" className={`hover:text-blue-600 ${textSizes.base}`}>Study Guides</NavLink></li>
//                     </ul>
//                 </div>

//                 {/* Auth Buttons */}
//                 <div className={`flex items-center gap-4 ${textSizes.base}`}>
//                     {user ? (
//                         <>
//                             <Link to="/dashboard" className="hidden sm:inline-flex hover:text-blue-600">Dashboard</Link>
//                             <button
//                                 onClick={handleSignOut}
//                                 className="btn btn-outline btn-sm sm:btn-md border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
//                                 Logout
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/register" className="hidden sm:inline-flex hover:text-blue-600">Register</Link>
//                             <Link to="/signin">
//                                 <button className="btn btn-sm sm:btn-md bg-blue-600 text-white hover:bg-blue-700">
//                                     Sign In
//                                 </button>
//                             </Link>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;

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

    const textSizes = {
        base: 'text-lg',
        dropdown: 'text-xl',
        mobileMenu: 'text-lg'
    };

    return (
        <div className="navbar bg-white shadow-md px-4 sm:px-8 lg:px-16 w-full min-h-[120px] sticky top-0 z-50">
            <div className="flex justify-between items-center w-full">

                {/* Mobile Menu & Logo */}
                <div className="flex items-center">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${textSizes.mobileMenu}`}>
                            <li><NavLink to="/" className={textSizes.base}>Home</NavLink></li>

                            <li>
                                <details className={textSizes.base}>
                                    <summary className={`${textSizes.dropdown} font-semibold`}>Meet the Committee</summary>
                                    <ul className="p-2 space-y-2">
                                        <li><NavLink className={textSizes.dropdown} to="/about/advisors">Advisors</NavLink></li>
                                        <li><NavLink className={textSizes.dropdown} to="/about/founders">Founders</NavLink></li>
                                        <li><NavLink className={textSizes.dropdown} to="/about/trustees">Trustees</NavLink></li>
                                        <li><NavLink className={textSizes.dropdown} to="/about/governingboard">Governing Board</NavLink></li>
                                        <li><NavLink className={textSizes.dropdown} to="/conference">CUMUN</NavLink></li>
                                    </ul>
                                </details>
                            </li>

                            <li><NavLink to="/committee" className={textSizes.base}>Committee</NavLink></li>
                            <li><NavLink to="/aboutus" className={textSizes.base}>About</NavLink></li>
                            <li><NavLink to="/contactus" className={textSizes.base}>Contact us</NavLink></li>
                            {user && <li><NavLink to="/addpost" className={textSizes.base}>Add a post</NavLink></li>}
                            {user && <li><NavLink to="/addpresident" className={textSizes.base}>Add president</NavLink></li>}
                            {user && <li><NavLink to="/addevent" className={textSizes.base}>Add events</NavLink></li>}
                            <li><NavLink to="/announcements" className={textSizes.base}>Announcements</NavLink></li>
                            {user && <li><NavLink to="/changebanner" className={textSizes.base}>Change Banner</NavLink></li>}
                            <li><NavLink to="/blogs" className={textSizes.base}>Blogs</NavLink></li>
                            <li><NavLink to="/extraevents" className={textSizes.base}>Events</NavLink></li>
                            <li><NavLink to="/resources" className={textSizes.base}>Study Guides</NavLink></li>

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

                    {/* Logo */}
                    <Link to="/" className="flex items-center ml-2 lg:ml-0">
                        <img width="40" height="40" src="https://img.icons8.com/color/48/united-nations.png" alt="united-nations" className="mr-2" />
                        <span className={`text-xl font-bold text-blue-600 hidden sm:inline ${textSizes.base}`}>MUN Club</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2 px-1 items-center">
                        <li><NavLink to="/" className={`hover:text-blue-600 ${textSizes.base}`}>Home</NavLink></li>

                        <li tabIndex={0} className="dropdown dropdown-hover">
                            <div className={`hover:text-blue-600 cursor-pointer flex items-center gap-1 ${textSizes.base}`}>
                                Meet the Committee
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <ul className={`dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 ${textSizes.dropdown}`}>
                                <li><NavLink to="/about/advisors">Advisors</NavLink></li>
                                <li><NavLink to="/about/founders">Founders</NavLink></li>
                                <li><NavLink to="/about/trustees">Trustees</NavLink></li>
                                <li><NavLink to="/about/governingboard">Governing Board</NavLink></li>
                                <li><NavLink to="/conference">CUMUN</NavLink></li>
                            </ul>
                        </li>

                        <li><NavLink to="/committee" className={`hover:text-blue-600 ${textSizes.base}`}>Committee</NavLink></li>
                        <li><NavLink to="/aboutus" className={`hover:text-blue-600 ${textSizes.base}`}>About</NavLink></li>
                        <li><NavLink to="/contactus" className={`hover:text-blue-600 ${textSizes.base}`}>Contact us</NavLink></li>
                        {user && <li><NavLink to="/addpost" className={`hover:text-blue-600 ${textSizes.base}`}>Add a post</NavLink></li>}
                        {user && <li><NavLink to="/addpresident" className={`hover:text-blue-600 ${textSizes.base}`}>Add president</NavLink></li>}
                        {user && <li><NavLink to="/addevent" className={`hover:text-blue-600 ${textSizes.base}`}>Add events</NavLink></li>}
                        <li><NavLink to="/announcements" className={`hover:text-blue-600 ${textSizes.base}`}>Announcements</NavLink></li>
                        {user && <li><NavLink to="/changebanner" className={`hover:text-blue-600 ${textSizes.base}`}>Change Banner</NavLink></li>}
                        <li><NavLink to="/blogs" className={`hover:text-blue-600 ${textSizes.base}`}>Blogs</NavLink></li>
                        <li><NavLink to="/extraevents" className={`hover:text-blue-600 ${textSizes.base}`}>Events</NavLink></li>
                        <li><NavLink to="/resources" className={`hover:text-blue-600 ${textSizes.base}`}>Study Guides</NavLink></li>
                    </ul>
                </div>

                {/* Auth Buttons */}
                <div className={`flex items-center gap-4 ${textSizes.base}`}>
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
