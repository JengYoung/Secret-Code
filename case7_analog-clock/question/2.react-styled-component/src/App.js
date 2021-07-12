import GlobalStyles from './styles/global';
import Title from './components/Title';
import AnalogClock from './components/AnalogClock.js';
function App() {
  return (
    <>
      <GlobalStyles/>
      <Title>Analog clock</Title>
      <AnalogClock/>
    </>
  );
}

export default App;
