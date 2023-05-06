import img from './nomovieimg.png';
import './MovieCard.css';
import { NavLink } from 'react-router-dom';
function MovieCard(props){
    return(
        <div className="movieCard">
            <div className="movieImg">
               { (props.movie.show.image)?<img src={props.movie.show.image.medium} alt="movie"/>:<img src={img} alt='movie'/>}
            </div>
            <div className="movieData">
                <div className="name">{props.movie.show.name}</div>
                <div className="language">{props.movie.show.language}</div>
                <div className="genres">
                    {
                        (props.movie.show.genres)?props.movie.show.genres.map((element,idx)=><span key={props.movie.show.id+""+idx}>{element}</span>):<></>
                    }
                </div>
                {(props.movie.show.rating && props.movie.show.rating.average)?<div className="rating">{props.movie.show.rating.average}<i className="fa-brands fa-imdb"></i></div>:<></>}
            </div>
            <div className="footer">
                <div className="btn">
                    <NavLink to={'/movie/'+props.movie.show.id}>View More</NavLink>
                </div>
            </div>
        </div>
    )
}
export default MovieCard;