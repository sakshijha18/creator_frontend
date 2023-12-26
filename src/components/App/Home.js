import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Home = () => {
  const backgroundImageUrl =
    "url('https://images.unsplash.com/photo-1620095200055-9d1c4f36ba43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

  const [firstName, setFirstName] = useState("");

  const isAuthenticated = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getuser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.status === 200) {
          setFirstName(response.data.firstName);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80 filter blur-md"></div>
        <div className="text-white text-center p-8 rounded-md relative z-10">
          {isAuthenticated ? (
            <h1 className="text-6xl font-bold mb-6">{`Hi ${firstName || "User"}`}</h1>
          ) : (
            <h1 className="text-6xl font-bold mb-6">Welcome Home</h1>
          )}
          <p className="text-lg mb-8">Explore and discover amazing things!</p>

          <div className="flex justify-center space-x-4">
            <Link to="/about">
              <button className="bg-transparent border border-n text-white px-6 py-3 rounded-md hover:bg-white hover:text-black hover:border-transparent">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
