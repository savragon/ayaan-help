"use client";

import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import weather from "weather-js";

export default function Home() {
  const [selectedState, setSelectedState] = useState("");
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [performanceCriteria, setPerformanceCriteria] = useState<string>("");

  const handleStateChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedState(event.target.value);

    // Fetch weather data using weather-js
    weather.find(
      { search: event.target.value, degreeType: "F" },
      function (err, result) {
        if (err) {
          console.error(err);
          // Handle error here if needed
        } else if (result && result[0]) {
          setWeatherData(result[0]); // Set the weather data in state
        }
      }
    );
  };

  const calculatePoints = (weatherData: any): number => {
    let points = 0;

    // Check if it's Friday, Saturday, or Sunday
    const currentDay = new Date().getDay();
    if (currentDay === 5 || currentDay === 6 || currentDay === 0) {
      points += 2;
    }

    // Check if it's evening (Assuming evening is from 6 PM to 11:59 PM)
    const currentHour = new Date().getHours();
    if (currentHour >= 18) {
      points += 2;
    }

    // Check if it's brunch time (Assuming brunch time is from 10 AM to 2 PM)
    if (currentHour >= 10 && currentHour <= 14) {
      points += 1;
    }

    // Check weather conditions and temperature
    if (weatherData.current.skytext === "Sunny") {
      points += 3;

      // Check if it's sunny the entire day (Assuming that if it's sunny now, it will be sunny throughout the day)
      if (
        weatherData.forecast.every((day: any) => day.skytextday === "Sunny")
      ) {
        points += 1;
      }
    }

    // Check if it's very warm and hot (Assuming a temperature of 80Â°F and above is very warm and hot)
    if (weatherData.current.temperature >= 80) {
      points += 1;
    }

    return points;
  };

  const updatePerformanceCriteria = (points: number): string => {
    if (points >= 7) {
      return "Good";
    } else if (points >= 4) {
      return "Moderate";
    } else {
      return "Bad";
    }
  };

  useEffect(() => {
    // Calculate points and update performance criteria whenever weatherData or selectedState changes
    if (weatherData) {
      const points = calculatePoints(weatherData);
      const criteria = updatePerformanceCriteria(points);
      setPerformanceCriteria(criteria);
    }
  }, [weatherData, selectedState]);

  return (
    <div className="bg-white h-screen w-full font-medium">
      <FaBars className="text-white fixed top-5 left-5 text-3xl" />
      <div className="bg-blue-400 text-white p-5 justify-center items-center">
        <h1 className="text-center text-3xl">CarCast</h1>
      </div>
      <div>
        <div className="text-black font-medium flex items-center justify-center p-5">
          <div className="relative w-full lg:max-w-sm">
            <select
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option>Choose Your State</option>
              <option>Alabama</option>
              <option>Alaska</option>
              <option>Arizona</option>
              <option>Arkansas</option>
              <option>California</option>
              <option>Colorado</option>
              <option>Connecticut</option>
              <option>Delaware</option>
              <option>Florida</option>
              <option>Georgia</option>
              <option>Hawaii</option>
              <option>Idaho</option>
              <option>Illinois</option>
              <option>Indiana</option>
              <option>Iowa</option>
              <option>Kansas</option>
              <option>Kentucky</option>
              <option>Louisiana</option>
              <option>Maine</option>
              <option>Maryland</option>
              <option>Massachusetts</option>
              <option>Michigan</option>
              <option>Minnesota</option>
              <option>Mississippi</option>
              <option>Missouri</option>
              <option>Montana</option>
              <option>Nebraska</option>
              <option>Nevada</option>
              <option>New Hampshire</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>New York</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
              <option>Ohio</option>
              <option>Oklahoma</option>
              <option>Oregon</option>
              <option>Pennsylvania</option>
              <option>Rhode Island</option>
              <option>South Carolina</option>
              <option>South Dakota</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Utah</option>
              <option>Vermont</option>
              <option>Virginia</option>
              <option>Washington</option>
              <option>West Virginia</option>
              <option>Wisconsin</option>
              <option>Wyoming</option>
            </select>
          </div>
        </div>
        {selectedState && (
          <p className="text-center font-medium text-2xl text-black">
            The CarCast for: {selectedState}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 ">
        <div className="rounded-md p-10 m-20 shadow-2xl bg-white">
          <p>Performance Criteria: {performanceCriteria}</p>
          {/* Display other weather information */}
          {weather && (
            <>
              <p>Location: {weather.location.name}</p>
              <p>Current Temperature: {weather.current.temperature}°F</p>
              <p>Sky: {weather.current.skytext}</p>
            </>
          )}
        </div>
        <div className="rounded-md p-10 m-20 shadow-2xl bg-white"></div>
      </div>
    </div>
  );
}
