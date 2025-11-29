"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Threedays from "@/app/Threedays/page";

export default function Home() {
  const [weather, setweather] = useState(null)
  const [savedCity, setSavedCity] = useState("");


  useEffect(() => {
    const storedWeather = localStorage.getItem("weatherData")
     const parsed = JSON.parse(storedWeather);
    setweather(parsed)
    setSavedCity(parsed.location.name);
  }, [])


  const handleSearch = async (city) => {
    const res = await fetch(`/api/routes?city=${encodeURIComponent(city)}`)
    const data = await res.json()
    setweather(data)
    localStorage.setItem("weatherData", JSON.stringify(data));
     setSavedCity(data.location.name);

  }
  return (
    <>
      <Navbar onSearch={handleSearch} />
    
      <section>

        {weather && (

          <div className="center flex items-center justify-center flex-col bg-gray-100">
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
             {savedCity && (
        <p className="text-center  text-lg font-semibold">
          Last searched city: <span className="text-blue-600">{savedCity}</span>
        </p>
      )}
          </div>
          
        )}
         

      </section>
      <Threedays/>
    </>
  );
}
