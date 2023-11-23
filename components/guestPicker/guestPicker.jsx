
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
import { useWindowSize } from "@/hooks/windowSize";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import styles from "./guestpicker.module.css";

export default function GuestPicker({setAdults, setChildren, villa, setCapacityExceeded}) {
  const [adultsPicker, setAdultsPicker] = useState(1);
  const [childrenPicker, setChildrenPicker] = useState(0);
  const [exceededCapacity, setExceededCapacity] = useState(false);

  const size = useWindowSize();
  
  useEffect(() => {
    // console.log(adultsPicker, childrenPicker)
    if(villa === "Eros" && adultsPicker+childrenPicker > 2){
      setExceededCapacity(true);
      setCapacityExceeded(true)
    }else if(villa === "Ermis" && adultsPicker+childrenPicker > 6){
      setExceededCapacity(true);
      setCapacityExceeded(true)
    }
    else if(villa === "Villa" && adultsPicker+childrenPicker > 25){
      setExceededCapacity(true);
      setCapacityExceeded(true)
    }
    else if (villa != "Villa" && villa != "Ermis" && adultsPicker+childrenPicker > 4){
      setExceededCapacity(true);
      setCapacityExceeded(true)
    }else{
      setExceededCapacity(false);
      setCapacityExceeded(false)
    }
    
  }, [adultsPicker, childrenPicker,villa]);


  const handleChangeAdults = (event) => {
    setAdults(event.target.value);
    setAdultsPicker(event.target.value);
  };

  const handleChangeChildren = (event) => {
    setChildren(event.target.value);
    setChildrenPicker(event.target.value);
  };

  return (
    <div >
    <Tooltip open={exceededCapacity}  title={"Capacity exceeded !"} arrow placement={size.width < 680? "right":"top"} TransitionComponent={Zoom} 
    componentsProps={{
      tooltip: {
        sx: {
          bgcolor: '#b92f2f',
          '& .MuiTooltip-arrow': {
            color: '#b92f2f',
          },
        },
      },
    }}
    >
    <div className={styles.guestPicker__container}>
    <Tooltip title="> 6 years" placement="top">
    <FormControl  sx={{ m: 1, minWidth: 70 }} size="small">
      <InputLabel id="demo-select-small-label">Adult(s)</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        // variant="menu"
        required
        // defaultValue={1}
        value={adultsPicker}
        label="Adults"
        onChange={handleChangeAdults}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        {villa != "Eros" && <MenuItem value={3}>3</MenuItem>}
        {villa != "Eros" && <MenuItem value={4}>4</MenuItem>}
        {(villa === "Villa" || villa=== "Ermis") && <MenuItem value={5}>5</MenuItem>}
        {(villa === "Villa" || villa=== "Ermis") && <MenuItem value={6}>6</MenuItem>}
        {villa === "Villa" && <MenuItem value={7}>7</MenuItem>}
        {villa === "Villa" && <MenuItem value={8}>8</MenuItem>}
        {villa === "Villa" && <MenuItem value={9}>9</MenuItem>}
        {villa === "Villa" && <MenuItem value={10}>10</MenuItem>}
        {villa === "Villa" && <MenuItem value={11}>11</MenuItem>}
        {villa === "Villa" && <MenuItem value={12}>12</MenuItem>}
        {villa === "Villa" && <MenuItem value={13}>13</MenuItem>}
        {villa === "Villa" && <MenuItem value={14}>14</MenuItem>}
        {villa === "Villa" && <MenuItem value={15}>15</MenuItem>}
        {villa === "Villa" && <MenuItem value={16}>16</MenuItem>}
        {villa === "Villa" && <MenuItem value={17}>17</MenuItem>}
        {villa === "Villa" && <MenuItem value={18}>18</MenuItem>}
        {villa === "Villa" && <MenuItem value={19}>19</MenuItem>}
        {villa === "Villa" && <MenuItem value={20}>20</MenuItem>}
        {villa === "Villa" && <MenuItem value={21}>21</MenuItem>}
        {villa === "Villa" && <MenuItem value={22}>22</MenuItem>}
        {villa === "Villa" && <MenuItem value={23}>23</MenuItem>}
        {villa === "Villa" && <MenuItem value={24}>24</MenuItem>}
        {villa === "Villa" && <MenuItem value={25}>25</MenuItem>}
      </Select>
      </FormControl>
      </Tooltip>

      <Tooltip title="< 6 years" placement="top">
      <FormControl  sx={{ m: 1, minWidth: 70 }} size="small">
      <InputLabel id="demo-select-small-label">{"Children"}</InputLabel>
      
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        // variant="menu"
        required
        // defaultValue={1}
        value={childrenPicker}
        label="children"
        onChange={handleChangeChildren}
      >
        <MenuItem value={0}>0</MenuItem>
        {villa !== "Eros" &&<MenuItem value={1}>1</MenuItem>}
        {villa !== "Eros" &&<MenuItem value={2}>2</MenuItem>}
        {villa !== "Eros" && <MenuItem value={3}>3</MenuItem>}
        {villa === "Villa" && <MenuItem value={4}>4</MenuItem>}
        {villa === "Villa" && <MenuItem value={5}>5</MenuItem>}
        {villa === "Villa" && <MenuItem value={6}>6</MenuItem>}
        {villa === "Villa" && <MenuItem value={7}>7</MenuItem>}
        {villa === "Villa" && <MenuItem value={8}>8</MenuItem>}
        {villa === "Villa" && <MenuItem value={9}>9</MenuItem>}
        {villa === "Villa" && <MenuItem value={10}>10</MenuItem>}
        {villa === "Villa" && <MenuItem value={11}>11</MenuItem>}
        {villa === "Villa" && <MenuItem value={12}>12</MenuItem>}
        {villa === "Villa" && <MenuItem value={13}>13</MenuItem>}
        {villa === "Villa" && <MenuItem value={14}>14</MenuItem>}
        {villa === "Villa" && <MenuItem value={15}>15</MenuItem>}
      </Select>
      
      </FormControl>
      </Tooltip>
      </div>
      </Tooltip>
      </div>
  );
}