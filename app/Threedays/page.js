"use client";
import React, { useState, useEffect } from "react";

const Threedays = () => {
  const [weather, setWeather] = useState(null);
  const [savedCity, setSavedCity] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const storedWeather = localStorage.getItem("weatherData");
    if (storedWeather) {
      const parsed = JSON.parse(storedWeather);
      setWeather(parsed);
      setSavedCity(parsed.location.name);
    }
  }, []);

  const handleSearch = async (city) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/routes?city=${encodeURIComponent(city)}&days=3`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error + (data.details ? `: ${data.details}` : ""));
        setWeather(null);
        return;
      }

      setWeather(data);
      localStorage.setItem("weatherData", JSON.stringify(data));
      setSavedCity(data.location?.name || city);
    } catch (err) {
      setError("Network error");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 ">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city for 3-day forecast"
          className="border p-2 mr-2"
        />
        <button
          onClick={() => handleSearch(city)}
          className="border px-3 py-2 rounded"
        >
          {loading ? "Loading..." : "Get 3-day forecast"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather?.forecast?.forecastday?.map((day, idx) => (
        <div key={idx} className="p-3   flex flex-col items-center">
          <h3>{day.date}</h3>
          <p>Avg Temp: {day.day.avgtemp_c}°C</p>
          <p>Condition: {day.day.condition.text}</p>
          <img src={day.day.condition.icon} alt="icon" />
             <hr className="w-full border-t border-gray-300 my-2" />

        </div>
      ))}
    
      {!weather && !error && <p>No forecast loaded.</p>}
    </div>
  );
};

export default Threedays;