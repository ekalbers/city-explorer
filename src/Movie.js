function Movie(props) {
    return (
        <div key={props.keys}>
            <h2>{props.title}</h2>
            <p>{props.overview}</p><hr></hr>
        </div>
    );
}

export default Movie;