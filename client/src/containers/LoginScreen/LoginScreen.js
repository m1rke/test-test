import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../store/actions/authentication'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import styles from './styles'

class LoginScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeValue = this.handleChangeValue.bind(this)
  }

  handleChangeValue (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const form = event.target

    const user = {
      email: form.email.value,
      password: form.password.value
    }
    this.setState({...user})
    this.props.loginUser(user)
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <LoginForm email={this.state.email} password={this.state.password} onChangeValue={this.handleChangeValue}
            handleSubmit={this.handleSubmit} />
        </Card>
      </div>
    )

  }
}

LoginScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(withStyles(styles)(LoginScreen)))