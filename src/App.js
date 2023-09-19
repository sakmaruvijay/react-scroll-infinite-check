import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        error: null,
        isLoaded: false
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleScroll = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom) { 
      this.fetchData();
    }
  }

  fetchData = () => {
      fetch('https://randomuser.me/api/?results=20')
        .then(response => response.json())
        .then(
          (response) => {
            this.setState({
                items: this.state.items.concat(response.results),
                isLoaded: true
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
  };

  render() {
    if(this.state.error) {
      return <div className="error-message">Error occurred while fetching data: {this.state.error.message} </div>
    } else if(!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
          <div className="App">
              <div className="box" onScroll={this.handleScroll}>
                {this.state.items.map((value, index) => (
                  <ul className="row" key={index}>
                    <li>
                      <span className="text-bold">{value.name.first + ' ' + value.name.last}</span>
                      <span>{value.phone}</span>
                    </li>
                  </ul>
                ))}
              </div>
          </div>
        ); 
    }

  }

}

export default App;
