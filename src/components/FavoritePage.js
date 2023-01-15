import React, {useState ,useEffect} from "react";
import {WeeklyWeather} from "./WeeklyWeather";
import {useDispatch} from "react-redux";
import { Button } from '@mui/material';



export const FavoritePage =(props)=> {
    const [itemKey,setItemKey] = useState('')
    const dispatch = useDispatch();

    useEffect(()=>{
        setItemKey(props.cityCode)
    },[])

    const handleOnRemoveFavorites =() =>{
        dispatch({type:'DELETE_ONE_FAVORITE', currentKey:itemKey});
    }


    return (
        <div>
            <WeeklyWeather
                handleDaySelection={props.handleDaySelection}
                selectedDay={props.selectedDay}
                selectedCity={props.selectedCity}
                weatherData={props.weatherData}
                todayData={props.todayData}
            />
            <Button variant="outline-primary" onClick={handleOnRemoveFavorites}>Delete current city from favorites</Button>
        </div>

);
}
