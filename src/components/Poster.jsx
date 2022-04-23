import { Box, Text, Flex, Button, Image, Link as ExternalLink } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import noimage from '../assets/noimage.png'
import parse from 'html-react-parser';
import { useEffect, useState, useContext } from 'react';
import { contextWrapper } from '../context'


const Poster = ({ details }) => {
    const [isAdded, setIsAdded] = useState(false)
    const { headers } = useContext(contextWrapper)

    const pathname = useLocation().pathname.slice(1, 6);

    useEffect(() => {
        axios.get(`https://movies-and-shows--collection.herokuapp.com/favorites/${details.id}`)
        .then((res) => setIsAdded(res.data === null ? false : true))
    
    }, [details])

    const addToFavorites = () => {

        const document = JSON.stringify({
            id: details.id,
            image: details.image?.medium || noimage
        })

        axios.post('https://movies-and-shows--collection.herokuapp.com/favorites/', document, {headers})
        .then(res => setIsAdded(true))
    }

    const removeFromFavorites = () => {
        axios.delete(`https://movies-and-shows--collection.herokuapp.com/favorites/${details.id}`)
        .then(res => setIsAdded(false))
    }

  
  return (
    <Box>
        <Flex marginBottom={6}>
            <Box flex={1} >
              <Link to={`/movies/${details.id}`}>
                <Image src={details.image ? details.image.medium : noimage} alt="poster" />
              </Link>
            </Box>
            <Flex flexDir="column" justifyContent="space-between" flex={5}  marginLeft={6}>
              <Box>
                <Link to={`/movies/${details.id}`}>
                  <Box as='span' fontSize={25} fontWeight="bold">
                    {details.name} 
                    {" "}
                    {details.premiered && `(${details.premiered.slice(0, 4)})`}
                  </Box>
                </Link>
                <Flex marginY={2}>
                  {details.genres?.map((genre,i) => 
                  <Text fontSize={15} marginRight={1} key={i}>
                    {genre}{i !== details.genres.length-1 && ','}
                  </Text>
                  )}
                  {details.runtime && <Text fontSize={15}>{details.genres.length > 0 && '| '}{details.runtime} minutes</Text>}
                </Flex>
                <Box 
                  className={`${pathname}` === 'movie' ? "" : 'abbvSummary'} 
                  fontSize={15}
                  >
                    {parse(`${details.summary ? details.summary : ""}`)}
                </Box>
                <Box __css={{display: 'inline-block'}} fontSize={14} fontStyle="italic" marginY={4}>
                  <ExternalLink href={details.url} isExternal >
                    Visit official website
                  </ExternalLink>
                </Box>
              </Box>

              <Box>
                {isAdded 
                ? <Button onClick={removeFromFavorites} bg="red" _hover={{bg: 'red.300'}} _active={{bg: 'red.200'}}>Remove from Favorites</Button> 
                : <Button onClick={addToFavorites} bg="green.300" _hover={{bg: 'green.400'}} _active={{bg: 'green.500'}}>Add To Favorites</Button>}
              </Box>
            </Flex>
        </Flex>
    </Box>
  )
}

export default Poster