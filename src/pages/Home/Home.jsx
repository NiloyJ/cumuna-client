import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import HotEvents from './HotBlogs';
import About from './About';
import ShowPresident from '../ShowPresident/ShowPresident';
import FlagshipEvent from '../FlagshipEvent/FlagshipEvent';
import ShowAnnouncements from '../Announcement/ShowAnnouncements';
import ShowAdvisorMessage from '../ShowAdvisorMessage/ShowAdvisorMessage';
import Events from '../Events/Events';
import ShowEvents from '../Events/ShowEvents';
const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <ShowAdvisorMessage></ShowAdvisorMessage>
            <ShowAnnouncements></ShowAnnouncements>
            <HotEvents></HotEvents>
            {/* <ShowPresident></ShowPresident> */}
            {/* <FlagshipEvent></FlagshipEvent> */}
            <ShowEvents></ShowEvents>
        </div>
    );
};

export default Home;