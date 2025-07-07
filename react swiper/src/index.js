import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import WebflowSwiper from "./WebflowSwiper";
import MetricsSection from "./MetricsSection";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MetricsSection/>
  </React.StrictMode>
);


// const container = document.getElementById('react-swiper');

// if (container) {
//   const root = ReactDOM.createRoot(container);
//   root.render(<WebflowSwiper />);
// }

const container = document.getElementById('MetricsSection');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<MetricsSection />);
}
