import React from 'react';
import { 
  BrowserRouter as Router,
  Routes, 
  Route 
} from "react-router-dom";
import Home from '../Home'
import { createBrowserHistory} from 'history'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Search from '../Search';
import './style.css';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar bg="primary" expand="lg" variant="dark" >
          <Navbar.Brand href="/">React Image Gallery</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Image Search</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/search" element={<Search/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;