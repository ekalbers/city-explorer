import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const locationKey = process.env.REACT_APP_LOCATION_KEY;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            cityObj: {},
            show: false
        };
    }

    requestCity() {

        let url = 'https://us1.locationiq.com/v1/search?key=' + locationKey + '&q=' + this.state.city + '&format=json'
        console.log(url);
        let promise = axios.get(url);

        promise
            .then(response => {
                this.setState({ cityObj: response.data[0] });
                console.log(response.data[0]);
                console.log(this.state);
            })
            .catch(error => {
                console.log('ERROR');
                console.error(error);
            })
    }

    render() {
        console.log(this.state.city);
        return (
            <main style={{ margin: "5%" }}>
                <h2>Find a city!</h2>
                <div>
                    <Form style={{ width: "24%", marginRight: "38%", marginLeft: "38%" }}>
                        <Form.Label>Type in a City:</Form.Label>
                        <Form.Control
                            type="text"
                            id="city"
                            value={this.state.city}
                            onChange={x => this.setState({ city: x.target.value })} />
                        <Button onClick={x => this.requestCity()} style={{ margin: "3%" }}>Explore!</Button>
                    </Form>
                    <Card style={{ width: "24%", marginRight: "38%", marginLeft: "38%" }}>
                        <Card.Title>{this.state.cityObj.display_name}</Card.Title>
                        <Card.Body>
                            <p>Latitude: {this.state.cityObj.lat}</p>
                            <p>Longitude: {this.state.cityObj.lon}</p>
                        </Card.Body>
                    </Card>
                </div>
            </main>
        );
    }
}

export default Main;

//GET https://us1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json