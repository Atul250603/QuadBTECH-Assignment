import MovieCard from "./MovieCard";
import './Home.css';
function Home(props){
    return(
        <div className="movieList">
            {(props.apiData)?props.apiData.map((element,idx)=><MovieCard movie={element} key={element.show.id}/>):<></>}
        </div>
    )
}
export default Home;