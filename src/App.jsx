import { useState } from 'react'
import './App.css'
import GridPage from './components/GridPage/GridPage'

function App() {
  const [timersCount, setTimersCount] = useState(100);

  const addTimers = () => {
    setTimersCount((prevCount) => prevCount + 50);
  };

  const removeTimers = () => {
    setTimersCount((prevCount) => Math.max(prevCount - 50, 0));
  };


  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={addTimers}>Добавить 50 таймеров</button>
        <button onClick={removeTimers}>Удалить 50 таймеров</button>
      </div>
      <GridPage timersCount={timersCount} />
    </>
  )
}

export default App
