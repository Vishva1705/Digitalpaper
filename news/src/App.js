import {BrowserRouter,Routes, Route } from 'react-router-dom'
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Shop from './components/Shop';
import Navbar from './components/Navbar';
import Cardss from './components/Cardss';
import Sharing from './Sharing';



function App() {
  return (
    <div >

     <BrowserRouter>
     <Navbar/>

         <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/About' element={<About />} />
          <Route exact path='/Contact' element={<Contact />} />
          <Route exact path='/shop' element={< Shop />} />
          {/* <Route exact path='/sharing' element={< Sharing />} /> */}

          
         </Routes>
     </BrowserRouter>
    
     <div>
     
     </div>
     
     
    </div>
  );
}

export default App;
