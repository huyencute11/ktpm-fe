import { routes } from './routes';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={`route-${route.path}-i-${index}`}
                            path={route.path}
                            Component={route.component}
                            // element={route.component}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
