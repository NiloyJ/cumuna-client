


"use client";

import { PhoneCall, Mail, MapPin } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    // Get the form data
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
     // Public Access Key for Web3Forms

    // API Request
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      // Parsing the response
      const data = await response.json();

      // If the response is successful
      if (data.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
      } else {
        // If the response has an error
        console.log("Error:", data);
        setResult(data.message || "Something went wrong, please try again later.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setResult("There was an issue with submitting the form.");
    }
  };

  return (
    <section className="min-h-screen bg-primary text-white py-20 px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-white text-lg">
            Have questions or need help? Reach out to us!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <PhoneCall className="w-6 h-6 mt-1" />
              <div>
                <h4 className="text-xl font-semibold">Phone</h4>
                <p className="text-white">+88016XXXXXX</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 mt-1" />
              <div>
                <h4 className="text-xl font-semibold">Email</h4>
                <p className="text-white">info.cumuna@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 mt-1" />
              <div>
                <h4 className="text-xl font-semibold">Address</h4>
                <p className="text-white">University of Chittagong</p>
               
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-black">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Send Message
              </button>
            </form>
            <span>{result}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
