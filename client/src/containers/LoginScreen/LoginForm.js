import React from 'react'
import { reduxForm } from 'redux-form'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import styles from './styles'



const LoginForm = props => {
  const { handleSubmit, classes,email,password, onChangeValue } = props;
  return (
    <form onSubmit={handleSubmit} className={classes.grid}>
      <div>
        <Typography
          align="left"
          headlineMapping={{ display: "h1" }}
          variant="headline"
        >
          Login
        </Typography>
        <Typography
          align="left"
          headlineMapping={{ display: "h1" }}
          variant="title"
        >
        </Typography>
      </div>

      <TextField
        className={classes.inputRoot}
        name="email"
        type="email"
        label="Email"
        value={email}
        onChange={onChangeValue}
      />

      <TextField
        className={classes.inputRoot}
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={onChangeValue}
      />
      <div className={classes.buttons}>
        <Button

          type="submit"
          color="primary"
          variant="contained"
        >
          Signin
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  form: "login"
})(withStyles(styles)(LoginForm));
