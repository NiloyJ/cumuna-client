import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';
import About from '../pages/Home/About';
const Mainlayout = () => {
    return (
        <div className='max-w-full mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <About></About> */}
            <Footer></Footer>
        </div>
    );
};

export default Mainlayout;



