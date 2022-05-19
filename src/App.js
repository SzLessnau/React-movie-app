import { useState } from 'react';
import Axios from "axios";
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponet from './components/MovieInfoComponet';

export const API_KEY = "9386f6fe";

const Container = styled.div`
displayL flex;
flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {

const [searchQuery, updateSearchQuery] = useState();
const [timeoutId, updateTimeoutId] = useState();
const [movieList, updateMovieList] = useState([]);
const [selectedMovie, onMovieSelect] = useState();


const fetchData = async (searchString)=>{
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
    updateMovieList(response.data.Search)
}
const onTextChange = (event) => {
clearTimeout(timeoutId);
updateSearchQuery(event.target.value);
const timeout = setTimeout(() => fetchData(event.target.value), 500);
updateTimeoutId(timeout);
};
  return (
    <Container >
      <Header><AppName>
        <MovieImage src="/movie-icon-png-2.jpg"></MovieImage>WORST FILMWEB</AppName>
        <SearchBox>
          <SearchIcon src="64673.png"></SearchIcon>
          <SearchInput placeholder="Search Mocie" value={searchQuery} onChange={onTextChange}></SearchInput>
        </SearchBox>
        
        </Header>

        {selectedMovie && <MovieInfoComponet 
        selectedMovie={selectedMovie} 
        onMovieSelect={onMovieSelect}
        />}
        
        <MovieListContainer>
          {movieList?.length
          ? movieList.map((movie, index) => <MovieComponent 
          key={index} 
          movie={movie} 
          onMovieSelect={onMovieSelect}
          />)
          : <Placeholder src="/movie-icon-png-2.jpg"/>}
         
        </MovieListContainer>
     
    </Container>
  );
}

export default App;
