import { useState } from 'react'
import './FormsPage.css'

function FormsPage() {
  // Состояние для формы регистрации
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    gender: '',
    agreement: false,
    comments: ''
  });

  // Состояние для формы обратной связи
  const [feedbackForm, setFeedbackForm] = useState({
    subject: '',
    category: '',
    message: '',
    file: null,
    notifications: false
  });

  // Состояние для формы настроек
  const [settingsForm, setSettingsForm] = useState({
    volume: 50,
    colorScheme: '#3498db',
    birthDate: '',
    preferredTime: '',
    interests: []
  });

  // Состояния для отображения результатов
  const [submissionResults, setSubmissionResults] = useState({
    registration: '',
    feedback: '',
    settings: ''
  });

  // Обработчики для формы регистрации
  const handleRegistrationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setSubmissionResults(prev => ({
      ...prev,
      registration: `Форма регистрации отправлена! Данные: ${JSON.stringify(registrationForm, null, 2)}`
    }));
    // Сброс формы
    setRegistrationForm({
      name: '',
      email: '',
      password: '',
      phone: '',
      country: '',
      gender: '',
      agreement: false,
      comments: ''
    });
  };

  // Обработчики для формы обратной связи
  const handleFeedbackChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setSubmissionResults(prev => ({
      ...prev,
      feedback: `Форма обратной связи отправлена! Данные: ${JSON.stringify({
        ...feedbackForm,
        file: feedbackForm.file ? feedbackForm.file.name : null
      }, null, 2)}`
    }));
    // Сброс формы
    setFeedbackForm({
      subject: '',
      category: '',
      message: '',
      file: null,
      notifications: false
    });
  };

  // Обработчики для формы настроек
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'interests') {
      const currentInterests = [...settingsForm.interests];
      if (checked) {
        currentInterests.push(value);
      } else {
        const index = currentInterests.indexOf(value);
        if (index > -1) {
          currentInterests.splice(index, 1);
        }
      }
      setSettingsForm(prev => ({
        ...prev,
        interests: currentInterests
      }));
    } else {
      setSettingsForm(prev => ({
        ...prev,
        [name]: type === 'range' ? parseInt(value) : value
      }));
    }
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setSubmissionResults(prev => ({
      ...prev,
      settings: `Форма настроек отправлена! Данные: ${JSON.stringify(settingsForm, null, 2)}`
    }));
  };

  return (
    <div className="forms-page">
      <h1>Демонстрационные формы</h1>
      
      {/* Форма регистрации */}
      <section className="form-section">
        <h2>Форма регистрации пользователя</h2>
        <form onSubmit={handleRegistrationSubmit} className="demo-form">
          <div className="form-group">
            <label htmlFor="name">Имя *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={registrationForm.name}
              onChange={handleRegistrationChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={registrationForm.email}
              onChange={handleRegistrationChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={registrationForm.password}
              onChange={handleRegistrationChange}
              minLength="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={registrationForm.phone}
              onChange={handleRegistrationChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Страна</label>
            <select
              id="country"
              name="country"
              value={registrationForm.country}
              onChange={handleRegistrationChange}
            >
              <option value="">Выберите страну</option>
              <option value="russia">Россия</option>
              <option value="usa">США</option>
              <option value="germany">Германия</option>
              <option value="france">Франция</option>
              <option value="other">Другая</option>
            </select>
          </div>

          <div className="form-group">
            <label>Пол</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={registrationForm.gender === 'male'}
                  onChange={handleRegistrationChange}
                />
                Мужской
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={registrationForm.gender === 'female'}
                  onChange={handleRegistrationChange}
                />
                Женский
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={registrationForm.gender === 'other'}
                  onChange={handleRegistrationChange}
                />
                Другой
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Комментарии</label>
            <textarea
              id="comments"
              name="comments"
              value={registrationForm.comments}
              onChange={handleRegistrationChange}
              rows="4"
              placeholder="Дополнительная информация..."
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreement"
                checked={registrationForm.agreement}
                onChange={handleRegistrationChange}
                required
              />
              Я согласен с условиями использования *
            </label>
          </div>

          <button type="submit" className="submit-btn">Зарегистрироваться</button>
        </form>

        {submissionResults.registration && (
          <div className="result-message">
            <pre>{submissionResults.registration}</pre>
          </div>
        )}
      </section>

      {/* Форма обратной связи */}
      <section className="form-section">
        <h2>Форма обратной связи</h2>
        <form onSubmit={handleFeedbackSubmit} className="demo-form">
          <div className="form-group">
            <label htmlFor="subject">Тема *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={feedbackForm.subject}
              onChange={handleFeedbackChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Категория обращения</label>
            <select
              id="category"
              name="category"
              value={feedbackForm.category}
              onChange={handleFeedbackChange}
            >
              <option value="">Выберите категорию</option>
              <option value="bug">Сообщение об ошибке</option>
              <option value="feature">Предложение функции</option>
              <option value="support">Техническая поддержка</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Сообщение *</label>
            <textarea
              id="message"
              name="message"
              value={feedbackForm.message}
              onChange={handleFeedbackChange}
              rows="6"
              placeholder="Опишите ваш вопрос или проблему..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">Прикрепить файл</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFeedbackChange}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifications"
                checked={feedbackForm.notifications}
                onChange={handleFeedbackChange}
              />
              Получать уведомления о статусе обращения
            </label>
          </div>

          <button type="submit" className="submit-btn">Отправить сообщение</button>
        </form>

        {submissionResults.feedback && (
          <div className="result-message">
            <pre>{submissionResults.feedback}</pre>
          </div>
        )}
      </section>

      {/* Форма настроек */}
      <section className="form-section">
        <h2>Форма настроек</h2>
        <form onSubmit={handleSettingsSubmit} className="demo-form">
          <div className="form-group">
            <label htmlFor="volume">Громкость: {settingsForm.volume}%</label>
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="100"
              value={settingsForm.volume}
              onChange={handleSettingsChange}
              className="range-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="colorScheme">Цветовая схема</label>
            <input
              type="color"
              id="colorScheme"
              name="colorScheme"
              value={settingsForm.colorScheme}
              onChange={handleSettingsChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Дата рождения</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={settingsForm.birthDate}
              onChange={handleSettingsChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="preferredTime">Предпочитаемое время</label>
            <input
              type="time"
              id="preferredTime"
              name="preferredTime"
              value={settingsForm.preferredTime}
              onChange={handleSettingsChange}
            />
          </div>

          <div className="form-group">
            <label>Интересы</label>
            <div className="checkbox-group">
              {['Спорт', 'Музыка', 'Кино', 'Путешествия', 'Технологии', 'Кулинария'].map(interest => (
                <label key={interest} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={settingsForm.interests.includes(interest)}
                    onChange={handleSettingsChange}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn">Сохранить настройки</button>
        </form>

        {submissionResults.settings && (
          <div className="result-message">
            <pre>{submissionResults.settings}</pre>
          </div>
        )}
      </section>
    </div>
  );
}

export default FormsPage;