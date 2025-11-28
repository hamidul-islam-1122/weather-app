"use client"
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";


export default function Home() {
  const [weather, setweather] = useState(null)

  const handleSearch = async (city) => {
    const res = await fetch(`/api/routes?city=${encodeURIComponent(city)}`)
    const data = await res.json()
    setweather(data)

  }
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <section>

        {weather && (

          <div className="center flex items-center justify-center ">
            <div className="backdrop-blur-md bg-white/30 p-4 rounded-lg shadow-lg my-4">
              <img src={weather.current.condition.icon} alt="icon" />
              <p className="flex my-1 items-center">
                Temperature:
                <span className="text-3xl">{weather.current.temp_c}</span>
                <span className="text-3xl">°C</span>
              </p>
              <h2 className="text-lg">
                {weather.location.name}, {weather.location.country}
              </h2>
              <p className="text-lg">
                Condition: {weather.current.condition.text}
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
