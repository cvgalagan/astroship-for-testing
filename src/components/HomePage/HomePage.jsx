import { useSelector, useDispatch } from 'react-redux'
import GridPage from '../GridPage/GridPage'
import {
  addTimers,
  removeTimers,
  setNewTimersCount,
  toggleTimersEnabled,
  selectTimersCount,
  selectNewTimersCount,
  selectIsTimersEnabled
} from '../../store/timers/timersSlice'
import './HomePage.css'

function HomePage() {
  const dispatch = useDispatch()
  const timersCount = useSelector(selectTimersCount)
  const newTimersCount = useSelector(selectNewTimersCount)
  const isTimersEnabled = useSelector(selectIsTimersEnabled)

  const handleAddTimers = () => {
    dispatch(addTimers())
  }

  const handleRemoveTimers = () => {
    dispatch(removeTimers())
  }

  const handleNewTimersCountChange = (value) => {
    dispatch(setNewTimersCount(value))
  }

  const handleToggleTimers = () => {
    dispatch(toggleTimersEnabled())
  }

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <div className="button-group">
          <div>
            <label>
              Количество таймеров:
              <input
                type="number"
                value={newTimersCount}
                onChange={(e) => handleNewTimersCountChange(Number(e.target.value))}
                style={{ marginLeft: '10px', marginRight: '10px' }}
              />
            </label>
          </div>
          <button onClick={handleAddTimers}>Добавить {newTimersCount} таймеров</button>
          <button onClick={handleRemoveTimers}>Удалить {newTimersCount} таймеров</button>
          <button onClick={handleToggleTimers}>{isTimersEnabled ? "Выключить таймеры" : "Включить таймеры"}</button>
        </div>
        </div>
      <GridPage timersCount={timersCount} isTimersEnabled={isTimersEnabled} />
    </>
  )
}

export default HomePage
