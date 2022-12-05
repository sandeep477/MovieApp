import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navbar/>
    <Routes>
    <Route path='/' exact element={
        <div>
          <Banner />
          <Movies />
        </div>}
         />
      <Route path='/favourite' element={<Favourite/>}/>
    </Routes>
    </Router>
  );
}

export default App;
