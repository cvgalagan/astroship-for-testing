import { useState } from 'react'
import LabSection from './LabSection'
import { cartIcon } from './labImages'

function PrivacyScenario() {
  const [result, setResult] = useState('');

  return (
    <LabSection
      id="lab-privacy"
      title="Сценарий: приватность"
      hint="Нажмите кнопки в скрытом и показанном блоках, заполните все поля (в «Заметку» впишите e-mail), отправьте форму."
    >
      <div className="ym-hide-content lab-hidden-block" data-testid="lab-hidden-block">
        <p>Скрытый текст: Иван Петров, +7 900 123-45-67, ivan.petrov@example.com</p>
        <img src={cartIcon} alt="Фото Ивана Петрова" title="Иван Петров" width="32" height="32" />
        <button
          type="button"
          className="lab-btn"
          aria-label="Позвонить Ивану Петрову"
          title="Позвонить Ивану Петрову"
          data-user="ivan.petrov"
        >
          Позвонить
        </button>
        <input type="text" name="hiddenNote" placeholder="Иван Петров" aria-label="Поле в скрытом блоке" />
        <div className="ym-show-content lab-shown-block" data-testid="lab-shown-block">
          <p>Этот текст показывается: блок ym-show-content внутри ym-hide-content.</p>
          <button type="button" className="lab-btn">
            Кнопка в показанном блоке
          </button>
        </div>
      </div>

      <form
        className="demo-form"
        data-testid="lab-privacy-form"
        onSubmit={(event) => {
          event.preventDefault();
          setResult(`Форма приватности отправлена: ${new Date().toLocaleTimeString()}`);
        }}
      >
        <div className="form-group">
          <label htmlFor="lab-first-name">Имя — маскируется по name</label>
          <input type="text" id="lab-first-name" name="first_name" />
        </div>
        <div className="form-group">
          <label htmlFor="lab-mail">E-mail — маскируется по type</label>
          <input type="email" id="lab-mail" name="mail" />
        </div>
        <div className="form-group">
          <label htmlFor="lab-secret">Пароль</label>
          <input type="password" id="lab-secret" name="secret" />
        </div>
        <div className="form-group">
          <label htmlFor="lab-note">Заметка — не маскируется, впишите сюда e-mail</label>
          <input type="text" id="lab-note" name="note" />
        </div>
        <div className="form-group">
          <label htmlFor="lab-promo">Промокод — ym-record-keys</label>
          <input type="text" id="lab-promo" name="promo" className="ym-record-keys" />
        </div>
        <button type="submit" className="lab-btn">Отправить</button>
      </form>
      {result && <p className="lab-status">{result}</p>}
    </LabSection>
  );
}

export default PrivacyScenario;
