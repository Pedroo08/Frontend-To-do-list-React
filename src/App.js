
import './App.css';
import React from 'react';
import AdminRoutes from './AdminRoutes';
import Top from './components/Top';
function App() {
  return(
    <>
      <Top/>
      
      <section className='main-section'><AdminRoutes/> </section>
      
    </>
  )
  
}

export default App;
