import { useState } from 'react'
import LabSection from './LabSection'
import { cartIcon } from './labImages'

function HeartIcon() {
  return (
    <svg className="lab-icon" viewBox="0 0 24 24" aria-hidden="true">
      <title>Сердце</title>
      <path d="M12 21s-7-4.4-9.5-9C.8 8.6 3 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 4 0 6.2 4.1 4.5 7.5C19 16.6 12 21 12 21z" />
    </svg>
  );
}

function ControlsScenario() {
  const [lastAction, setLastAction] = useState('Ещё ничего не нажато');
  const [submitted, setSubmitted] = useState('');

  const report = (text) => () => setLastAction(text);

  return (
    <LabSection
      id="lab-controls"
      title="Сценарий: поля и клики"
      hint="Нажмите на иконку внутри кнопки, на кнопки без текста, на подпись «Способ доставки», выберите значение в списке, отправьте форму с полем вне формы."
    >
      <div className="lab-row">
        <button type="button" className="lab-btn" data-testid="lab-like" onClick={report('Нравится')}>
          <HeartIcon /> Нравится
        </button>
        <button type="button" className="lab-btn lab-btn--icon" onClick={report('Иконка корзины')}>
          <img src={cartIcon} alt="Корзина" width="20" height="20" />
        </button>
        <button type="button" className="lab-btn lab-btn--icon" onClick={report('Иконка без подписи')}>
          <HeartIcon />
        </button>
        <span className="lab-caption">В избранное</span>
      </div>

      <div className="lab-row">
        <button type="button" className="lab-btn" data-qa="lab-qa-button" onClick={report('data-qa')}>
          Кнопка с data-qa
        </button>
        <button type="button" className="lab-btn" data-cy="lab-cy-button" onClick={report('data-cy')}>
          Кнопка с data-cy
        </button>
        <button
          type="button"
          className="lab-btn css-1q2w3e4 Button_root__x7Ab9"
          data-test-id="lab-hashed-button"
          onClick={report('Хешированные классы')}
        >
          Кнопка с хешированными классами
        </button>
        <button type="button" className="lab-btn" disabled>
          Недоступная кнопка
        </button>
        <button type="button" className="lab-btn" aria-disabled="true" onClick={report('aria-disabled')}>
          Кнопка с aria-disabled
        </button>
      </div>

      <div className="lab-row">
        <a href="#lab-controls" className="lab-link" onClick={report('Ссылка с href')}>
          Ссылка с href
        </a>
        <a className="lab-link" onClick={report('Ссылка без href')}>
          Ссылка без href
        </a>
      </div>

      <div className="form-group">
        <label htmlFor="lab-delivery">Способ доставки</label>
        <p className="lab-caption">Подпись связана с полем через for и стоит отдельно от него.</p>
        <select id="lab-delivery" name="delivery" defaultValue="">
          <option value="">Не выбран</option>
          <option value="courier">Курьер</option>
          <option value="pickup">Самовывоз</option>
          <option value="post">Почта</option>
        </select>
      </div>

      <div className="form-group">
        <span id="lab-quantity-label" className="lab-label">Количество (подпись через aria-labelledby)</span>
        <input type="number" name="quantity" min="1" max="10" defaultValue="1" aria-labelledby="lab-quantity-label" />
      </div>

      <form
        id="lab-outer-form"
        className="demo-form"
        data-testid="lab-outer-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(`Отправлена форма с полем вне формы: ${new Date().toLocaleTimeString()}`);
        }}
      >
        <div className="form-group">
          <label htmlFor="lab-order-comment">Комментарий к заказу</label>
          <input type="text" id="lab-order-comment" name="orderComment" />
        </div>
        <button type="submit" className="lab-btn">Отправить форму</button>
      </form>
      <div className="form-group lab-outside-field">
        <label htmlFor="lab-coupon">Купон — поле вне формы, привязано атрибутом form</label>
        <input type="text" id="lab-coupon" name="coupon" form="lab-outer-form" />
      </div>
      {submitted && <p className="lab-status">{submitted}</p>}

      <p className="lab-status" data-testid="lab-controls-status">
        Последнее действие: {lastAction}
      </p>
    </LabSection>
  );
}

export default ControlsScenario;
