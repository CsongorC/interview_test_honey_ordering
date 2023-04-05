import {  Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import honeyImage  from '../images/honey-comb-pattern.png'

const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: '#f2f2f2',
      padding: '20px',
      minHeight: '100vh',
    },
    item: {
      backgroundColor: '#fff',
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '10px',
    },
    button: {
      marginTop: '10px',
      backgroundColor: '#f9a826',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#f48c06',
      },
    },
    name: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    price: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
    },
    cartButton: {
        position: 'fixed',
        right: '20%',
        color: 'white',
        borderRadius: '50%',
    },
    formControl: {
        minWidth: 120,
        margin: '0 10px',
    }
  }));

  const items = [
    {
      id: 1,
      name: 'Akác1',
      type: 'Akác',
      description: 'Leírás Akác mézről',
      price: 1000
    },
    {
      id: 2,
      name: 'Gyógy1',
      type: 'Gyógy',
      description: 'Leírás Gyógy mézről',
      price: 1200
    },
    {
      id: 3,
      name: 'Hárs1',
      type: 'Hárs',
      description: 'Leírás Hárs mézről',
      price: 1500
    },
    {
      id: 4,
      name: 'Virág1',
      type: 'Virág',
      description: 'Leírás Virág1 mézről',
      price: 800
    },
    {
        id: 5,
        name: 'Virág2',
        type: 'Virág',
        description: 'Leírás Virág2 mézről',
        price: 800
      },
    {
      id: 6,
      name: 'Repce1',
      type: 'Repce',
      description: 'Leírás Repce1 mézről',
      price: 900
    },
    {
      id: 7,
      name: 'Repce2',
      type: 'Repce',
      description: 'Leírás Repce2 mézről',
      price: 900
    },
    {
      id: 8,
      name: 'Repce3',
      type: 'Repce',
      description: 'Leírás Repce3 mézről',
      price: 900
    }
  ];


  const List = ({ addToCart }) => {
    const classes = useStyles();
    const [filter, setFilter] = useState('all');
  
    const handleFilterChange = (event) => {
      setFilter(event.target.value);
    };
  
    const filteredItems = filter === 'all' ? items : items.filter((item) => item.type === filter);
  
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h4">Termékek</Typography>
          <Link to="/basket" className={classes.cartButton}>
            <Button variant="contained" color="warning">
              Kosárhoz
            </Button>
          </Link>
          <FormControl className={classes.formControl}>
            <Select labelId="filter-label" id="filter" value={filter} onChange={handleFilterChange}>
              <MenuItem value="all">Összes</MenuItem>
              <MenuItem value="Akác">Akác</MenuItem>
              <MenuItem value="Gyógy">Gyógy</MenuItem>
              <MenuItem value="Hárs">Hárs</MenuItem>
              <MenuItem value="Virág">Virág</MenuItem>
              <MenuItem value="Repce">Repce</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Box className={classes.item}>
                <img className={classes.image} src={honeyImage} alt={item.type} />
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="body1" gutterBottom>
                  {item.type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {item.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  {item.price} HUF
                </Typography>
                <Button className={classes.button} variant="contained" color="warning" onClick={() => addToCart(item)}>
                  Kosárba teszem
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  
export default List;