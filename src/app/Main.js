/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import CircularProgress from 'material-ui/CircularProgress';

// actionIcon
import ActionAndroid from 'material-ui/svg-icons/action/android';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import FontIcon from 'material-ui/FontIcon';

import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Bootstrap
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

var Firebase = require("firebase");
var Router = require('react-router');

var Loader = require('react-loader');


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2aqfF2npXkdA6eVChVS_fYBtjcb_e__Y",
    authDomain: "khangfirebase.firebaseapp.com",
    databaseURL: "https://khangfirebase.firebaseio.com",
    storageBucket: "khangfirebase.appspot.com",
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      if (isAnonymous == true) {
          Router.hashHistory.push('/login');
      }
      // ...
    } else {
      Router.hashHistory.push('/login');
    }
    console.log("Logged in already");

    // ...
  });

  var commentsRef = firebase.database().ref('foods/');









const style = {
  margin: 4,
};

const actionStyle = {
  'textAlign': 'center',
};


const cardMediaStyle = {
  width:  'auto',
  height: '140pt',
};

const cardStyle = {
  margin: 6,
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


const tilesData = [
  {
    img: 'images.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images1.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images2.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images3.jpg',
    title: 'Breakfast',
    author: 'jill111',
  }
]


// tutorial10.js
var FoodsList = React.createClass({

  getInitialState: function() {
    return {foods: [], foodLoaded: false};
  },
  componentDidMount: function() {
      // Attach an asynchronous callback to read the data at our posts reference
    commentsRef.once("value", function(snapshot) {

      console.log(snapshot.val());
      var foods = [];
      var i = 0;
      snapshot.forEach(function(foodSnapshot) {
        foods[i++] = foodSnapshot.val();
      });
      this.setState({
        foods: foods,
        foodLoaded: true
      });
    }.bind(this),
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }.bind(this));
  },

  render: function() {
    var foods = this.state.foods.map(function(food) {
         return (<Col sm={3} md={4} lg={3}>
          <Card  style={cardStyle}>
            <CardHeader
              title={food.provider}
              subtitle={food.contactPhone}
              avatar={food.providerImageUrl}/>
            <CardMedia
              overlay={<CardTitle title={food.name} subtitle={food.price}/>} >
              <img src={food.imageUrl} style={cardMediaStyle}/>
            </CardMedia>
            <CardText>
              {food.desc}
            </CardText>
            <CardActions style={actionStyle}>
                <RaisedButton  icon={<ActionThumbUp />} secondary={true} style={style} />
                <RaisedButton  icon={<ActionThumbDown />} secondary={true} style={style} />
            </CardActions>
          </Card>
        </Col>);
    });

    return (
      <div>
        <Loader loaded={this.state.foodLoaded}  top="50%" left="50%">
          {foods}
        </Loader>
      </div>
    );
  }
})

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.logout = this.logout.bind();

    this.state = {
      open: false,
    };
  }





  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  logout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
       Router.hashHistory.push('/login');
    }, function(error) {
      // An error happened.
    });
  }


  handleToggle () {
    this.setState({
      open: !this.state.open,
    });
  }



  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Grid>
          <Row className="show-grid">
            <Col>
              <AppBar
                 title="Title"
                 onLeftIconButtonTouchTap={this.handleToggle}
                 iconElementRight={<FlatButton label="Logout" onMouseDown={this.logout}/>}
                 />
                <Drawer
                  docked={false}
                  open={this.state.open}
                   onRequestChange={(open) => this.setState({open})}>
                  <MenuItem  onTouchTap={this.handleToggle}>Món Hôm Nay</MenuItem>
                  <MenuItem  onTouchTap={this.handleToggle}>Kết Quả</MenuItem>
                </Drawer>
            </Col>
          </Row>

          <Row >
            
              <FoodsList/>
           
          </Row>

        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default Main;
