import { FaBars } from "react-icons/fa";
import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="bg-green-300 text-white p-5 justify-center items-center">
      <FaBars className="text-white fixed top-5 left-5 text-3xl" />
      <h1 className="text-center text-3xl">CarSpot</h1>
    </div>
  );
};

export default App;
