import React from 'react';
import Carousel from './components/Carousel';
import OverflowCheckBox from './components/OverflowCheckBox';
import Title from './components/Title';

function App() {
  return (
    <React.Fragment>
      <OverflowCheckBox/>
      <Title>Carousel Slider</Title>
      <Carousel/>
    </React.Fragment>
  );
}

export default App;

