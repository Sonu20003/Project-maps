import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const dummyLocations = [
    { id: 1, name: 'Alice', lat: 40.7128, lng: -74.0060 }, // New York
    { id: 2, name: 'Bob', lat: 34.0522, lng: -118.2437 }, // Los Angeles
    { id: 3, name: 'Charlie', lat: 51.5074, lng: -0.1278 }, // London
];

const LocationScreen = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({
        lat: 39.8283, // Center of the U.S.
        lng: -98.5795
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const handleMarkerClick = (person) => {
        const distance = calculateDistance(currentLocation.lat, currentLocation.lng, person.lat, person.lng);
        const time = (distance / 60).toFixed(2); // Assuming an average speed of 60 km/h
        setSelectedPerson({ ...person, distance, time });
    };

    return (
        <LoadScript googleMapsApiKey="add your api key to see the project run with maps!!!!">#add key here
            <GoogleMap
                mapContainerStyle={{ height: "500px", width: "100%" }}
                center={currentLocation}
                zoom={4}
            >
                {dummyLocations.map((person) => (
                    <Marker
                        key={person.id}
                        position={{ lat: person.lat, lng: person.lng }}
                        onClick={() => handleMarkerClick(person)}
                    />
                ))}

                {selectedPerson && (
                    <InfoWindow
                        position={{ lat: selectedPerson.lat, lng: selectedPerson.lng }}
                        onCloseClick={() => setSelectedPerson(null)}
                    >
                        <div>
                            <h2>{selectedPerson.name}</h2>
                            <p>Distance: {selectedPerson.distance.toFixed(2)} km</p>
                            <p>Time: {selectedPerson.time} mins</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default LocationScreen;
