import React, { useState,useEffect } from "react";
import {NavBar} from "./components/NavigationBar";
import { Switch, Route } from 'react-router-dom';
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "./components/DropDown";
import { WeeklyWeather } from "./components/WeeklyWeather";
import { FavoritePage } from "./components/FavoritePage";
import {Button} from 'react-bootstrap'
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {DynamicHeader} from "./style/dynamicHeader";



const App =()=> {

    const [locationApi,setLocationApi] = useState([]);

    const [selectedCity,setSelectedCity] = useState("");

    const [weatherForcast,setWeatherForcast] = useState([]);

    const [selectedDay,setSelectedDay] = useState("0");

    const [searchedItem,setSearchedItem] = useState("");

    const [codeHolder,setCodeHolder] = useState('');

    const [todayForecast,setTodayForecast] = useState([])

    const dispatch = useDispatch();

    const favoCodes = useSelector(state=>state.favorites)

    let temp1=0;


    useEffect(() => {
        const getLocations = async () => {
            const locations = await axios.get(
                `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=s9LG1iE1JYDKGH9A5AeujArIo8xOyqjR&q=${searchedItem}&language=en-us`
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

        try {
            const forecast = await axios.get(
                `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${value}?apikey=s9LG1iE1JYDKGH9A5AeujArIo8xOyqjR&details=true&metric=true`
            );
            const todayForecast1 = await axios.get(
                `https://dataservice.accuweather.com/currentconditions/v1/${value}?apikey=s9LG1iE1JYDKGH9A5AeujArIo8xOyqjR&details=true&metric=true`
            );
            setTodayForecast(todayForecast1);
            setWeatherForcast(forecast.data.DailyForecasts);
        } catch (err) {
            console.log(err)
            throw err
        }
    };

    const handleOnChange = (city, code) => {
        setSelectedCity(city);
        getForcast(code);
        setCodeHolder(code);
        setLocationApi([]);
        setSearchedItem('');
    };

    useEffect(()=>{
        handleOnChange("Tel Aviv","215854")
    },[])

    const handleDaySelection = e => {
        setSelectedDay(e);
    };

    const handleOnAddToFavorites =()=>{
        temp1=(+codeHolder)
        let tempList = {
            selectedDay: {selectedDay},
            selectedCity: {selectedCity},
            weatherData: {weatherForcast},
            key : {temp1},
            todayData:{todayForecast},
            cityCode:{codeHolder}

        }
        dispatch({type:'ADD_FAVORITE', favorites: tempList});
    }

    const handleOnRemoveFavoritesMain =() =>{
        dispatch({type:'REMOVE_FAVORITE'});
    }

    return (
        <div className="App">
            <NavBar/>
            <DynamicHeader text ="Weather Forecast App"></DynamicHeader>

            <br/>
            <Switch>
                <Route path='/favorite' >
                    <div>
                        {favoCodes.length > 0 ? <Button variant="outline-danger" onClick={handleOnRemoveFavoritesMain}>Clear favorites</Button> : null}
                        {favoCodes.length > 0 ? favoCodes.map(sweetItem =>
                                <FavoritePage
                                    handleDaySelection={handleDaySelection}
                                    selectedDay={sweetItem.selectedDay.selectedDay}
                                    selectedCity={sweetItem.selectedCity.selectedCity}
                                    weatherData={sweetItem.weatherData.weatherForcast}
                                    key={sweetItem.key.temp1}
                                    todayData={sweetItem.todayData.todayForecast}
                                    cityCode={sweetItem.cityCode.codeHolder}
                                >
                                </FavoritePage>
                        ) : <Button variant="outline-secondary">No favorites added yet</Button>}
                    </div>
                </Route>
                <Route path='/'>
                    <Dropdown
                        locations={locationApi}
                        handleOnChange={handleOnChange}
                        setSearchedItem={setSearchedItem}
                        searchedItem={searchedItem}
                    />
                    {Object.keys(weatherForcast).length === 0 ? null : (
                        <div>
                            <WeeklyWeather
                                handleDaySelection={handleDaySelection}
                                selectedDay={selectedDay}
                                selectedCity={selectedCity}
                                weatherData={weatherForcast}
                                todayData={todayForecast}
                            />
                            {(favoCodes.filter(favorite => +favorite.key.temp1 === +codeHolder).length===0)?(<Button variant="outline-primary" onClick={handleOnAddToFavorites}>Add to favorites</Button>):
                                (<Button variant="outline-secondary">Added to favorites</Button>)   }
                        </div>
                    )}
                </Route>
            </Switch>
        </div>
    );
}

export default App;