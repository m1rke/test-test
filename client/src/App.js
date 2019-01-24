import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { connect, Provider } from 'react-redux'
import PropTypes from 'prop-types'
import store from './store/Store'
import setAuthToken from './services/SetAuthToken'
import jwt_decode from 'jwt-decode'
import LoginScreen from './containers/LoginScreen/LoginScreen'
import { logoutUser, setCurrentUser } from './store/actions/authentication'
import HomeScreen from './containers/HomeScreen/HomeScreen'
import Setting from './containers/SettingScreen/SettingScreen'
import NotFound from './components/NotFound/NotFoundComponent'
import Dashboard from './components/Dashboard/Dashboard'
import EmptyRoute from './components/EmptyRoute/EmptyRoute'

class App extends Component {

  componentWillMount () {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken)
      const decoded = jwt_decode(localStorage.jwtToken)
      store.dispatch(setCurrentUser(decoded))
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser())
        window.location.href = '/signin'
      }
    }
  }

  render () {
    const {settings} = this.props
    return (
      <MuiThemeProvider theme={settings.theme}>
        <Provider store={store}>
          <CssBaseline />
          <div style={{height: '100vh'}}>
            <Router>
              <Switch>
                <Route exact path='/signin' component={LoginScreen} />
                <Dashboard path='/dashboard' component={HomeScreen} />
                <Dashboard path='/setting' component={Setting} />
                <Route exact path='/' component={LoginScreen} />
                <EmptyRoute component={NotFound} />
              </Switch>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(
  mapStateToProps, null
)(App)
