import { Box, Text, Flex, Textarea } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

import Navbar from './Navbar';
import Poster from './Poster';
import { contextWrapper } from '../context'


const DetailsPage = () => {

  const { id } = useParams();
  const [details, setDetails] = useState(null)
  const [ratings, setRatings] = useState(null)
  const [notes, setNotes] = useState("")
  const { headers } = useContext(contextWrapper)

  
  useEffect(() => { 
    axios.get(`https://api.tvmaze.com/shows/${id}`)
    .then((res) => setDetails(res.data))

    axios.get(`https://movies-and-shows--collection.herokuapp.com/ratings/${id}`)
    .then(res => setRatings(res.data === null ? null : Number(res.data.ratings)))

    axios.get(`https://movies-and-shows--collection.herokuapp.com/notes/${id}`)
    .then(res => setNotes(res.data === null ? "" : res.data.notes) )
  
  }, [id])

  
  const handleRatings = (value) => {
    setRatings(value)
   
    const document = JSON.stringify({
      id: details.id,
      ratings: value
    })
  
    if(ratings) {
      axios.patch('https://movies-and-shows--collection.herokuapp.com/ratings/', document, {headers})
    } else {
      axios.post('https://movies-and-shows--collection.herokuapp.com/ratings/', document, {headers})
    }
  }

  const handleNotes = (value) => {
    setNotes(value)

    const document = JSON.stringify({
      id: details.id,
      notes: value
    })
   
    if(notes) {
      axios.patch('https://movies-and-shows--collection.herokuapp.com/notes/', document, {headers})
    } else {
      axios.post('https://movies-and-shows--collection.herokuapp.com/notes/', document, {headers})
    }
  }


  return (
    <Box>
      <Navbar />
      <Flex justifyContent="center" marginTop={5}>
        <Box w="80%">
          {details && <Poster details={details} />}
          <Box>
            <Text fontSize={25} fontWeight="bold">Your Review</Text>
            <Box fontSize={35}>
              <StarRatingComponent name='showRating'  onStarClick={(e) => handleRatings(e)} value={ratings} />
            </Box>
          </Box>
          <Box marginTop={3}>
            <Textarea 
              placeholder='Your private notes and comments about the movie...' 
              w={700}
              marginBottom={5}
              resize="none" 
              value={notes} 
              onChange={(e) => handleNotes(e.target.value)} 
            /> 
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default DetailsPage