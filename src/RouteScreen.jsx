import PropTypes from 'prop-types';

const RouteScreen = ({ startLocation, stopLocation, totalKms, totalDuration }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Route Details</h1>
            <div style={styles.details}>
                <p><strong>Start:</strong> {startLocation.lat}, {startLocation.lng}</p>
                <p><strong>Stop:</strong> {stopLocation.lat}, {stopLocation.lng}</p>
                <p><strong>Total Distance:</strong> {totalKms.toFixed(2)} KMs</p>
                <p><strong>Total Duration:</strong> {totalDuration} mins</p>
            </div>
            <iframe
                width="100%"
                height="300"
                src={`https://www.google.com/maps/dir/${startLocation.lat},${startLocation.lng}/${stopLocation.lat},${stopLocation.lng}/`}
                title="Route"
                allowFullScreen
            ></iframe>
        </div>
    );
};

RouteScreen.propTypes = {
    startLocation: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }).isRequired,
    stopLocation: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }).isRequired,
    totalKms: PropTypes.number.isRequired,
    totalDuration: PropTypes.number.isRequired,
};

const styles = {
    container: { padding: '20px' },
    title: { color: 'orange', textAlign: 'center', marginBottom: '20px' },
    details: { marginBottom: '20px', textAlign: 'center' },
};

export default RouteScreen;

