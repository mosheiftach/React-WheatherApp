import React, { useState,useEffect } from "react";
import {NavBar} from "./components/NavigationBar";
import { Switch, Route } from 'react-router-dom';
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "./components/DropDown";
import { WeeklyWeather } from "./components/WeeklyWeather";
import { FavoritePage } from "./components/FavoritePage";



const App =()=> {

  const [locationApi,setLocationApi] = useState([]);

  const [selectedCity,setSelectedCity] = useState("");

  const [weatherForcast,setWeatherForcast] = useState([]);

  const [selectedDay,setSelectedDay] = useState("0");

  const [searchedItem,setSearchedItem] = useState("");



  useEffect(() => {
    const getLocations = async () => {
      const locations = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=s9LG1iE1JYDKGH9A5AeujArIo8xOyqjR&q=${searchedItem}&language=en-us`
      );
      const cityCountry = [];
      for (let location of locations.data) {
        let label = location.LocalizedName;
        let value = location.Country.LocalizedName;
        let code = location.Key;
        cityCountry.push({ label, value, code });
      }
      setLocationApi(cityCountry)
    };
    getLocations();
  }, [searchedItem])

  const getForcast = async value => {
    const forecast = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${value}?apikey=gnAuSabdsDkVLyrgGl8UjG4Oq5nQJnYB&details=true&metric=true`
    );
    setWeatherForcast(forecast.data.DailyForecasts);
  };



  const handleOnChange = (city, code) => {
    setSelectedCity(city);
    getForcast(code);
  };

  const handleDaySelection = e => {
    setSelectedDay(e);
  };


  return (
      <div className="App">
        <NavBar/>
        <h1 className="m-5">Weather Forecast App</h1>
        <br/>
        <h3>Abra</h3>


        <Switch>
          <Route component={FavoritePage} path='/favorite' />
          <Route path='/'>
            <Dropdown
                locations={locationApi}
                handleOnChange={handleOnChange}
                setSearchedItem={setSearchedItem}
            />
            {Object.keys(weatherForcast).length === 0 ? null : (
                <WeeklyWeather
                    handleDaySelection={handleDaySelection}
                    selectedDay={selectedDay}
                    selectedCity={selectedCity}
                    weatherData={weatherForcast}
                />
            )}
          </Route>
        </Switch>
      </div>
  );
}

export default App;