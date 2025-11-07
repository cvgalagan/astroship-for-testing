import { useState, useEffect } from 'react'
import './PrivateBrowsingPage.css'

function PrivateBrowsingPage() {
  const [pageInfo, setPageInfo] = useState({
    referrer: '',
    queryParams: {}
  })

  const [metricInfo, setMetricInfo] = useState({
    documentReferrer: '',
    externalScriptReferrer: '',
    queryParams: {},
    loading: true,
    error: null
  })

  useEffect(() => {
    const referrer = document.referrer

    const urlParams = new URLSearchParams(window.location.search)
    const params = {}
    for (const [key, value] of urlParams.entries()) {
      params[key] = value
    }

    setPageInfo({
      referrer: referrer || 'Нет referrer',
      queryParams: params
    })
  }, [])

  useEffect(() => {
    const loadMetricData = () => {
      if (typeof window.ym === 'undefined') {
        setMetricInfo({
          referrer: '',
          queryParams: {},
          loading: false,
          error: 'Counter не загружен'
        })
        return
      }

      try {
        window.ym(101671390, 'getReferrer', (data) => {
          const [[documentReferrer, externalScriptReferrer], search] = data || [['', ''], '']

          const urlParams = new URLSearchParams(search)
          const params = {}
          for (const [key, value] of urlParams.entries()) {
            params[key] = value
          }

          setMetricInfo({
            documentReferrer: documentReferrer || 'Нет referrer',
            externalScriptReferrer: externalScriptReferrer || 'Нет referrer',
            queryParams: params,
            loading: false,
            error: null
          })
        })
      } catch (err) {
        setMetricInfo({
          documentReferrer: '',
          externalScriptReferrer: '',
          queryParams: {},
          loading: false,
          error: err.message
        })
      }
    }

    const timer = setTimeout(loadMetricData, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="private-browsing-page">
      <h1 className="page-title">Referrer и Query параметры</h1>

      <div className="columns-container">
        <div className="column referrer-column">
          <h2 className="column-title">Информация о странице</h2>

          <div className="info-card">
            <h3 className="section-subtitle">Document Referrer</h3>
            <div className="info-row">
              <span className="info-label">Referrer:</span>
              <span className="info-value">{pageInfo.referrer}</span>
            </div>
          </div>

          <div className="info-card">
            <h3 className="section-subtitle">Query параметры</h3>
            {Object.keys(pageInfo.queryParams).length > 0 ? (
              Object.entries(pageInfo.queryParams).map(([key, value]) => (
                <div className="info-row" key={key}>
                  <span className="info-label">{key}:</span>
                  <span className="info-value">{value}</span>
                </div>
              ))
            ) : (
              <p className="empty-message">Нет query параметров в URL</p>
            )}
          </div>
        </div>

        <div className="column metric-column">
          <h2 className="column-title">Счетчик</h2>

          {metricInfo.loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Загрузка...</p>
            </div>
          )}

          {metricInfo.error && (
            <div className="error-state">
              <p className="error-message">❌ {metricInfo.error}</p>
            </div>
          )}

          {!metricInfo.loading && !metricInfo.error && (
            <>
              <div className="info-card">
                <h3 className="section-subtitle">Counter Referrers</h3>
                <div className="info-row">
                  <span className="info-label">Document Referrer:</span>
                  <span className="info-value">{metricInfo.documentReferrer}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">External Script Referrer:</span>
                  <span className="info-value">{metricInfo.externalScriptReferrer}</span>
                </div>
              </div>

              <div className="info-card">
                <h3 className="section-subtitle">Counter Query параметры</h3>
                {Object.keys(metricInfo.queryParams).length > 0 ? (
                  Object.entries(metricInfo.queryParams).map(([key, value]) => (
                    <div className="info-row" key={key}>
                      <span className="info-label">{key}:</span>
                      <span className="info-value">{value}</span>
                    </div>
                  ))
                ) : (
                  <p className="empty-message">Нет query параметров</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PrivateBrowsingPage
