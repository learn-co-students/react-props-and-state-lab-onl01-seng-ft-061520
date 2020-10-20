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

  petFetch = () => {
    let allPets = '/api/pets'
    if (this.state.filters.type !== 'all') {
      allPets += `?type=${this.state.filters.type}`
    }
    fetch(allPets)
    .then(response => response.json())
    .then(pets => this.setState({ pets: pets}))
  }

  chooseType = ({target: {value}}) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: value
      }
    })
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    })
    this.setState({pets: pets})
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
              <Filters
              chooseType={this.chooseType}
              onFindPetsClick={this.petFetch}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
