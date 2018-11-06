import * as React from "react";

import "./App.css";

type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
};

type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
};

interface Props {}

interface State {
  singlePerson: Person;
  singlePlanet: Planet;
  people: Person[];
  planets: Planet[];
}

class App extends React.Component<Props, State> {
  public readonly state = {
    singlePerson: {} as Person,
    singlePlanet: {} as Planet,
    people: [],
    planets: []
  };

  public componentDidMount(): void {
    this.getPeople();
    this.getPlanets();
  }

  public getPerson(userId: number): void {
    fetch(`https://swapi.co/api/people/${userId}/`)
      .then(data => data.json())
      .then(
        (data: Person): void => this.setState(() => ({ singlePerson: data }))
      );
  }

  public getPlanet(planetId: number): void {
    fetch(`https://swapi.co/api/planets/${planetId}/`)
      .then(data => data.json())
      .then(
        (data: Planet): void => this.setState(() => ({ singlePlanet: data }))
      );
  }

  public getPeople(): void {
    fetch(`https://swapi.co/api/people/`)
      .then(data => data.json())
      .then(data => this.setState({ people: data.results }));
  }

  public getPlanets(): void {
    fetch(`https://swapi.co/api/planets/`)
      .then(data => data.json())
      .then(data => this.setState({ planets: data.results }));
  }

  public render() {
    return (
      <div style={{ padding: "20px", display: "flex", width: "100%" }}>
        <div
          style={{ border: "5px solid blue", padding: "10px", flex: "0 0 50%" }}
        >
          {this.state.people.length > 0 &&
            this.state.people.map((person: Person, i) => (
              <button key={i} onClick={() => this.getPerson(i + 1)}>
                {person.name}
              </button>
            ))}
          <pre className="App">
            {JSON.stringify(this.state.singlePerson, null, " ")}
          </pre>
        </div>
        <div
          style={{ border: "5px solid blue", padding: "10px", flex: "0 0 50%" }}
        >
          {this.state.planets.length > 0 &&
            this.state.planets.map((planet: Planet, i) => (
              <button key={i} onClick={() => this.getPlanet(i + 1)}>
                {planet.name}
              </button>
            ))}
          <pre className="App">
            {JSON.stringify(this.state.singlePlanet, null, " ")}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
