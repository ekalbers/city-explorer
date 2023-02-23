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
        this.getMovieData();
    }

    getMovieData() {
        let url = REACT_APP_SERVER + 'movies?city='
            + this.props.city;

        console.log(url);

        let promise = axios.get(url);
        promise
            .then((response) => {
                console.log(response.data)
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
        return (
            <Modal show={this.props.show} onHide={this.props.closeMovies} centered>
                <Modal.Body>
                    {
                        this.state.movieData.map(item => {
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


export default Weather;