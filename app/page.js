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
          <div>
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="icon" />
          </div>
        )}
      </section>
    </>
  );
}
