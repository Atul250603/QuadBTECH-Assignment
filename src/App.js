import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MovieDetails from './components/MovieDetails'
import {Routes, Route} from 'react-router-dom';
function App() {
  const [apiData, setapiData] = useState([]);
  useEffect(()=>{
    async function fetchApi(){
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch("https://api.tvmaze.com/search/shows?q=all", { 
         method: "GET",
         headers: headersList
       });
       let data=await response.json();
       if(data.length>0){
        setapiData(data);
       }
    };
    fetchApi();
  },[])
  return (
    <div className='mainBody'>
      <Navbar/>
      {(apiData.length>0)?<div className="body">
      <Routes>
        <Route exact path="/" element={<Home apiData={apiData}/>}/>
        <Route exact path="/movie/:id" element={<MovieDetails apiData={apiData}/>}/>
      </Routes>
      </div>:<>Loading.....</>
      }
    </div>
  );
}

export default App;
