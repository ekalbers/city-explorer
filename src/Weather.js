import React from "react";
import Modal from "react-bootstrap/Modal";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render = () => {
    if (this.props.show) {

      return (
        <Modal show={this.props.show} onHide={this.props.closeWeather} centered>
          <Modal.Body>
            {this.props.weatherData.map(item => {
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