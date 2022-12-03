import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:'flex', flexWrap:'wrap',background:'blue',padding:'0.5'}}>
     <h1>Movies App</h1>
     <h4 style={{marginTop:'1.5rem',marginLeft:'2rem'}}>Favourites</h4>
     </div>
    )
  }
}
