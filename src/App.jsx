import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationScreen from './LocationScreen';
import RouteScreen from './RouteScreen';

function App() {
    console.log('App is rendering');

    return (
        <Router>
            <h2>Attendance Screen:</h2>
            <Routes>
                <Route path="/location/:member" element={<LocationScreen />} />
                <Route
                    path="/"
                    element={
                        <RouteScreen
                            startLocation={{ lat: 40.7128, lng: -74.0060 }}
                            stopLocation={{ lat: 34.0522, lng: -118.2437 }}
                            totalKms={4500}
                            totalDuration={300}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;


