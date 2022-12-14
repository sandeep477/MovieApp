//import { movies } from "./getMovies";
import '../App.css'
import React, { Component } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';



export default class Movies extends Component {
   constructor(){
    super();
    this.state = {
        hover:'',
        page:[1],
        currPage:1,
        movies:[],
        favourite:[]
    }
   }
  async componentDidMount()
   {
     let res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=afcee49b17c9b5840cdfbc3d9fe1df0e&language=en-US&page=${this.state.currPage}`);
     let data = res.data;
    // console.log(data);
    this.setState({
        movies:[...data.results]
    })
    }
    updateincPage=()=>{
        this.setState({
         page: [...this.state.page,this.state.page.length + 1],
         currPage :this.state.currPage+1
        })
        
   
     }
     updatedecPage=()=>{
        this.state.page.pop()
        this.setState({
            page: [...this.state.page],
            currPage :this.state.currPage-1
        },)
  
     }
     async componentDidUpdate()
     {
        let res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=afcee49b17c9b5840cdfbc3d9fe1df0e&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
       // console.log(data);
       this.setState({
           movies:[...data.results]
       })
     }
    handleClick = (val)=>{
        if(val !== this.state.currPage)
        {
            this.setState({
                currPage : val
            })
        }
    }
    handleFavourite = (movie)=>{
             let oldmovies = JSON.parse(localStorage.getItem("movies-app")||"[]");
             if(this.state.favourite.includes(movie.id))
             {
                    oldmovies = oldmovies.filter((m)=> m.id!=movie.id);
             }
             else{
                    oldmovies.push(movie);
             }
                localStorage.setItem("movies-app",JSON.stringify(oldmovies));
                this.handleFavouriteState();
     }
     handleFavouriteState=()=>{
        let oldmovies = JSON.parse(localStorage.getItem("movies-app")||"[]");
        let temp_ids = oldmovies.map((m)=> m.id)
        this.setState({
            favourite: [...temp_ids]
        })
     }
     
  render() {    
   // let  movie = movies.results;
    return (
      <div>
        {this.state.movies.length===0?<div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>:
        <div>
             <h3 className="text-center"><strong>Trending</strong></h3>
             <div className='movie-list'>
                {
                    this.state.movies.map((moieObj)=>(
                        <div key ={moieObj.id} className="card movies-card" onMouseEnter={()=>this.setState({hover: moieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                <img src={`https://image.tmdb.org/t/p/original${moieObj.backdrop_path}`} className="card-img-top movie-img" alt={moieObj.title}/>
                {/* <div classBName="card-body"> */}
                <h5 className="card-title movies-title">{moieObj.original_title}</h5>
                {/* <p className="card-text movies-text">{moieObj.overview}</p> */} 
                <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                {
                    this.state.hover === moieObj.id && <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourite(moieObj)}>{this.state.favourite.includes(moieObj.id)?"Remove from":"Add To"} Favourites</a>
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
  <ul className="pagination">
    <li className="page-item"><a className="page-link"  onClick={this.updatedecPage}>Previous</a></li>
    {
        this.state.page.map((value)=>(
            <li key={value} className="page-item"><a className="page-link"  onClick={()=>this.handleClick(value)}>{value}</a></li>
        ))
    }
    
    <li className="page-item"><a className="page-link"  onClick={this.updateincPage}>Next</a></li>
  </ul>
</nav>
        </div>
      </div>
    )
  }
}
