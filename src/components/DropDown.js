import React from "react";
import TextField from '@mui/material/TextField';
import "../style/DropDown.css";
import {Button} from 'react-bootstrap'

export const Dropdown =(props)=> {
        return (
        <div className="search-container flex justify-center align-center center">
            <form autoComplete="off" className="Search-form-to-location">
                <TextField value={props.searchedItem} className="TextField-to-search-location" label="Search for city..." name="location" onChange={(texto)=> props.setSearchedItem(texto.target.value)} />
            </form>
            <div className="Unmarked-list-to-search-location-result">
                {props.locations.length>0 && props.locations.map(option => <Button variant="outline-primary" className="Li-to-search-location-result" key={option.code} onClick={() => props.handleOnChange(option.label,option.code)}>{option.label},{option.value} </Button>)}
            </div>
        </div>
    );
}

export default Dropdown;