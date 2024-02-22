import { useEffect } from 'react';
import './App.css';
import UCounterPage from './pages/undoable-counter';

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <UCounterPage />
    </>
  );
}

export default App;
