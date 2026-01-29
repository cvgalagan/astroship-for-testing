import { useState } from 'react'
import ControlButtons from '../ControlButtons/ControlButtons'
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
        <ControlButtons
          addLabel="Добавить видео"
          removeLabel="Удалить видео"
          onAdd={handleAddVideo}
          onRemove={handleRemoveVideo}
          currentCount={videoCount}
          countLabel="Видео"
        />
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
        <ControlButtons
          addLabel="Добавить 3 изображения"
          removeLabel="Удалить 3 изображения"
          onAdd={handleAddImage}
          onRemove={handleRemoveImage}
          currentCount={imageCount}
          countLabel="Изображений"
        />
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
