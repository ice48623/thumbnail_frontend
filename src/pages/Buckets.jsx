import React, {Component} from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../assets/Buckets.css';
import Button from '@material-ui/core/Button'

class Buckets extends Component {

    state = {
        buckets: []
    }

    componentDidMount() {
        const url = "http://localhost:8080/get_all_bucket";
        axios.get(url)
            .then(res => {
                this.setState({
                    buckets: res.data.buckets
                })
            })
    }

    handleVideoButtonClick(bucketName) {
        this.props.history.push("/"+bucketName+"/show_all_videos")
    };

    handleGIFClick(bucketName) {
        this.props.history.push("/"+bucketName+"/show_all_gifs")
    }

    render() {
        return (
            <div>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                {"All Buckets"}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="content">
                    <List component="nav">
                        {this.state.buckets.map(bucket => (
                            <ListItem button={false}
                                      key={bucket}
                                      className="list"
                            >
                                <ListItemText primary={bucket}/>
                                <Button
                                    variant="contained"
                                    onClick={() => this.handleVideoButtonClick(bucket)}
                                    classes="button"
                                >
                                    Video
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => this.handleGIFClick(bucket)}
                                >
                                    GIF
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

export default Buckets;