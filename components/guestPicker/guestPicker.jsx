
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import styles from "./guestpicker.module.css";

export default function GuestPicker({setGuests}) {
  const [people, setPeople] = useState(1);

  const handleChange = (event) => {
    setGuests(event.target.value);
    setPeople(event.target.value);
    
  };

  return (
    <FormControl className={styles.guestPicker}  sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Guests</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        // variant="menu"
        required
        // defaultValue={1}
        value={people}
        label="People"
        onChange={handleChange}
      >
        <MenuItem value={"1"}>1</MenuItem>
        <MenuItem value={"2"}>2</MenuItem>
        <MenuItem value={"3"}>3</MenuItem>
        <MenuItem value={"4"}>4</MenuItem>
        <MenuItem value={"5"}>5</MenuItem>
        <MenuItem value={"5+"}>5+</MenuItem>
      </Select>
    </FormControl>
  );
}