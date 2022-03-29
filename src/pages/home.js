import React, { useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Moment from 'react-moment';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.50),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginLeft: 100,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const cards = [];

export default function Home() {

  const searchRef = useRef();

  const [cityVal, setCityVal] = useState('');
  const [tempVal, setTempVal] = useState('');
  const [windVal, setWindVal] = useState('');
  const [humidityVal, setHumidityVal] = useState('');
  const [uvVal, setUvVal] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const searchFormSubmit = (event) => {
    event.preventDefault();
    console.log("FACE HEAD");
    let userSearch = searchRef.current.value;

    if (!userSearch) {
      console.error('Please enter a location to search');
      return;
    }

    currentApi(userSearch);
    fiveDay(userSearch);
  }

  const fiveDay = (locSearch) => {
    let currentUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + locSearch + '&units=imperial&appid=669d0117a66bacb5a8ed03c57960fe8c';

    fetch(currentUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }

        return response.json();
      })
      .then(function (fiveResults) {
        console.log("This is Five Day Weather Api");

      });
  }

  const currentApi = (locSearch) => {

    let currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + locSearch + '&units=imperial&appid=669d0117a66bacb5a8ed03c57960fe8c';

    fetch(currentUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (curResult) {
        setCityVal(curResult.name);
        console.log("This is the Current Weather API");
        oneCall(curResult);
      });
  };

  const oneCall = (curResult) => {
    let locLat = curResult.coord.lat;
    let locLon = curResult.coord.lon;
    let currentUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + locLat + '&lon=' + locLon + '&units=imperial&appid=669d0117a66bacb5a8ed03c57960fe8c';

    fetch(currentUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (oneCallData) {
        console.log("This is One Call Weather API");
        dispResult(oneCallData);
        dispResults(oneCallData);
      });
  };

  const dispResult = (oneCallData) => {
    console.log(oneCallData);
    setTempVal("Temperature: " + oneCallData.current.temp + "˚F");
    setWindVal("Wind: " + oneCallData.current.wind_speed + "MPH")
    setHumidityVal("Humidity: " + oneCallData.current.humidity + "%")
    setUvVal("UV Index: " + oneCallData.current.uvi)

  }



  const cardData = {
    day: {dateC}
    temp:
    wind:
    humidity:
    description:
  }

  const [dateC, setDateC] = useState('');
  const [tempC, setTempC] = useState('');
  const [windC, setWindC] = useState('');
  const [humC, setHumC] = useState('');
  const [desC, setDesC] = useState('');

  let cards = [];
    const dateC = [];
    const tempC = [];
    const windC = [];
    const humC = [];
    const desC = [];
  // let date = Moment.utc().format();
  // let local = Moment.utc(date).local().format();

  const dispResults = (oneCallData) => {
    

    for (let weatherIndex = 0; weatherIndex < 5; weatherIndex++) {

      let unixTimestap = oneCallData.daily[weatherIndex].dt;
      let milliseconds = unixTimestap * 1000;
      let dateObject = new Date(milliseconds);
      // let dateToFormat = dateObject.toLocaleString("en-US", { weekday: "long" });
      // setDateC(dateObject)
      // dateToFormat.push(dateC);
      setTempC(oneCallData.daily[weatherIndex].temp.day)
      setWindC(oneCallData.daily[weatherIndex].wind_speed)
      setHumC(oneCallData.daily[weatherIndex].humidity)
      setDesC(oneCallData.daily[weatherIndex].weather[0].description)
     
}
}




    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Weather World
              </Typography>
              <Box component="form" className="main" onSubmit={searchFormSubmit}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <FormControl>
                <StyledInputBase
                  id="component-outlined"
                  inputRef={searchRef}
                  placeholder="Search…"
                />
                </FormControl>
                <Button variant="filled"
                type="submit" >Search</Button>
              </Search>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <Typography className="display-4" id="current-city">{cityVal}</Typography>
                <Typography className="display-4" id="current-temp">{tempVal}</Typography>
                <Typography className="display-4" id="current-wind">{windVal}</Typography>
                <Typography className="display-4" id="current-humidity">{humidityVal}</Typography>
                <Typography className="display-4" id="current-uv">{uvVal}</Typography>
                <Button>Save this Location</Button>

              </Paper>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            {cards.map((card) => (
              <Grid item xs={2}>
              <Card variant="outlined">
                <Typography><Moment>{dateC['']}</Moment></Typography>
                <Typography>Temperature: {tempC['']}˚F</Typography>
                <Typography>Wind Speed: {windC['']}mph</Typography>
                <Typography>Humidity: {humC['']}%</Typography>
                <Typography>{desC['']}</Typography>
              </Card>
            </Grid>

            ))}
          </Grid>
          <Grid item xs={1}>
          </Grid>
      </Box>
    </>
  );
}