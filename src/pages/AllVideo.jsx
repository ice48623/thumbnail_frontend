import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class AllVideo extends Component {

  state = {
    keyword: ""
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <div>
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Photos
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <h3>ID: {this.props.match.params.bucket}</h3>
        </div>
      </div>
    )
  }
}

export default AllVideo;
