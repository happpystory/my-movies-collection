import Navbar from "./Navbar"
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from 'axios';

import wallpaper from '../assets/wallpaper.jpg'


const HomePage = () => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        axios.get('https://movies-and-shows--collection.herokuapp.com/favorites/')
        .then((res) => setFavorites(res.data))
    }, [])

   
  return (
   <Box>
    <Navbar />
    <Flex justifyContent="flex-start" alignItems="center" h={300} bgImage={wallpaper}>
        <Box marginLeft={1} >
            <Box 
                as="span" 
                __css={{display: 'inline-block'}} 
                fontWeight="bold"  
                paddingX={2} 
                fontSize={30} 
                bg="#ffffffc5" 
                marginBottom={1}
            >
                Welcome...
            </Box>
            <Text fontWeight="bolder" paddingX={2} marginBottom={3} fontSize={20} bg="#ffffffc5">...to my all time favorites.</Text>
            <Link to='/search/'>
                <Button bg="blue.400">Search</Button>
            </Link>
        </Box>
    </Flex>
    <Box>
        <Box textAlign="center" marginTop={2}>
            <Text fontWeight="bold" fontSize={25}>Your Favorites</Text>
        </Box>
        <Flex justifyContent="center" marginTop={2}>
            <Flex w="80%" flexWrap="wrap">
              {favorites.length 
              ? favorites.map((item, i) => 
              <Box key={i} margin={3}>
                <Link to={`/movies/${item.id}`}>
                    <Image src={item.image} alt="poster" />
                </Link>
              </Box>)
              : (
                <Box flex={1} textAlign="center">
                   <Text>No items</Text>
                </Box>
              )}  
            </Flex>
        </Flex>
    </Box>
   </Box>
  )
}

export default HomePage