import { useState } from 'react'
import './WindowPage.css'

function WindowPage() {
  // Состояние формы
  const [formData, setFormData] = useState({
    url: '',
    message: ''
  });

  // Состояние результата операции
  const [result, setResult] = useState('');

  // Обработчик изменения полей ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Валидация URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Основная функция открытия окна и отправки сообщения
  const handleOpenWindow = () => {
    // Валидация URL
    if (!formData.url.trim()) {
      setResult('Ошибка: Необходимо указать URL страницы');
      return;
    }

    if (!isValidUrl(formData.url)) {
      setResult('Ошибка: Введите корректный URL (например: https://example.com)');
      return;
    }

    try {
      // Открываем новое окно с параметрами
      const windowFeatures = 'width=800,height=600,scrollbars=yes,resizable=yes';
      const newWindow = window.open(formData.url, '_blank', windowFeatures);

      if (!newWindow) {
        setResult('Ошибка: Не удалось открыть окно. Возможно, браузер блокирует всплывающие окна. Разрешите всплывающие окна для этого сайта.');
        return;
      }

      // Функция отправки сообщения
      const sendMessage = () => {
        try {
          if (formData.message.trim()) {
            newWindow.postMessage(formData.message, '*');
            setResult(`✅ Успешно выполнено!\n\nОткрыто окно: ${formData.url}\nОтправлено сообщение: "${formData.message}"\n\nСообщение отправлено через postMessage API.`);
          } else {
            setResult(`✅ Окно успешно открыто!\n\nURL: ${formData.url}\n\nСообщение не отправлено (поле пустое).`);
          }
        } catch (error) {
          setResult(`⚠️ Окно открыто, но не удалось отправить сообщение.\n\nОшибка: ${error.message}\n\nВозможно, целевая страница не поддерживает postMessage или имеет ограничения безопасности.`);
        }
      };

      // Отправляем сообщение через небольшую задержку для загрузки страницы
      setTimeout(sendMessage, 1500);

      // Показываем промежуточный результат
      setResult('🔄 Открываем окно и готовимся отправить сообщение...');

    } catch (error) {
      setResult(`❌ Ошибка при открытии окна: ${error.message}`);
    }
  };

  // Очистка формы
  const handleClearForm = () => {
    setFormData({
      url: '',
      message: ''
    });
    setResult('');
  };

  return (
    <div className="window-page">
      <h1>Работа с окном</h1>
      <p className="page-description">
        Эта страница позволяет открыть новое окно браузера по указанному URL и отправить сообщение через postMessage API.
      </p>

      <section className="form-section">
        <h2>Параметры окна</h2>

        <div className="demo-form">
          <div className="form-group">
            <label htmlFor="url">URL страницы *</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              required
            />
            <small className="form-hint">
              Введите полный URL страницы, которую нужно открыть (включая http:// или https://)
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="message">Сообщение для отправки</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              placeholder="Введите сообщение, которое будет отправлено в открытое окно через postMessage..."
            />
            <small className="form-hint">
              Это сообщение будет отправлено через postMessage API в открытое окно (необязательно)
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleOpenWindow}
              className="submit-btn"
              disabled={!formData.url.trim()}
            >
              Открыть окно и отправить сообщение
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="clear-btn"
            >
              Очистить форму
            </button>
          </div>
        </div>

        {result && (
          <div className="result-message">
            <h3>Результат:</h3>
            <pre>{result}</pre>
          </div>
        )}
      </section>

      <section className="info-section">
        <h2>Как это работает</h2>
        <div className="info-content">
          <div className="info-block">
            <h3>Пошаговый процесс:</h3>
            <ol>
              <li>Введите URL страницы, которую хотите открыть</li>
              <li>Опционально введите сообщение для отправки</li>
              <li>Нажмите кнопку &quot;Открыть окно и отправить сообщение&quot;</li>
              <li>Новое окно откроется с указанной страницей</li>
              <li>Через 1.5 секунды будет отправлено сообщение через postMessage</li>
            </ol>
          </div>

          <div className="info-block">
            <h3>Важные замечания:</h3>
            <ul>
              <li>Браузер может блокировать всплывающие окна - разрешите их для этого сайта</li>
              <li>PostMessage работает только с страницами, настроенными на прием сообщений</li>
              <li>Сообщения отправляются с targetOrigin &apos;*&apos; (любой источник)</li>
              <li>Новое окно открывается размером 800x600 пикселей</li>
            </ul>
          </div>

          <div className="info-block">
            <h3>Примеры URL для тестирования:</h3>
            <ul>
              <li><code>https://example.com</code> - простая тестовая страница</li>
              <li><code>https://developer.mozilla.org/</code> - документация MDN</li>
              <li><code>data:text/html,&lt;script&gt;window.addEventListener(&apos;message&apos;, e =&gt; alert(&apos;Получено сообщение: &apos; + e.data))&lt;/script&gt;&lt;h1&gt;Тест postMessage&lt;/h1&gt;&lt;p&gt;Эта страница покажет alert при получении сообщения&lt;/p&gt;</code> - тестовая страница с обработчиком postMessage</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WindowPage;
