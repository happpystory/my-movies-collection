import { Box, Text, Flex, Input, Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Navbar = () => {

  const [query, setQuery] = useState("")

  const navigate = useNavigate()

  const handleSearch = () => {
    if(query.trim() !== "") {
        navigate(`/search/${query}`)
    }
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" p={2} bg="gray.100">
        <Box>
            <Link to="/">
                <Text fontWeight="bold">My Movie Collection</Text>
            </Link>
        </Box>
        <Flex>
            <Input 
                placeholder='Search by movie title' 
                bg="white" 
                marginRight={2} 
                w={300} 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            
            <Button bg="white" onClick={handleSearch}>Search</Button>
        </Flex>
    </Flex>
  )
}

export default Navbar