"use client";
import React from "react";
import { useState } from "react";
const Navbar = () => {
  const [location, setlocation] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    console.log(location);
    setlocation("")
  };
  return (
    <>
      <main className="p-3 bg-gray-200 px-6  ">

        <div className=" flex gap-7  justify-between items-center ">
          <div className="logo">
            <p className="font-bold text-xl">Weather</p>
          </div>

          <form
            onSubmit={handleChange}
            className="navbar-modern  flex w-1/4 gap-3"
          >
            <input
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              className="border w-full p-2 rounded-4xl px-4 "
              type="text"
              placeholder="Enter the location"
            />
          
            <button className="border px-3  rounded-4xl">submit</button>
          </form>
          <button className="border border-amber-50 bg-gray-400  py-2 px-4 rounded-full hover:bg-gray-500  transition-all cursor-pointer">
            Saved location
          </button>
        </div>

      </main>
    </>
  );
};

export default Navbar;
