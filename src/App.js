import usePosition from './components/usePosition';

function App() {
  const { latitude, longitude, error } = usePosition();
  return (
    <div>
      <code>
        latitude: {latitude}<br />
        longitude: {longitude}<br />
        error: {error}
      </code>

    </div>
  );
}

export default App;
