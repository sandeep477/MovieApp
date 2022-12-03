import { movies } from "./getMovies";
import '../App.css'
import React, { Component } from 'react'

export default class  extends Component {
   constructor(){
    super();
    this.state = {
        hover:'',
        page:[1]
    }
   }
   
  render() {
    let  movie = movies.results;
    return (
      <div>
        {movie.length===0?<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>:
        <div>
             <h3 className="text-center"><strong>Trending</strong></h3>
             <div className='movie-list'>
                {
                    movie.map((moieObj)=>(
                        <div className="card movies-card" onMouseEnter={()=>this.setState({hover: moieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                <img src={`https://image.tmdb.org/t/p/original${moieObj.backdrop_path}`} className="card-img-top movie-img" alt={movie.title}/>
                {/* <div classBName="card-body"> */}
                <h5 className="card-title movies-title">{moieObj.original_title}</h5>
                {/* <p className="card-text movies-text">{moieObj.overview}</p> */} 
                <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                {
                    this.state.hover == moieObj.id && <a href="#" className="btn btn-primary movies-button">Add To Favourites</a>
                }
                
                </div>
                {/* </div> */}
                 </div>
                    ))
                }
             </div>
        </div>}
        <div style={{display:"flex",justifyContent:'center'}}> 
        <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    {
        this.state.page.map((value)=>(
            <li class="page-item"><a class="page-link" href="#">{value}</a></li>
        ))
    }
    
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
        </div>
      </div>
    )
  }
}
