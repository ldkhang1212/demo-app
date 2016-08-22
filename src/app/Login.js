import React, {Component}  from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';



// Theme
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Bootstrap
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';





// Firebase authentication
var Firebase = require("firebase");
var Router = require('react-router');

var Loader = require('react-loader');



const REGISTERED_SUCCESSFULLY_MESSAGE = "You registered sucessfully and can login now."


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Login extends Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      displayingMessage: "",
      showLoadingSpinner: false,
      dialogOpen: false,
      username: "",
      password: ""
    };

    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onSignedUpSuccessfully = this.onSignedUpSuccessfully.bind(this);
    this.onAuthenticationFailure = this.onAuthenticationFailure.bind(this);
    this.enableLoadingSpinner = this.enableLoadingSpinner.bind(this);
    this.disableLoadingSpinner = this.disableLoadingSpinner.bind(this);
  }

  signin() {
    this.enableLoadingSpinner();
    console.log("data: " + this.state);
    var username = this.state.username;
    var password = this.state.password;
    firebase.auth().signInWithEmailAndPassword(username, password).catch(this.onAuthenticationFailure).then(function() {
       
        // Make sure authentication state gets changed before redirecting
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            console.log("logged in successfully, user can access the application now");
            // Redirect to home page
            Router.hashHistory.push('/');
          } else {
            // session is expired, redirect to login page
            Router.hashHistory.push('/login');
          }
        });
    });
  }

  signup() {
    console.log("data: " + this.state);
    var username = this.state.username;
    var password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error: "  + errorMessage );
      // ...
    }).then(this.onSignedUpSuccessfully);
  }


  onAuthenticationFailure(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error: "  + errorMessage );
    this.state.displayingMessage = errorMessage;
    this.disableLoadingSpinner();
    this.openDialog();
  }

  onSignedUpSuccessfully() {
    this.state.displayingMessage = REGISTERED_SUCCESSFULLY_MESSAGE;
    this.openDialog();
  }


  setUsername(e) {
    this.state.username = e.target.value;
  }

  setPassword(e) {
    this.state.password = e.target.value;
  }

  enableLoadingSpinner() {
    this.setState({showLoadingSpinner: true});
  }


  disableLoadingSpinner() {
    this.setState({showLoadingSpinner: false});
  }

  openDialog() {
    this.setState({dialogOpen: true});
  };

  closeDialog() {
    this.setState({dialogOpen: false});
  };


  render() {
      const actions = [
         <FlatButton
           label="Got it"
           primary={true}
           onTouchTap={this.closeDialog}
         />,
       ];

      return (

        <MuiThemeProvider muiTheme={muiTheme}>
            <div class="login-form">
              
                <Grid>
                  <Row>
                    <Col>
                    <Loader loaded={!this.state.showLoadingSpinner}  top="50%" left="50%">
                       <Form horizontal>
                        <FormGroup controlId="formHorizontalUsername">
                          <div className="signinFormHeader">
                              Login to your account
                          </div>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalUsername">
                            <FormControl type="text" placeholder="Enter username"  onChange={this.setUsername}/>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword">
                            <FormControl type="password" placeholder="Enter password" onChange={this.setPassword}/>
                        </FormGroup>
                        <FormGroup>
                            <Checkbox>Remember me</Checkbox>
                        </FormGroup>

                        <FormGroup>
                            <RaisedButton className="signinFormButton" label="Sign In" primary={true}
                                onMouseDown={this.signin}
                            />
                        </FormGroup>
                        
                      </Form>
                       </Loader>
                    </Col>
                  </Row>
                </Grid>  
             
               

                 

              <Dialog
                title="Message"
                actions={actions}
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={this.closeDialog}
              >
              {this.state.displayingMessage}
              </Dialog>
            </div>
        </MuiThemeProvider>
      )
  }
}



export default Login;
