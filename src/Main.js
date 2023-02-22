import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Map from './Map';
import Cities from './Cities';

console.clear();

const REACT_APP_LOCATION_KEY = process.env.REACT_APP_LOCATION_KEY;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            cityObj: [],
            index: 0,
            show: false,
            showMap: false
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
                this.setState({ cityObj: response.data, show: true });
                console.log(response.data);
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

    updateIndex = (index) => {
        this.setState({ index: index });
        console.log('updateIndex');
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
                        <Cities
                            cityObj={this.state.cityObj}
                            show={this.state.show}
                            updateIndex={this.updateIndex}
                            showModal={this.showMap} />
                        <Map
                            locationKey={REACT_APP_LOCATION_KEY}
                            cityObj={this.state.cityObj[this.state.index]}
                            getMap={this.mapUrl}
                            show={this.state.showMap}
                            closeModal={this.closeModal} />
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;