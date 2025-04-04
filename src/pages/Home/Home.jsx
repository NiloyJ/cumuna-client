import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import HotEvents from './HotBlogs';
import About from './About';
const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <About></About> 
            <HotEvents></HotEvents>
        </div>
    );
};

export default Home;