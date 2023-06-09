import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (window.location.pathname === '/') {
    window.location.pathname = '/signin';
  }
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
