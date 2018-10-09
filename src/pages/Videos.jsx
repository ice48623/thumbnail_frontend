import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'
import '../assets/Video.css';

class Videos extends Component {

    state = {
        bucket: "",
        objects: [],
        videos: []
    }

    componentDidMount() {
        const bucket = this.props.match.params.bucket;
        this.setState({bucket});
        axios.get("http://localhost:8080/" + bucket + "?list")
            .then(res => {
                const objects = res.data.objects;
                const videos = objects.filter((object) => {
                    return object.name.split(".")[1] !== "gif"
                });
                this.setState({
                    objects: objects,
                    videos: videos
                })
            })
    }

    handleGenerateAll() {
        const url = "http://0.0.0.0:5000/addAll?bucket=" + this.state.bucket;
        axios.post(url)
            .then(res => {
                console.log(res);
            })
    }

    handleGenerate(videoName) {
        console.log(videoName)
        const url = "http://0.0.0.0:5000/add?bucket=" + this.state.bucket + "&object=" + videoName + "&t_bucket=" + this.state.bucket + "&t_object=" + videoName.split(".")[0]+".gif";
        axios.post(url)
            .then(res => {
                console.log(res);
            })
    }

    render() {

        return (
            <div>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                {this.state.bucket}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="content">
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleGenerateAll()}
                        >
                            Generate GIFs for this bucket
                        </Button>
                    </div>
                    <List component="nav">
                        {this.state.videos.map(video => (
                            <ListItem button={false}
                                      key={video.name}
                                      className="list"
                            >
                                <ListItemText primary={video.name}/>
                                <Button
                                    variant="contained"
                                    onClick={() => this.handleGenerate(video.name)}
                                >
                                    Generate GIF
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

export default Videos;
