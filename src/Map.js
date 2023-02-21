import React from "react";
import Modal from "react-bootstrap/Modal";

class Map extends React.Component {

    render() {

        let urlMap = 'https://maps.locationiq.com/v3/staticmap'
            + '?key='
            + this.props.locationKey
            + '&center='
            + this.props.cityObj.lat
            + ','
            + this.props.cityObj.long
            + '&zoom=12';

        console.log(urlMap);
        console.log(this.props);

        return (
            <Modal show={this.props.show} onHide={this.props.closeModal} centered>
                <Modal.Header>
                    <Modal.Title>{this.props.cityObj.display_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Latitude: {this.props.cityObj.lat}</p>
                    <p>Longitude: {this.props.cityObj.lon}</p>
                </Modal.Body>
                <img
                    src={this.props.show ? this.props.getMap() : 'none'}
                    alt={this.props.cityObj.display_name}
                    title={this.props.cityObj.display_name} />
            </Modal>
        );
    }
}

export default Map;