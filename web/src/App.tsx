import React from 'react';

import './styles/global.css';
import 'leaflet/dist/leaflet.css'

import Routes from './routes'

interface TitleProps {
  text: string;
}

function App() {
  return (
    <Routes />
  );
}

export default App;
