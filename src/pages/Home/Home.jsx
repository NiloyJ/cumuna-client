import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import HotEvents from './HotBlogs';
import About from './About';
import ShowPresident from '../ShowPresident/ShowPresident';
import FlagshipEvent from '../FlagshipEvent/FlagshipEvent';
const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <About></About> 
            <HotEvents></HotEvents>
            <ShowPresident></ShowPresident>
            <FlagshipEvent></FlagshipEvent>
        </div>
    );
};

export default Home;