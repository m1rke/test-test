import React from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SigninForm from "../../components/Signin/index";
import { authenticate } from "../../store/reducers/authenticate";
import styles from './styles'



const RegistrationScreen = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <SigninForm handleSubmit={props.login} />
      </Card>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login: () => authenticate()
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(RegistrationScreen));
