import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {setting, conf} from '../config/config';
export const slice = createSlice({
  name: 'eventData',
  initialState: {
      events: []
  },
  reducers: {
    getAllData: (state, action) => {
      state.events = action.payload;
    },
    setEventData: (state, action) => {
        state.events = [...state.events, action.payload];
    }
  },
});

export const { getAllData, setEventData} = slice.actions;

export const getAll = () => dispatch =>{
    axios.post(`${conf.api_url}/event/getAll`)
        .then(response => {
            var data = jwt_decode(response.data.data, setting.secret);
            dispatch(getAllData(data));
        })
        .catch(() => {
    });
}

export const delEvent= (id) => dispatch=> {
    axios.post(`${conf.api_url}/event/delEvent`, {id : id})
        .then(response => {
            if(response.data.status === "Success"){
                dispatch(getAll());
                toast.success("success");
            }else{
                toast.warn("Error");
            }
        })
        .catch(() => {
    });
}

export const addEvent = (params) => dispatch => {
    axios.post(`${conf.api_url}/event/addEvent`,params)
    .then(response => {
        if(response.data.status === "Success"){
            dispatch(getAll());
            toast.success("success");
        }else{
            toast.warn("Error");
        }
    })
    .catch(()=>{
        console.log("error");
    })
}

export const selectEvent = state => state.eventsData.events;

export default slice.reducer;
