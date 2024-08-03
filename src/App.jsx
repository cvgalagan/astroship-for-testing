import { useState } from 'react'
import './App.css'
import GridPage from './components/GridPage/GridPage'

function App() {
  const [timersCount, setTimersCount] = useState(100);
  const [newTimersCount, setNewTimersCount] = useState(50); // Состояние для ввода количества новых таймеров

  const addTimers = () => {
    setTimersCount((prevCount) => prevCount + newTimersCount);
  };

  const removeTimers = () => {
    setTimersCount((prevCount) => Math.max(prevCount - newTimersCount, 0));
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
      <label>
          Количество таймеров:
          <input 
            type="number" 
            value={newTimersCount} 
            onChange={(e) => setNewTimersCount(Number(e.target.value))} 
            style={{ marginLeft: '10px', marginRight: '10px' }}
          />
        </label>

        <button onClick={addTimers}>Добавить {newTimersCount} таймеров</button>
        <button onClick={removeTimers}>Удалить {newTimersCount} таймеров</button>
      </div>
      <GridPage timersCount={timersCount} />
    </>
  )
}

export default App
