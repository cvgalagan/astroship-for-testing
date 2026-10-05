import { useState } from 'react'
import LabSection from './LabSection'

function WidgetsScenario() {
  const [rating, setRating] = useState(0);
  const [lastAction, setLastAction] = useState('Ещё ничего не нажато');

  const report = (text) => () => setLastAction(text);

  return (
    <LabSection
      id="lab-widgets"
      title="Сценарий: нестандартные элементы"
      hint="Нажмите каждый элемент, поставьте оценку звёздами, введите текст в редактируемый блок."
    >
      <div className="lab-row">
        <div role="button" tabIndex={0} className="lab-tile" onClick={report('div с role=button')}>
          div с role=button
        </div>
        <div tabIndex={0} className="lab-tile" onClick={report('div с tabindex без роли')}>
          div с tabindex без роли
        </div>
        <span className="lab-tile lab-tile--pointer" onClick={report('span с cursor: pointer')}>
          span с cursor: pointer
        </span>
        <div className="card lab-tile" onClick={report('div с классом card')}>
          div с классом card
        </div>
      </div>

      <div className="lab-row">
        <lab-rating class="lab-rating" data-testid="lab-rating" value={rating}>
          {[1, 2, 3, 4, 5].map((value) => (
            <span key={value} className="lab-rating__star" onClick={() => setRating(value)}>
              {value <= rating ? '★' : '☆'}
            </span>
          ))}
        </lab-rating>
        <span className="lab-caption">Пользовательский элемент lab-rating: оценка {rating}</span>
      </div>

      <div
        className="lab-editable"
        contentEditable
        suppressContentEditableWarning
        data-testid="lab-editable"
        onInput={report('Ввод в contenteditable')}
      >
        Редактируемый блок: допишите сюда пару слов.
      </div>

      <p className="lab-status" data-testid="lab-widgets-status">
        Последнее действие: {lastAction}
      </p>
    </LabSection>
  );
}

export default WidgetsScenario;
