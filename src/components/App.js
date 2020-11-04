import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = event => {
    this.setState({
      filters: {type: event.target.value}
    })
    setTimeout(() => (console.log(this.state)), 5000) // This is to check the contents of state
  }

  onFindPetsClick = () => {
    if (this.state.filters.type == "all") {
      fetch("/api/pets")
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
        })
      })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
        })
      })
    }
  }

  onAdoptPet = id => {
    // Takes in an id for a pet
    // Find the matching pet in state.pets and 
    // Set the is Adopted property to true
    for (const pet of this.state.pets) {
      if (pet.id === id) {
        pet.isAdopted = true
      }
      setTimeout(() => {
        console.log(pet)
      }, 10000)
    }
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
