import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Movie from "./Movie";

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

class Movies extends React.Component {
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
        // console.log(this.state.movieData[0].title);
        return (
            <Modal show={this.props.show} onHide={this.props.closeMovies} centered>
                <Modal.Body>
                    {
                        this.state.movieData.map(item => {
                            return (
                                <Movie key={item.key} title={item.Title} overview={item.Overview} />
                            );
                        })
                    }
                </Modal.Body>
            </Modal>
        );
    }
}


export default Movies;