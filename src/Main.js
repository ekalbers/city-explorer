import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Map from './Map';
import Cities from './Cities';
import Weather from './Weather';
import Movies from './Movies';

console.clear();

const REACT_APP_LOCATION_KEY = process.env.REACT_APP_LOCATION_KEY;
// const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityObj: [],
      weatherData: [],
      movieData: [],
      index: 0,
      show: false,
      showMap: false,
      showAlert: false,
      showWeather: false,
      showMovies: false,
      error: '',
      errorStatus: ''
    };
  }

  requestCity = () => {

    let urlLocation = 'https://us1.locationiq.com/v1/search?key='
      + REACT_APP_LOCATION_KEY
      + '&q='
      + this.state.city
      + '&format=json';
    let promise = axios.get(urlLocation);
    promise
      .then(response => {
        this.setState({ cityObj: response.data, show: true });
        console.log(response.data);
      })
      .catch(error => {
        console.log('ERROR');
        console.error(error);
        this.setState({ error: error.response.data.error });
        this.setState({ errorStatus: error.response.status });
        this.showAlert();
      })
  }

  /* getMovieData = async () => {
    let url = REACT_APP_SERVER + 'movies?city='
      + this.state.city;

    console.log(url);

    let promise = await axios.get(url);
    promise
      .then((response) => {
        this.setState({ movieData: response.data });
      })
      .catch(error => {
        console.log('ERROR');
        console.log(error);
        this.props.updateError(error.response.data, error.response.status);
        this.props.closeMovies();
        this.props.showAlert();
      })
  } */

  updateIndex = (index) => {
    this.setState({ index: index });
  }

  showModal = () => {
    this.setState({ show: true });
  }

  showMap = () => {
    this.setState({ showMap: true });
    console.log('showMap');
  }

  closeModal = () => {
    this.setState({ showMap: false });
    console.log('closeModal');
  }

  showAlert = () => {
    this.setState({ showAlert: true })
  }

  closeAlert = () => {
    this.setState({ showAlert: false })
  }

  updateError = (error, status) => {
    this.setState({ error: error });
    this.setState({ errorStatus: status });
  }

  showWeather = () => {
    this.setState({ showWeather: true });
  }

  closeWeather = () => {
    this.setState({ showWeather: false });
  }

  showMovies = () => {
    this.setState({ showMovies: true });
  }

  closeMovies = () => {
    this.setState({ showMovies: false });
  }

  render = () => {

    let weather = this.state.showWeather ? <Weather
      city={this.state.city}
      cityObj={this.state.cityObj[this.state.index]}
      show={this.state.showWeather}
      closeWeather={this.closeWeather}
      updateError={this.updateError}
      showAlert={this.showAlert} /> : <></>;

    let movies = this.state.showMovies ? <Movies
      city={this.state.city}
      show={this.state.showMovies}
      closeMovies={this.closeMovies}
      updateError={this.updateError}
      showAlert={this.showAlert} /> : <></>;

    return (
      <main>
        <h2>Find a city!</h2>
        <div>
          <Form style={{ width: "24%", marginRight: "38%", marginLeft: "38%" }}>
            <Form.Label>Type in a City:</Form.Label>
            <Form.Control
              type="text"
              id="city"
              value={this.state.city}
              onChange={x => this.setState({ city: x.target.value })} />
            <Button onClick={() => this.requestCity()}
              style={{ margin: "3%" }}>Explore!</Button>
            <Button onClick={() => this.showMovies()}
              style={{ margin: "3%" }}>Movies</Button>
          </Form>
          <div>
            <Cities
              cityObj={this.state.cityObj}
              show={this.state.show}
              updateIndex={this.updateIndex}
              showModal={this.showMap}
              showWeather={this.showWeather} />
          </div>
          <div>
            <Map
              locationKey={REACT_APP_LOCATION_KEY}
              cityObj={this.state.cityObj[this.state.index]}
              show={this.state.showMap}
              closeModal={this.closeModal} />
          </div>
          <div>
            <Modal centered show={this.state.showAlert} onHide={this.closeAlert}>
              <Modal.Body>
                <p>{this.state.errorStatus}: {this.state.error}</p>
              </Modal.Body>
            </Modal>
          </div>
          <div>
            {weather}
          </div>
          <div>
            {movies}
          </div>
        </div>
      </main >
    );
  }
}

export default Main;