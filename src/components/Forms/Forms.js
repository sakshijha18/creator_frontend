import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../App/Navbar";

const Forms = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/records/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    } else {
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h2 className="text-4xl font-bold mb-8">Choose a Form</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {formOptions.map((option, index) => (
            (user?.role === 'Vendor' && (option.title === 'Invoice' || option.title === 'Vendor')) || 
            
            (user?.role === 'User' && (option.title === 'Invoice' || option.title === 'Vendor' || option.title === 'Invoice' || option.title === 'Goods' || option.title === 'Mail' || option.title === 'Contract')) ||

            (user?.role === 'Admin' && option.title !== 'Invoice') ? (
              <Link key={index} to={option.route}>
                <div className="form-button transform transition-transform hover:scale-110 bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-32 h-32 object-cover mb-4 rounded-lg"
                  />
                  <div className="text-black text-center text-lg">{option.title}</div>
                </div>
              </Link>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
};


const formOptions = [
  {
    title: "Vendor",
    route: "/forms/vendor",
    image: "https://images.unsplash.com/photo-1534683251650-3fd64cd1561a?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Mail",
    route: "/forms/mail",
    image: "https://images.unsplash.com/photo-1567473030492-533b30c5494c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Invoice",
    route: "/forms/invoice",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Goods",
    route: "/forms/goods",
    image: "https://images.unsplash.com/photo-1518413311144-e7fed23b3fac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Contract",
    route: "/forms/contract",
    image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default Forms;
