import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import img from './nomovieimg.png';
import './MovieDetails.css';
function MovieDetails(props){
    const {id}=useParams();
    const [movieData, setmovieData] = useState(null);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const navigate=useNavigate();
    useEffect(() => {
      if(props.apiData===null || props.apiData===undefined){
        navigate('/');
      }
      function findMovie(){
        return props.apiData.find((element)=>element.show.id===Number(id));
      }
      const foundMovie=findMovie();
      if(foundMovie!==undefined){
        setmovieData(foundMovie);
        // document.getElementsByClassName('summary')[0].innerHTML=foundMovie.show.summary;
      }
      else{
        navigate('/');
      }
    },[props.apiData,id,navigate])
    function bookForm(){
        document.getElementsByClassName('form')[0].style="display:block;"
    }
    function closeForm(){
        document.getElementsByClassName('form')[0].style="display:none;"
    }
    async function formSubmitHandler(e){
        e.preventDefault();
        let formData={
            movie:movieData.show.name,
            name:name,
            number:number
        }
        setName("");
        setNumber("");
        let finalFormData=await JSON.stringify(formData);
        localStorage.setItem('formData',finalFormData);
        if(localStorage.getItem('formData')){
            alert("Movie Booked Successfully");
            closeForm();
        }
    }
    return(
        <div className="movie">{(movieData)?<div className="movieDetails">
            <div className="header">
                <div className="title"><h1>{movieData.show.name}</h1></div>
                <div className="details">
                    <div className="movieType">{movieData.show.type}</div>
                    <div className="movieLanguage">{movieData.show.language}</div>
                    <div className="date">{(movieData.show.premiered)?movieData.show.premiered+' -  ':""}{(movieData.show.ended)?movieData.show.ended:""}</div>
                    {(movieData.show.rating && movieData.show.rating.average)?<div className="movieRating">{movieData.show.rating.average}<i className="fa-brands fa-imdb"></i></div>:<></>}
                    <div className="movieGenres">
                        {
                            (movieData.show.genres)?movieData.show.genres.map((element,idx)=><span key={movieData.show.id+""+idx}>{element}</span>):<></>
                        }
                    </div>
                   
                </div>
            </div>
            <div className="image">
            { (movieData.show.image)?<img src={movieData.show.image.original} alt="movie"/>:<img src={img} alt='movie'/>}
            </div>
            <div className="summary" dangerouslySetInnerHTML={{__html:movieData.show.summary}}></div>
            <div className="movieBtn">
                <button onClick={()=>bookForm()}>Book Now</button>
            </div>
            <div className="form" onSubmit={(e)=>formSubmitHandler(e)}>
                <div className="closeBtn"><button onClick={(e)=>closeForm(e)}>x</button></div>
                <form>
                    <div className="movieName">
                    <div className="label"><label htmlFor="movieName">Movie Name</label></div>
                    <div className="input"> <input type="text" name="movieName" id="movieName" value={movieData.show.name} disabled/></div>
                    </div>
                    <div className="uname">
                    <div className="label"><label htmlFor="name">User Name</label></div>
                    <div className="input"><input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} required /></div>
                    </div>
                    <div className="contact">
                    <div className="label"><label htmlFor="number">Phone Number</label></div>
                    <div className="input"><input type="text" name="number" id="number" value={number} onChange={(e)=>setNumber(e.target.value)} pattern={"[0-9]*"} required minLength={10} maxLength={10}/></div>
                    </div>
                    <div className="btn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>:<>Loading...</>}</div>
    )
}
export default MovieDetails;