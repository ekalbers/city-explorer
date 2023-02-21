import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Map from './Map';

const locationKey = process.env.REACT_APP_LOCATION_KEY;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            cityObj: {},
            map: "",
            show: false
        };
    }

    requestCity() {

        let urlLocation = 'https://us1.locationiq.com/v1/search?key='
            + locationKey + '&q='
            + this.state.city
            + '&format=json';
        let promise = axios.get(urlLocation);
        promise
            .then(response => {
                this.setState({ cityObj: response.data[0] });
            })
            .catch(error => {
                console.log('ERROR');
                console.error(error);
            })
    }

    render() {
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
                    <Card style={{ width: "40%", marginRight: "30%", marginLeft: "30%" }}>
                        <Card.Title>{this.state.cityObj.display_name}</Card.Title>
                        <Card.Body>
                            <p>Latitude: {this.state.cityObj.lat}</p>
                            <p>Longitude: {this.state.cityObj.lon}</p>
                        </Card.Body>
                        <Map
                            locationKey={locationKey}
                            lat={this.state.cityObj.lat}
                            long={this.state.cityObj.lon}
                            title={this.state.cityObj.display_name} />
                    </Card>
                </div>
            </main>
        );
    }
}

export default Main;