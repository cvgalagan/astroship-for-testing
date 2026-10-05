import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import LabSection from './LabSection'

const baseTitle = 'Сценарии Вебвизора — WebVisor test';
const blinkChanges = 40;

function TitleScenario() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get('step') || 0);
  const counter = useRef(0);
  const blinkTimer = useRef(null);
  const svgTitleRef = useRef(null);

  // Объявлен первым, чтобы запомнить заголовок до смены и вернуть его при уходе со страницы, как в SPA.
  useEffect(() => {
    const previous = document.title;
    return () => {
      clearInterval(blinkTimer.current);
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    document.title = step ? `Сценарии — шаг ${step}` : baseTitle;
  }, [step]);

  const nextStep = () => setSearchParams({ step: String(step + 1) });

  const changeTitle = () => {
    counter.current += 1;
    document.title = `Сценарии — заголовок ${counter.current}`;
  };

  const repeatTitle = () => {
    const current = document.title;
    document.title = current;
  };

  const blinkTitle = () => {
    if (blinkTimer.current) {
      return;
    }
    let changes = 0;
    blinkTimer.current = setInterval(() => {
      changes += 1;
      document.title = changes % 2 ? '● Новое сообщение' : baseTitle;
      if (changes >= blinkChanges) {
        clearInterval(blinkTimer.current);
        blinkTimer.current = null;
      }
    }, 150);
  };

  const changeSvgTitle = () => {
    svgTitleRef.current.textContent = `Звезда, изменено в ${new Date().toLocaleTimeString()}`;
  };

  return (
    <LabSection
      id="lab-title"
      title="Сценарий: заголовки страницы"
      hint="Перейдите на эту страницу из меню и обратно. Нажмите «Следующий шаг» два раза, затем остальные кнопки по одному разу; дождитесь конца мигания."
    >
      <p className="lab-status" data-testid="lab-title-step">
        Текущий шаг: {step}
      </p>
      <div className="lab-row">
        <button type="button" className="lab-btn" onClick={nextStep}>
          Следующий шаг (URL без перезагрузки)
        </button>
        <button type="button" className="lab-btn" onClick={changeTitle}>
          Сменить заголовок
        </button>
        <button type="button" className="lab-btn" onClick={repeatTitle}>
          Записать тот же заголовок
        </button>
        <button type="button" className="lab-btn" onClick={blinkTitle}>
          Мигающий заголовок ({blinkChanges} смен)
        </button>
        <button type="button" className="lab-btn" onClick={changeSvgTitle}>
          Сменить title внутри SVG
        </button>
      </div>
      <svg className="lab-icon lab-icon--large" viewBox="0 0 24 24" role="img">
        <title ref={svgTitleRef}>Звезда</title>
        <path d="M12 2l3 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.4 21.7l1.8-7.3L1.5 9.5 9 8.9z" />
      </svg>
    </LabSection>
  );
}

export default TitleScenario;
