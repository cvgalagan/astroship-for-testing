import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import HomePage from './components/HomePage/HomePage'
import FormsPage from './components/FormsPage/FormsPage'
import WindowPage from './components/WindowPage/WindowPage'
import ActivityPage from './components/ActivityPage/ActivityPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/window" element={<WindowPage />} />
            <Route path="/activity" element={<ActivityPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
