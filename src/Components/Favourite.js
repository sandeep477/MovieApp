import React, { Component } from 'react'
import '../App.css'
import {movies} from '../Components/getMovies'

export default class Favourite extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            selectedMovies:[...movies.results],
            currGen:"All Genres"
        }
    }
    componentUpdate=()=>{
        if(this.state.currGen == "All Genres")
        {
            this.setState({
                selectedMovies : [...movies.results]
            });
            
        }
        else{
        console.log(this.state.currGen);
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
                 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family',
                 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 
                 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 
                 53: 'Thriller', 10752: 'War', 37: 'Western' };
            let temp = [];
            temp = movies.results.filter((mov)=>{
                   return genreids[mov.genre_ids[0]]===this.state.currGen;
            });
            console.log(temp);
            this.setState({
                selectedMovies : [...temp]
            })
        }
           
    }
    updateMovies =(val)=>{
       this.setState({
        currGen:val
       },this.componentUpdate);
       
    }
    componentDidMount=()=>{
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
    }
  render() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 
    9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 
    53: 'Thriller', 10752: 'War', 37: 'Western' };
    return (
       
      <div className='main'>
        <div className='row'>
            <div className='col-3'>
            <ul className="list-group favourite-generas">
                {/* <li class="list-group-item active" aria-current="true">{temp[0]}</li> */}
               {
                   this.state.genres.map((tval)=>(
                    this.state.currGen === tval?
                    <li key={tval} className="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}} onClick={()=>this.updateMovies(tval)} >{tval}</li>:
                    <li key={tval} className="list-group-item" style={{background:'white',color:'#3f51b5',fontWeight:'bold'}} onClick={()=>this.updateMovies(tval)}>{tval}</li>
                   ))
               }
             </ul>
            </div>
            <div className='col-9'>
            <div className='row favourite-table' >
                <input type="text" className='input-group-text col'></input>
                 <input type="number" className='input-group-text col'></input>
                 </div>
                 <div className='row'>
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Popularity</th>
                            <th scope="col">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                        {  this.state.selectedMovies.length===0?<div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>:
                             this.state.selectedMovies.map((movval)=>(
                            <tr key={movval.id}>
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
                        <ul className="pagination">
                            {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li> */}
                            <li className="page-item"><a className="page-link">1</a></li>
                            
             
                        </ul>
                 </nav>     
            </div>
        </div>
      </div>
    )
  }
}
