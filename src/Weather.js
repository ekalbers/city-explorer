import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

class Weather extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      weatherData: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let url = REACT_APP_SERVER + 'weather?lat='
      + this.props.cityObj.lat
      + '&lon='
      + this.props.cityObj.lon;

    console.log(url);

    let promise = axios.get(url);
    promise
      .then((response) => {
        console.log(response.data);
        this.setState({ weatherData: response.data });
      })
      .catch(error => {
        console.log('ERROR');
        console.log(error);
        this.props.updateError(error.response.data, error.response.status);
        this.props.closeWeather();
        this.props.showAlert();
      })
  }

  render = () => {
    if (this.props.show) {

      return (
        <Modal show={this.props.show} onHide={this.props.closeWeather} centered>
          <Modal.Body>
            {this.state.weatherData.map(item => {
              console.log(item);
              return (
                <div key={item.date}>
                  <p>Date: {item.date}</p>
                  <p>Description: {item.description}</p><br></br>
                </div>
              );
            })
            }
          </Modal.Body>
        </Modal>
      );
    }
  }
}

export default Weather;