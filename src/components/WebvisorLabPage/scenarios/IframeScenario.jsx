import { useState } from 'react'
import LabSection from './LabSection'

const srcdocDocument = (version) => `<!doctype html>
<html lang="ru">
  <body style="font-family: sans-serif; margin: 12px">
    <p>Документ srcdoc, версия ${version}</p>
    <button type="button">Кнопка в srcdoc ${version}</button>
    <input type="text" name="srcdocNote" aria-label="Поле в srcdoc" />
  </body>
</html>`;

function IframeScenario() {
  const [frameDocument, setFrameDocument] = useState('a');
  const [reloads, setReloads] = useState(0);
  const [srcdocVersion, setSrcdocVersion] = useState(1);
  const [dynamicFrame, setDynamicFrame] = useState(false);

  const src = `/frames/${frameDocument}.html${reloads ? `?reload=${reloads}` : ''}`;

  return (
    <LabSection
      id="lab-iframe"
      title="Сценарий: iframe"
      hint="В каждом фрейме нажмите кнопку и введите текст в поле. Смените документ первого фрейма кнопкой, затем перейдите по ссылке внутри него. Смените srcdoc, добавьте и уберите динамический фрейм."
    >
      <h3>Фрейм того же источника: смена документа через src</h3>
      <div className="lab-row">
        <button
          type="button"
          className="lab-btn"
          onClick={() => setFrameDocument((current) => (current === 'a' ? 'b' : 'a'))}
        >
          Открыть документ {frameDocument === 'a' ? 'B' : 'A'} (смена src)
        </button>
        <button type="button" className="lab-btn" onClick={() => setReloads((count) => count + 1)}>
          Перезагрузить документ (новый параметр в src)
        </button>
      </div>
      <iframe className="lab-frame" src={src} title="Фрейм с документами A и B" data-testid="lab-frame-main" />

      <h3>Фрейм с srcdoc</h3>
      <div className="lab-row">
        <button type="button" className="lab-btn" onClick={() => setSrcdocVersion((version) => version + 1)}>
          Сменить srcdoc (src не меняется)
        </button>
      </div>
      <iframe
        className="lab-frame lab-frame--small"
        srcDoc={srcdocDocument(srcdocVersion)}
        title="Фрейм с srcdoc"
        data-testid="lab-frame-srcdoc"
      />

      <h3>Вложенный фрейм</h3>
      <iframe
        className="lab-frame lab-frame--tall"
        src="/frames/nested.html"
        title="Фрейм с вложенным фреймом"
        data-testid="lab-frame-nested"
      />

      <h3>Фрейм в sandbox без allow-same-origin — рекордер его не пишет</h3>
      <iframe
        className="lab-frame lab-frame--small"
        src="/frames/a.html"
        sandbox="allow-scripts"
        title="Фрейм в sandbox"
        data-testid="lab-frame-sandbox"
      />

      <h3>Фрейм, добавленный после загрузки страницы</h3>
      <div className="lab-row">
        <button type="button" className="lab-btn" onClick={() => setDynamicFrame((shown) => !shown)}>
          {dynamicFrame ? 'Убрать фрейм' : 'Добавить фрейм'}
        </button>
      </div>
      {dynamicFrame && (
        <iframe
          className="lab-frame lab-frame--small"
          src="/frames/b.html"
          title="Динамический фрейм"
          data-testid="lab-frame-dynamic"
        />
      )}
    </LabSection>
  );
}

export default IframeScenario;
