import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import list from './scraping/output/Final_List.json'

class App extends Component {
  render () {
    return (
      <div className='App'>
        {list.map((details, index) => {
          return <h1>{details.Resaurant.name}</h1>
        })}

      </div>
    )
  }
}

export default App
