import { useState } from 'react'
import './ActivityPage.css'

function ActivityPage() {
  const [videoCount, setVideoCount] = useState(1)
  const [imageCount, setImageCount] = useState(6)

  const handleAddVideo = () => {
    setVideoCount(prev => prev + 1)
  }

  const handleRemoveVideo = () => {
    setVideoCount(prev => Math.max(prev - 1, 0))
  }

  const handleAddImage = () => {
    setImageCount(prev => prev + 3)
  }

  const handleRemoveImage = () => {
    setImageCount(prev => Math.max(prev - 3, 0))
  }

  return (
    <div className="activity-page">
      <h1>Активность</h1>
      <p className="page-description">
        Страница для тестирования активности пользователя с различными элементами
      </p>

      {/* Section 1: Scrollable Image */}
      <section className="activity-section">
        <h2>Прокручиваемое изображение</h2>
        <div className="scrollable-container">
          <img
            src="https://picsum.photos/1600/1200"
            alt="Large scrollable image"
            className="scrollable-image"
          />
        </div>
      </section>

      {/* Section 2: Video Players */}
      <section className="activity-section">
        <h2>Видео плеер</h2>
        <div className="controls-group">
          <button onClick={handleAddVideo} className="control-btn">
            Добавить видео
          </button>
          <button onClick={handleRemoveVideo} className="control-btn">
            Удалить видео
          </button>
          <span className="count-label">Видео: {videoCount}</span>
        </div>
        <div className="video-grid">
          {Array.from({ length: videoCount }).map((_, index) => (
            <div key={index} className="video-wrapper">
              <video
                controls
                className="video-player"
                poster="https://picsum.photos/400/225"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                Ваш браузер не поддерживает видео тег.
              </video>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Image Gallery */}
      <section className="activity-section">
        <h2>Галерея изображений</h2>
        <div className="controls-group">
          <button onClick={handleAddImage} className="control-btn">
            Добавить 3 изображения
          </button>
          <button onClick={handleRemoveImage} className="control-btn">
            Удалить 3 изображения
          </button>
          <span className="count-label">Изображений: {imageCount}</span>
        </div>
        <div className="image-gallery">
          {Array.from({ length: imageCount }).map((_, index) => (
            <div key={index} className="image-item">
              <img
                src={`https://picsum.photos/300/200?random=${index}`}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ActivityPage
