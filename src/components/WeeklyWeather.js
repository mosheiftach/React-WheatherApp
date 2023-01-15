import React from "react";
import { CurrentDayWeather } from "./CurrentDayWeather";
import Moment from "react-moment";
import "../style/WeeklyWeather.css";


export const WeeklyWeather = ({
                                  weatherData, selectedCity, selectedDay, handleDaySelection,todayData}) => {
    return (
        <div className="container-weather-container">
            <h4>{selectedCity}</h4>
            <div >
                {weatherData[0] ? (
                    <div className="d-flex p-2 bd-highlight justify-content-center top-weather">
                        <div className="flex-row bd-highlight">
                            <Moment format="dddd">{weatherData[selectedDay].Date}</Moment>

                            <div className="flex-row bd-highlight">
                                <img
                                    src={`https://developer.accuweather.com/sites/default/files/${
                                        weatherData[selectedDay].Day.Icon >= 10
                                            ? weatherData[selectedDay].Day.Icon
                                            : "0" + weatherData[selectedDay].Day.Icon
                                    }-s.png`}
                                    alt="weather-icon"
                                />
                                <p>{weatherData[selectedDay].Day.IconPhrase}</p>
                            </div>
                        </div>


                        <div className="today-current-temp">
                            <div className="flex-row bd-highlight m-2 ">
                                <h6>Today</h6>
                                <img
                                    className="small-image"
                                    src={`https://developer.accuweather.com/sites/default/files/${
                                        todayData.data[0].WeatherIcon >= 10 ? todayData.data[0].WeatherIcon : "0" + todayData.data[0].WeatherIcon
                                    }-s.png`}
                                    alt="weather-icon"
                                />
                                <div >
                                    <h6>{`${todayData.data[0].WeatherText}`}</h6>
                                    <h6>{`${todayData.data[0].Temperature.Metric.Value}°C`}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="d-flex p-2 bd-highlight justify-content-center bottom-weather">
                    {weatherData.map((day, index) => (
                        <CurrentDayWeather
                            selectedDay={selectedDay}
                            dayIndex={index}
                            key={day.EpochDate}
                            dayDate={day.Date}
                            dayIcon={day.Day.Icon}
                            dayMaxTemp={day.Temperature.Maximum.Value}
                            dayMinTemp={day.Temperature.Minimum.Value}
                            handleDaySelection={() => handleDaySelection(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
