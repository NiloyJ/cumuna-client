

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FaGlobe, FaHandshake, FaComments, FaUsers } from 'react-icons/fa';

const AboutCumuna = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const milestones = [
    {
      year: "2015",
      title: "Foundation",
      description: "CUMUNA was founded by a group of passionate students aiming to promote UN values in our community."
    },
    {
      year: "2016",
      title: "First Conference",
      description: "Hosted our first Model UN conference with over 100 participants from various schools."
    },
    {
      year: "2018",
      title: "Expansion",
      description: "Expanded our reach to include international partnerships with other MUN organizations."
    },
    {
      year: "2020",
      title: "Virtual Adaptation",
      description: "Successfully transitioned to virtual conferences during the pandemic, reaching global audiences."
    },
    {
      year: "2023",
      title: "Current Era",
      description: "Continuing to inspire young leaders through debate, diplomacy, and global awareness programs."
    }
  ];

  const missions = [
    {
      title: "Global Awareness",
      description: "Promote understanding of global issues and the UN's role in addressing them.",
      icon: <FaGlobe className="text-4xl text-white" />
    },
    {
      title: "Diplomacy & Dialogue",
      description: "Empower students with diplomacy, negotiation, and public speaking skills.",
      icon: <FaHandshake className="text-4xl text-white" />
    },
    {
      title: "Youth Engagement",
      description: "Encourage youth to become active and responsible global citizens.",
      icon: <FaUsers className="text-4xl text-white" />
    },
    {
      title: "Critical Thinking",
      description: "Foster analytical skills through debate and policy-making simulations.",
      icon: <FaComments className="text-4xl text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        
        {/* New Section Above Our Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">Since 2015</h2>
            <p className="text-lg text-gray-700">
              First known as LoMUN (London Model United Nations), CUMUNA was conceived by students from the University of Dhaka who wanted to organise an annual Model UN event in the heart of Dhaka. The city is a fitting place for the ideals that embody the United Nations, where global challenges are discussed and solutions crafted.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img 
              src="https://scontent.fcgp37-1.fna.fbcdn.net/v/t39.30808-6/485969953_665615492785065_6629040931187003153_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHVVrFDo38CjGuIVLqjn8BoB3uRS-bp4_YHe5FL5unj9n0rIuMgFowvsH3h6l-rtnwtmrX1B_7AQRzHFQ7TPKgs&_nc_ohc=eWieOO5q384Q7kNvwHSe5ln&_nc_oc=AdkwmZGdAsLAjJ7uenHKVH2T9sTCjVp5gE15DMz-QDNDo7bj1S8p-bLSAbJP2z-ARwc&_nc_zt=23&_nc_ht=scontent.fcgp37-1.fna&_nc_gid=VWTYrFZLK31J_wqnTWxt3w&oh=00_AfGE43GXkZe5C7BLX7InWFASuvEDbMI1R0RtGBNrFbNxfA&oe=68166185" 
              alt="About CUMUNA" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Progress Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-1 bg-blue-500 mx-auto my-4 rounded"
        />

        {/* Journey Section */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-500">
          Our Journey
        </h1>

        <div className="relative mt-12">
          <div className="absolute left-8 md:left-1/2 h-full w-2 bg-gray-200 -translate-x-1/2 rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full w-full bg-blue-500 rounded-full origin-top"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <div className="space-y-20">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold z-10 ${index % 2 === 0 ? 'md:order-1 md:mr-8' : 'md:order-3 md:ml-8'}`}>
                  {milestone.year}
                </div>

                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:order-2' : 'md:text-left md:order-2'}`}>
                  <div className="bg-base-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-blue-500 mb-2">{milestone.title}</h3>
                    <p className="text-base-content">{milestone.description}</p>
                  </div>
                </div>

                {index % 2 !== 0 && <div className="hidden md:block md:order-1 flex-1"></div>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Missions Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Our Missions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg text-white shadow-md`}
                style={{ backgroundColor: index % 2 === 0 ? '#60a5fa' : '#3b82f6' }} // blue-400 / blue-500
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{mission.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
                <p>{mission.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Become part of our growing community of young leaders and global citizens.
          </p>
          <button className="btn bg-blue-500 text-white btn-lg hover:bg-blue-600 animate-pulse">
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutCumuna;
