import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App'; // Import the App component
import './App.css'; // Import the CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Import the store (TypeScript resolves .ts files automatically)


document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        throw new Error("Root element not found");
    }
    const root = ReactDOM.createRoot(rootElement); // Use createRoot with TypeScript
    root.render(
     <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
     </StrictMode>
    ); // Wrap App with Provider
});
