import React from "react";
import Card from "react-bootstrap/Card";

class Map extends React.Component {

    render() {

        let urlMap = 'https://maps.locationiq.com/v3/staticmap'
            + '?key='
            + this.props.locationKey
            + '&center='
            + this.props.lat
            + ','
            + this.props.long
            + '&zoom=12';

        return (
            <Card.Img
                variant="top"
                src={urlMap}
                title={this.props.title} />
        );
    }
}

export default Map;