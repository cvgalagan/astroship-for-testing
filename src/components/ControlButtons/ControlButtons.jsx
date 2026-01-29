import './ControlButtons.css'

function ControlButtons({
  addLabel,
  removeLabel,
  onAdd,
  onRemove,
  currentCount,
  countLabel = 'Количество',
  showInput = false,
  inputValue,
  onInputChange,
  inputLabel,
  showToggle = false,
  toggleLabel,
  onToggle
}) {
  return (
    <div className="control-buttons">
      {showInput && (
        <div className="control-input-wrapper">
          <label className="control-label">
            {inputLabel}:
            <input
              type="number"
              value={inputValue}
              onChange={(e) => onInputChange(Number(e.target.value))}
              className="control-input"
              min="0"
            />
          </label>
        </div>
      )}
      <button onClick={onAdd} className="control-btn control-btn-add">
        {addLabel}
      </button>
      <button onClick={onRemove} className="control-btn control-btn-remove">
        {removeLabel}
      </button>
      {showToggle && (
        <button onClick={onToggle} className="control-btn control-btn-toggle">
          {toggleLabel}
        </button>
      )}
      <span className="control-count-label">
        {countLabel}: {currentCount}
      </span>
    </div>
  )
}

export default ControlButtons
