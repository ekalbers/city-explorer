import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

class Weather extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            movieData: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        let url = REACT_APP_SERVER + 'movies?city='
            + this.props.city;

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
    }

    render = () => {
        if (this.props.show) {

            return (
                <Modal show={this.props.show} onHide={this.props.closeMovies} centered>
                    <Modal.Body>
                        {this.state.movieData.map(item => {
                            return (
                                <div key={item.key}>
                                    <h2>{item.title}</h2>
                                    <p>{item.overview}</p><hr></hr>
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