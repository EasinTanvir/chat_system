import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({ message, backBtn = false, title = true }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center   px-6 py-14">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
      <p className="text-gray-600 mb-6 text-center">
        {message ? message : "An unexpected error has occurred"}
      </p>
      {backBtn && (
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          Go back home
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
