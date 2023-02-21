import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Map from './Map';

const REACT_APP_LOCATION_KEY = process.env.REACT_APP_LOCATION_KEY;

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

        let urlLocation = 'https://us1.locationiq.com/v1/search?key='
            + REACT_APP_LOCATION_KEY + '&q='
            + this.state.city
            + '&format=json';
        let promise = axios.get(urlLocation);
        promise
            .then(response => {
                this.setState({ cityObj: response.data[0], show: true });
            })
            .catch(error => {
                console.log('ERROR');
                console.error(error);
            })
    }

    mapUrl = () => {
        let mapUrl = 'https://maps.locationiq.com/v3/staticmap'
            + '?key='
            + REACT_APP_LOCATION_KEY
            + '&center='
            + this.state.cityObj.lat
            + ','
            + this.state.cityObj.lon
            + '&zoom=12';
        console.log(mapUrl);
        return mapUrl;
    }

    showModal = () => {
        this.setState({ show: true });
    }

    closeModal = () => {
        this.setState({ show: false });
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
                    <div id="mapCard">
                        <Map
                            locationKey={REACT_APP_LOCATION_KEY}
                            cityObj={this.state.cityObj}
                            getMap={this.mapUrl}
                            show={this.state.show}
                            closeModal={this.closeModal} />
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;