import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import { createDeal, createFavorite, deleteFavorite } from "../../api/dealsApi";
import { Favorite, FavoriteBorder } from '@material-ui/icons';

const PropertyInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({});
    const [avatarUrl, setAvatarUrl] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem('id'));
    const [properties, setProperties] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(0);
  
    const createDealHandler = async () => {
      try {
        const response = await createDeal({
          isClosed: false,
          isSold: false,
          PropertyId: id,
          UserId: userId
        });
  
        if (response.status === 201) {
          navigate('/profile');
          alert("Сделка добавлена");
        } else {
          alert("Сделка на эту собственность уже существует");
        }
      } catch (error) {
        console.error('Error creating deal:', error);
      }
    };
  
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setProperty(response.data.property);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };
  
    useEffect(() => {
      fetchProperty();
  
      axios.get(`/properties/avatar/${id}`, { responseType: 'blob' })
        .then(res => {
          setAvatarUrl(URL.createObjectURL(res.data));
        })
        .catch(error => {
          console.error(`Error fetching avatar for property ID ${id}:`, error);
        });
  
      if (userId) {
        axios.get(`/favorites/user/${userId}`)
          .then(response => {
            setProperties(response.data);
          })
          .catch(error => {
            console.error('Error fetching favorites:', error);
          });
      }
  
    }, [id, userId]);
  
    useEffect(() => {

      if (properties && properties.length > 0) {
        const matchingObj = properties.find(obj => obj.Id == id);

        if (matchingObj) {
          setIsFavorite(true);
        }
        else {
          setIsFavorite(false);
        }
      }
    }, [id, properties]);
  
    const handleButtonClick = async () => {
      try {
        if (isFavorite) {
            setIsFavorite(false);

            const response = await deleteFavorite({
                PropertyId: id,
                UserId: userId
              });
        }
        else {
          const response = await createFavorite({
            PropertyId: id,
            UserId: userId
          });

          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error handling favorite:', error);
      }
    };
  
    if (Object.keys(property).length === 0) {
      return <div>Loading...</div>;
    }

  return (
    <Box
    style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "90%",
        margin: "50px 5% 50px 5%"
    }}>
        <Typography variant="h2">{property.name}</Typography>

        

        <Box
            style={
                {
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    margin: "20px 0px 20px 0px"
                }
            }>
        <Box
            style= {
                {
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "45%",
                    height: "500px",
                    overflow: "hidden"
                }
            }>
            <img src={avatarUrl} alt="Example Image" width="100%" height="auto"/>
            <IconButton onClick={handleButtonClick} style={{ position: "absolute", fontSize: "36px" }}>
  {isFavorite ? <Favorite color="secondary"  fontSize="inherit" /> : <FavoriteBorder fontSize="inherit"  />}
</IconButton>
        </Box>

            <Box
                style={
                    {
                        width: "45%",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }
                }>
                <Typography variant="h4" style={
                    {
                        color: "#6495ED",
                        fontFamily: "system-ui"
                    }
                }>{property.price}$</Typography>

                <Typography variant="h6" style={
                    {
                        fontFamily: "system-ui"
                    }
                }>{property.PropertyType.name}</Typography>

                <Typography variant="h6" style={
                    {
                        fontFamily: "system-ui"
                    }
                }>Комнат: {property.rooms}</Typography>

                <Typography variant="body1"
                    style={
                        {
                            wordWrap: "break-word"
                        }
                    }>
                    {property.description}
                </Typography>

                <Typography variant="caption">{new Date(property.updatedAt).toLocaleString()}</Typography>

                <Button variant="contained" onClick={createDealHandler}>
                    Приобрести (с вами свяжутся)
                </Button>
            </Box>
         
        </Box>
    </Box>
  );
};

export default PropertyInfo;