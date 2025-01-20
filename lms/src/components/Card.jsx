import React from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  const topics = [
    { title: "Learn React.js", color: "bg-blue-500" },
    { title: "Learn CSS", color: "bg-green-500" },
    { title: "Learn JavaScript", color: "bg-yellow-500" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {topics.map((topic, index) => (
          <Link
            to="/courses"
            key={index}
            className={`p-8 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 ${topic.color}`}
          >
            <h2 className="text-3xl font-bold text-white mb-6">{topic.title}</h2>
            <button className="mt-4 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-100 hover:text-gray-900 transition duration-300">
              Learn Now
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
