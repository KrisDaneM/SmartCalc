import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('SmartCalc render error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <main className="error-fallback" role="alert">
        <img src="/smlogo.png" alt="" />
        <h1>SmartCalc hit an unexpected error.</h1>
        <p>Your inputs have not been sent anywhere. Reload the page to try again.</p>
        <button type="button" className="button primary" onClick={() => window.location.reload()}>Reload SmartCalc</button>
      </main>
    }
    return this.props.children
  }
}
