import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class Videos extends Component {

  state = {
    bucket: "",
    objects: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/demo?list`)
      .then(res => {
        const vid = res.data.objects
        const bucket_name = res.data.name
        this.setState({
          bucket: bucket_name,
          objects: vid
        })
      })
  }

  render() {
    const bucket = this.props.match.params.bucket
    const videos = this.state.objects.filter((object) => {
      return object.name.split(".")[1] !== "gif"
    })
    return (
      <div>
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                {bucket}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <ul>
            {
              videos.map(video => <li>{video.name}</li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Videos;
