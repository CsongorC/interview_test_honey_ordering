import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import honeyImage from '../images/honey-comb-pattern.png';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    padding: '20px',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  image: {
    height: '80px',
    width: '80px',
    marginRight: '10px',
    padding: '20px'
  },
  total: {
    position: 'fixed',
    top: '3%',
    right: '3%',
},
  payButton: {
    position: 'fixed',
    top: '3%',
    right: '3%',
  },
}));

type Item = {
    id: string;
    name: string;
    type: string;
    description: string;
    price: number;
  };
  
  type BasketProps = {
    cartItems: Item[];
    removeFromCart: (item: Item) => void;
    clearCart: () => void;
  };

const Basket = ({ cartItems, removeFromCart, clearCart }: BasketProps) => {
    const classes = useStyles();

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    const handleOrder = async (cartItems) => {
        try {
          const response = await axios.post('http://localhost:8080/api/order', { cartItems });
          console.log('Order successful:', response.data);
          alert('Order successful!')
          clearCart();
        } catch (error) {
          console.error('Error placing order:', error.response.data);
        }
      };
  
    const groupedItems = cartItems.reduce((acc, item) => {
      if (acc[item.type]) {
        acc[item.type].push(item);
      } else {
        acc[item.type] = [item];
      }
      return acc;
    }, {});
  
    return (
        <Box className={classes.root}>
          {Object.keys(groupedItems).length === 0 ? (
            <Typography variant="body1">A kosár üres.</Typography>
          ) : (
            Object.keys(groupedItems).map((type) => (
              <Box key={type}>
                <Typography variant="h5" gutterBottom>
                  {type}
                </Typography>
                <Box display="flex" flexWrap="wrap">
                  {groupedItems[type].map((item) => (
                    <Box className={classes.item} key={item.id}>
                      <img className={classes.image} src={honeyImage} alt={item.name} />
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="h6">Ár: {item.price} HUF</Typography>
                      <Button variant="contained" color="warning" onClick={() => removeFromCart(item)}>
                        Törlés
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))
          )}
          <Box className={classes.total}>
            <Typography variant="h5">Összesen: {total} HUF</Typography>
            {cartItems.length > 0 ? (
              <>
                <Button variant="contained" color="warning" onClick={() => handleOrder(cartItems)}>
                  Megrendelés
                </Button>
                <Button variant="contained" color="primary" onClick={() => clearCart()}>
                  Kosár ürítése
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" color="warning" disabled>
                  Megrendelés
                </Button>
                <Button variant="contained" color="primary" disabled>
                  Kosár ürítése
                </Button>
              </>
            )}
          </Box>
      
          <Link to="/list">
            <Button variant="contained" color="warning">
              Vissza a vásárláshoz
            </Button>
          </Link>
        </Box>
      );
};
export default Basket;