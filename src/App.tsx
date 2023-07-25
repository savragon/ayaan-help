"use client";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [selectedState, setSelectedState] = useState("");
  const [weather, setWeather] = useState<any | null>(null);
  const [performanceCriteria, setPerformanceCriteria] = useState<string>("");
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStateChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedState(event.target.value);
  };

  const calculatePoints = (weatherData: any): number => {
    let points = 0;

    // Check if it's Friday, Saturday, or Sunday
    const date = new Date();
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      points += 2;
      console.log("Points from Weekend Bonus:", 2);
    }

    // Check if it's evening or brunch time based on user's local time
    const localHours = date.getHours();
    const localTimeZoneOffset = date.getTimezoneOffset() / 60; // Convert minutes to hours
    const localTimeUTC = localHours + localTimeZoneOffset;

    if (
      (localTimeUTC >= 17 && localTimeUTC < 21) ||
      (localTimeUTC >= 10 && localTimeUTC < 12)
    ) {
      points += 2;
      console.log("Points from Evening/Brunch Time:", 2);
    } else if (localTimeUTC >= 12 && localTimeUTC < 17) {
      points += 1;
      console.log("Points from Afternoon:", 1);
    }

    // Check if it's evening or brunch time
    const hours = date.getHours();
    if ((hours >= 17 && hours < 21) || (hours >= 10 && hours < 12)) {
      points += 2;
      console.log("Points from Evening/Brunch Time:", 2);
    } else if (hours >= 12 && hours < 17) {
      points += 1;
      console.log("Points from Afternoon:", 1);
    }

    // Check weather conditions
    if (weatherData && weatherData.current) {
      const { is_day, condition, temp_c } = weatherData.current;

      if (condition.text.includes("Sunny")) {
        points += 3;
        console.log("Points from Sunny Weather:", 3);

        // Check if it's sunny the entire day
        if (is_day === 1) {
          points += 1;
          console.log("Additional Points from Full-day Sunshine:", 1);
        }
      } else if (
        condition.text.includes("Rain") ||
        condition.text.includes("Snow")
      ) {
        points -= 2;
        console.log("Points Deducted from Rain/Snow:", -2);
      }

      // Check if it's very warm or hot
      if (temp_c >= 28) {
        points += 1;
        console.log("Points from Warm/Hot Temperature:", 1);
      }
    }

    return points;
  };

  const updatePerformanceCriteria = (points: number): string => {
    // Define your criteria based on points
    if (points >= 5) {
      return "Good";
    } else if (points >= 2) {
      return "Moderate";
    } else {
      return "Bad";
    }
  };

  useEffect(() => {
    if (selectedState) {
      // Fetch weather data from WeatherAPI

      const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${selectedState}&aqi=no`;

      axios
        .get(currentWeatherUrl)
        .then((response) => {
          setWeather(response.data);

          const points = calculatePoints(response.data);
          console.log("Points Given:", points); // Log the points given
          const criteria = updatePerformanceCriteria(points);
          setPerformanceCriteria(criteria);
        })
        .catch((error) => {
          console.error("Error fetching current weather data:", error);
        });

      // Fetch forecast data from WeatherAPI for the next 4 days (including today)
      const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${selectedState}&days=4&aqi=no`;

      axios
        .get(forecastUrl)
        .then((response) => {
          // Convert the forecast date to the user's local time
          const forecastDays = response.data.forecast.forecastday
            .map((dayData) => {
              const date = new Date(dayData.date);
              const localDate = new Date(
                date.getTime() + date.getTimezoneOffset() * 60000
              );
              return {
                ...dayData,
                date: localDate.toISOString().split("T")[0],
              };
            })
            .slice(1, 4); // Extract forecast data for the next 3 days (excluding today)
          setForecastData(forecastDays);
        })
        .catch((error) => {
          console.error("Error fetching weather forecast data:", error);
        });
    }
  }, [selectedState]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const key = "4f04282a31e04457af8205020232107";

  return (
    <div className="bg-custom bg-cover bg-center bg-no-repeat h-screen w-full font-medium">
      <FaBars className="text-white fixed top-5 left-5 text-3xl" />
      <div className="bg-emerald-400 text-white p-5 justify-center items-center">
        <h1 className="text-center text-3xl">CarSpot</h1>
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
      </div>
      <div className="grid grid-cols-2">
        <div className="rounded-md p-10 m-20 shadow-2xl bg-white">
          <h1 className="font-semibold text-2xl flex items-center justify-center mb-10">
            CarCast For Today
          </h1>
          {/* Display the performance criteria for the current day */}
          {performanceCriteria === "Good" && (
            <img src="/GOOD.png" alt="Good" className="w-20 mx-auto" />
          )}
          {performanceCriteria === "Moderate" && (
            <img src="/FINE.png" alt="Moderate" className="w-20 mx-auto" />
          )}
          {performanceCriteria === "Bad" && (
            <img src="/POOR.png" alt="Bad" className="w-20 mx-auto" />
          )}
        </div>
        <div className="rounded-md p-10 m-20 shadow-2xl bg-white flex flex-col items-center">
          <h1 className="font-semibold text-2xl mb-10">
            CarCast for the Next 3 Days
          </h1>
          <div className="flex justify-center">
            {/* Display the performance criteria for the next 3 days in a row */}
            {forecastData.map((dayData) => {
              const date = new Date(dayData.date);
              const points = calculatePoints(dayData.day);
              const criteria = updatePerformanceCriteria(points);

              // Determine the image source based on the criteria
              let imageSrc;
              if (criteria === "Good") {
                imageSrc = "/GOOD.png";
              } else if (criteria === "Moderate") {
                imageSrc = "/FINE.png";
              } else {
                imageSrc = "/POOR.png";
              }

              return (
                <div key={dayData.date} className="w-1/3">
                  {/* Display the performance criteria image */}
                  <img src={imageSrc} alt={criteria} className="w-20 mx-auto" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
