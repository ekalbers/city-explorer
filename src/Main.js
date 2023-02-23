import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Map from './Map';
import Cities from './Cities';
import Weather from './Weather';

console.clear();

const REACT_APP_LOCATION_KEY = process.env.REACT_APP_LOCATION_KEY;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityObj: [],
      weatherData: [],
      index: 0,
      show: false,
      showMap: false,
      showAlert: false,
      showWeather: false,
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
        this.setState({ error: error.response.error });
        this.setState({ errorStatus: error.response.status });
        this.showAlert();
      })
  }

  getWeatherData = () => {

    let url = 'http://localhost:3001/weather?city='
      + this.state.city
      + '&lat='
      + this.state.cityObj[this.state.index].lat
      + '&lon='
      + this.state.cityObj[this.state.index].lon;

    console.log(url);

    let promise = axios.get(url);
    promise
      .then((response) => {
        console.log(response.data);
        this.setState = ({ weatherData: response.data, showWeather: true });
      })
      .catch(error => {
        console.log('ERROR');
        console.log(error);
        this.updateError(error.response.data, error.response.status);
        this.showAlert();
      })
  }

  updateIndex = (index) => this.setState({ index: index });


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
    this.getWeatherData();
  }

  closeWeather = () => {
    this.setState({ showWeather: false });
  }

  render = () => {

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
            <Button onClick={x => this.requestCity()}
              style={{ margin: "3%" }}>Explore!</Button>
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
            <Weather
              weatherData={this.state.weatherData}
              show={this.state.showWeather}
              closeWeather={this.closeWeather} />
          </div>
        </div>
      </main >
    );
  }
}

export default Main;