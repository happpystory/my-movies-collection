import { Box, Text, Flex, Input, Button } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Poster from './Poster';

const SearchPage = () => {
  const {'*' : searchTerm } = useParams();
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([]);
 
  useEffect(() => { 
    if(searchTerm) { 
      axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then((res) => setResults(res.data))
    }
  }, [searchTerm])
  
 
  return (
    <Box>
      <Navbar />
      <Box marginTop={3}>
        <Box textAlign="center">
          <Text fontSize={25} fontWeight="bold">Search</Text>
        </Box>
        <Flex justifyContent="center" marginTop={3}>
          <Input 
            placeholder='Search by movie title' 
            bg="white" 
            marginRight={2} 
            w={300} 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to={`/search/${query}`}>
            <Button>Search</Button>
          </Link>
        </Flex>
      </Box>
      <Flex justifyContent="center" marginTop={5}>
        <Box w="80%">
          {results.length > 0 && 
          results.map((item, i) => <Poster key={i} details={item.show} />)}

          {searchTerm && !results.length > 0 && 
          <Text textAlign="center">No results found</Text>}
        </Box>
      </Flex>
    </Box>
  )
}

export default SearchPage