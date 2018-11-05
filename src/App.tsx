import * as React from "react";

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

interface State {
  singlePerson: Person | Person[];
  people: Person[];
}

class App extends React.Component<{}, State> {
  public readonly state = {
    singlePerson: {} as Person,
    people: []
  };
  public componentDidMount(): void {
    this.getPeople();
  }

  public getPerson(userId: number) {
    fetch(`https://swapi.co/api/people/${userId}/`)
      .then(data => data.json())
      .then(
        (data: Person): void => this.setState(() => ({ singlePerson: data }))
      );
  }

  public getPeople(): void {
    fetch(`https://swapi.co/api/people/`)
      .then(data => data.json())
      .then(data => this.setState({ people: data.results }));
  }

  public render() {
    return (
      <div style={{ padding: "20px" }}>
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
    );
  }
}

export default App;
