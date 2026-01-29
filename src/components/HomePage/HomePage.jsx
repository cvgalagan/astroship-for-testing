import { useSelector, useDispatch } from 'react-redux'
import GridPage from '../GridPage/GridPage'
import ControlButtons from '../ControlButtons/ControlButtons'
import {
  addTimers,
  removeTimers,
  setNewTimersCount,
  toggleTimersEnabled,
  selectTimersCount,
  selectNewTimersCount,
  selectIsTimersEnabled
} from '../../store/timers/timersSlice'

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
      <ControlButtons
        addLabel={`Добавить ${newTimersCount} таймеров`}
        removeLabel={`Удалить ${newTimersCount} таймеров`}
        onAdd={handleAddTimers}
        onRemove={handleRemoveTimers}
        currentCount={timersCount}
        countLabel="Всего таймеров"
        showInput={true}
        inputValue={newTimersCount}
        onInputChange={handleNewTimersCountChange}
        inputLabel="Количество таймеров"
        showToggle={true}
        toggleLabel={isTimersEnabled ? "Выключить таймеры" : "Включить таймеры"}
        onToggle={handleToggleTimers}
      />
      <GridPage timersCount={timersCount} isTimersEnabled={isTimersEnabled} />
    </>
  )
}

export default HomePage
