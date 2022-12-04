import React, { Component } from 'react'
import '../App.css'
import {movies} from '../Components/getMovies'

export default class  extends Component {
    constructor(){
        super();
        this.state={
            genres:[]
        }
    }
  render() {
    const movie = movies.results;
    
let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
                 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family',
                 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 
                 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 
                 53: 'Thriller', 10752: 'War', 37: 'Western' };
let temp = [];
   movie.forEach((movvalue)=>{
           if(!temp.includes(genreids[movvalue.genre_ids[0]]))
           {
            temp.push(genreids[movvalue.genre_ids[0]]);
           }
   });
   temp.unshift("All Genres");    
   this.setState({
    genres : [...temp]
   })             
    return (
       
      <div className='main'>
        <div className='row'>
            <div className='col-3'>
            <ul class="list-group favourite-generas">
                {/* <li class="list-group-item active" aria-current="true">{temp[0]}</li> */}
               {
                   this.state.genres.map((tval)=>(
                    <li class="list-group-item">{tval}</li>
                   ))
               }
             </ul>
            </div>
            <div className='col-9'>
            <div className='row favourite-table' >
                <input type="text" className='input-group-text col'></input>
                 <input type="number" className='input-group-text    col'></input>
                 </div>
                 <div className='row'>
                        <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Popularity</th>
                            <th scope="col">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                        {   movie.map((movval)=>(
                            <tr>
                            <td ><img src={`https://image.tmdb.org/t/p/original${movval.backdrop_path}`} alt={movval.title} className="img-genre"/> {movval.original_title}</td>
                            <td>{genreids[movval.genre_ids[0]]}</td>
                            <td>{movval.popularity}</td>
                            <td>{movval.vote_average}</td>
                            <td><button type='button' className='btn btn-danger' >Delete</button></td>
                            </tr>
                        ))
                            
                        }
                        </tbody>
                        </table>
                 </div> 
                 <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                 </nav>     
            </div>
        </div>
      </div>
    )
  }
}
