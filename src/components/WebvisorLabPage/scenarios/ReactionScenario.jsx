import { useEffect, useRef, useState } from 'react'
import LabSection from './LabSection'

function ReactionScenario() {
  const instantRef = useRef(null);
  const farRef = useRef(null);
  const timers = useRef([]);
  const [delayed, setDelayed] = useState('');
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginResult, setLoginResult] = useState('');

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Меняет DOM напрямую в обработчике клика, чтобы мутация попала в ту же миллисекунду, что и клик.
  const handleInstant = () => {
    const node = instantRef.current;
    const count = Number(node.dataset.count || 0) + 1;
    node.dataset.count = String(count);
    node.textContent = `Мутация в обработчике клика: ${count}`;
  };

  const handleDelayed = () => {
    timers.current.push(
      setTimeout(() => setDelayed(`Ответ через 1,5 с: ${new Date().toLocaleTimeString()}`), 1500)
    );
  };

  const handleFar = () => {
    farRef.current.textContent = `Изменено кнопкой «Изменить блок вверху»: ${new Date().toLocaleTimeString()}`;
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (login.trim()) {
      setLoginError('');
      setLoginResult('Логин принят');
    } else {
      setLoginError('Заполните логин');
      setLoginResult('');
    }
  };

  return (
    <LabSection
      id="lab-reaction"
      title="Сценарий: реакция страницы"
      hint="Нажмите каждую кнопку по одному разу с паузой 2–3 секунды. Отправьте форму входа сначала пустой, потом с логином."
    >
      <p className="lab-status lab-far-target" ref={farRef} data-testid="lab-far-target">
        Блок вверху сценария: его меняет кнопка снизу.
      </p>

      <div className="lab-row">
        <button type="button" className="lab-btn" onClick={handleInstant}>
          Мгновенная реакция
        </button>
        <span ref={instantRef} className="lab-caption" data-testid="lab-instant-target">
          Ещё не нажато
        </span>
      </div>

      <div className="lab-row">
        <button type="button" className="lab-btn" onClick={handleDelayed}>
          Реакция через 1,5 с
        </button>
        <span className="lab-caption" data-testid="lab-delayed-target">
          {delayed || 'Ответа ещё нет'}
        </span>
      </div>

      <div className="lab-row">
        <button type="button" className="lab-btn" onClick={() => {}}>
          Кнопка без реакции
        </button>
        <div className="lab-nested">
          <div>
            <button type="button" className="lab-btn" onClick={handleFar}>
              Изменить блок вверху
            </button>
          </div>
        </div>
      </div>

      <form className="demo-form" noValidate onSubmit={handleLoginSubmit} data-testid="lab-login-form">
        <div className="form-group">
          <label htmlFor="lab-login">Логин</label>
          <input
            type="text"
            id="lab-login"
            name="login"
            value={login}
            aria-invalid={Boolean(loginError)}
            onChange={(event) => setLogin(event.target.value)}
          />
          {loginError && <span className="lab-error">{loginError}</span>}
        </div>
        <button type="submit" className="lab-btn">Войти</button>
      </form>
      {loginResult && <p className="lab-status">{loginResult}</p>}
    </LabSection>
  );
}

export default ReactionScenario;
