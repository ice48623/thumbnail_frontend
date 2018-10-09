import React, {Component} from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../assets/Buckets.css'

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

    handleListItemClick(bucketName) {
        this.props.history.push("/"+bucketName+"/show_all_gifs")
    };

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
                            <ListItem button
                                      key={bucket}
                                      onClick={() => this.handleListItemClick(bucket)}
                                      className="list"
                            >
                                <ListItemText primary={bucket}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

export default Buckets;