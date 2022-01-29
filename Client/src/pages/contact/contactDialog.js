import { React, useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import Stack from '@mui/material/Stack';

import { toast, ToastContainer } from "react-toastify";

import { useSelector, useDispatch } from 'react-redux';
import {
  addEvent
} from '../../actions/contactAction';

export default function ContactDialog(props) {

  const dispatch = useDispatch();

  useEffect(()=>{
    setFormData({...formData, 
      title: props.eventData.title, 
      description:props.eventData.description, 
      start: props.eventData.start, 
      end: props.eventData.end,
      type: props.eventData.type,
      _id :props.eventData._id
    });  
  }, [props])

  const [formData, setFormData] = useState({
    title: props.eventData.title,
    start: props.eventData.start,
    end: props.eventData.end,
    description: props.eventData.description,
    type: props.eventData.type,
    _id: props.eventData._id
  });

  const handleClose = () => {
    props.setOpen(false);
  };
  const handleSave=()=>{
    if(formData.title == ""){
      toast.error("Title Required!");
    }else if(formData.type == ""){
      toast.error("Type Required!");
    }else{
      dispatch(addEvent(formData));
      props.setOpen(false);
    }
  }
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add You event. You can add the event title, description and duration
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Event Title"
            type="text"
            fullWidth
            variant="standard"
            value={formData.title}
            onChange={evt => { setFormData(f => ({ ...f, title: evt.target.value})) }}
          />
          <TextField
            required
            margin="dense"
            id="description"
            label="Event Description"
            type="text"
            fullWidth
            variant="standard"
            value={formData.description}
            onChange={evt => { setFormData(f => ({ ...f, description: evt.target.value})) }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  label="Start"
                  value={formData.start}
                  disabled
                  onChange={evt => { setFormData(f => ({ ...f, start: evt})) }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="end"
                  value={formData.end}
                  disabled
                  onChange={evt => { setFormData(f => ({ ...f, end: evt})) }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Event Type</InputLabel>
              <Select
                required
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.type}
                onChange={evt => { setFormData(f => ({ ...f, type: evt.target.value})) }}
                label="Type"
              >
                <MenuItem value={'Holiday'}>Holiday</MenuItem>
                <MenuItem value={'Vacation'}>Vacation</MenuItem>
                <MenuItem value={'Weekend'}>Weekend</MenuItem>
                <MenuItem value={'Travel'}>Travel</MenuItem>
              </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={2000} />
    </div>
  );
}