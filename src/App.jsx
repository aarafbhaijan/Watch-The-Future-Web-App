import { Container, } from '@mui/material';

import './App.css';
import Header from './Components/Header/Header';
import SimpleBottomNavigation from './Components/MainNav';
import { BrowserRouter as Router,Route, Routes,Switch} from 'react-router-dom';
import Trending from './Components/Trending/Trending.jsx';
import Movies from './Components/Movies/Movies.jsx';
import Series from './Components/Series/Series.jsx';
import Search from './Components/Search/Search.jsx';



// import Search from '@mui/icons-material/Search';
function App() {
  return (
    <>
    <Header />
    <div className="app">
      
        <Router>
        <Container>
          <Routes>

          <Route path='/' element={<Trending/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/series' element={<Series/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
        </Container>
        <SimpleBottomNavigation/>
        </Router>

      
    </div>
    
    </>
  );
}

export default App;
