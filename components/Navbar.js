"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
const Navbar = ({ onSearch }) => {
  const [location, setlocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = location.trim();
    onSearch(city);

    setlocation("")
  };

  return (
    <>
      <main className="p-3 bg-gray-200 px-6  ">

        <div className=" flex gap-7  justify-center ">
          <div className="logo flex  items-center ">
             <Image
              src="/weather.png"
              alt="logo"
              width={60}
              height={60} 
              />
            <p className="font-bold text-xl">
             
              Weather</p>
          </div>
    
          <form
            onSubmit={handleSubmit}
            className="navbar-modern  flex w-1/4 gap-3"
          >
            <input
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              className="border  w-full p-2 rounded-4xl px-4 "
              type="text"
              placeholder="Enter the location"
            />

            <button className="border px-3  rounded-4xl">submit</button>
          </form>
        
        </div>

      </main>
    </>
  );
};

export default Navbar;
