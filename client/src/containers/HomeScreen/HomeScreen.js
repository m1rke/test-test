import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { connect } from 'react-redux'
import { loginUser } from '../../store/actions/authentication'
import { withRouter } from 'react-router-dom'

class HomeScreen extends Component {

  componentWillMount () {
    const {isAuthenticated} = this.props.auth
    if (!isAuthenticated) {
      this.props.history.push('/signin')
    }
  }

  render () {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Card>
          <CardContent>
            <h1>Dashboard Screen</h1>
          </CardContent>
        </Card>
      </div>
    )
  }
}

HomeScreen.propTypes = {
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
export default connect(mapStateToProps, {loginUser})(withRouter(HomeScreen))
