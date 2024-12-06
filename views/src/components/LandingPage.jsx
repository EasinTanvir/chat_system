import React from "react";
import { motion } from "framer-motion";
import { FaRegComments, FaUserAlt, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaRegComments className="text-4xl text-blue-500" />,
      title: "Real-Time Chat",
      description:
        "Engage in seamless real-time conversations with your friends.",
    },
    {
      icon: <FaUserCheck className="text-4xl text-green-500" />,
      title: "User Active Status",
      description: "Check whether your friends are currently active.",
    },
    {
      icon: <FaUserAlt className="text-4xl text-yellow-500" />,
      title: "Online Status",
      description: "Easily view who is online and ready to chat.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-74px)] bg-custom-gradient-2 text-white">
      <div className="container mx-auto px-4 py-10 flex flex-col items-center">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-6">
          Welcome to ChatApp
        </h1>
        <p className="text-lg text-center mb-12">
          Login to start chatting with your friends.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-center mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Sign In Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-12 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-bold shadow-lg"
          onClick={() => navigate("/signin")}
        >
          Sign In to Chat
        </motion.button>
      </div>
    </div>
  );
};

export default LandingPage;
