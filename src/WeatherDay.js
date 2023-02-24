function WeatherDay(props) {
    return (
        <div key={props.date}>
            <p>Date: {props.date}</p>
            <p>Description: {props.description}</p><br></br>
        </div>
    );
}

export default WeatherDay;