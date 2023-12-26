import React from 'react';
import Navbar from './Navbar';

const About = () => {
  console.log('about')
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md text-center">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          <p className="text-gray-700 mb-6">
            Welcome to our amazing company. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam in velit ac velit varius tristique eget quis justo. Nunc nec ligula non nisi
            tincidunt eleifend vel at ante. Sed id interdum nulla.
          </p>
          <p className="text-gray-700 mb-6">
            Our team is dedicated to providing the best products and services. We believe in
            innovation, collaboration, and customer satisfaction.
          </p>
          <p className="text-gray-700">
            Contact us if you have any questions or would like to learn more about what we do!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
