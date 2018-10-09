import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

class GIF extends Component {

    state = {
        bucket: "",
        objects: [],
        gifs: []
    };

    componentDidMount() {
        const bucket = this.props.match.params.bucket;
        this.setState({bucket});
        axios.get("http://localhost:8080/" + bucket + "?list")
            .then(res => {
                const objects = res.data.objects;
                const gifs = objects.filter((object) => {
                    return object.name.split(".")[1] === "gif"
                });
                this.setState({
                    objects: objects,
                    gifs: gifs
            })
        })
    }


    handleDownload(objectName) {
        console.log("download")
        const normalizeUrl = require('normalize-url');
        console.log(this.state.bucket)
        const url = normalizeUrl("http://localhost:8080/" + this.state.bucket + "/" + objectName);
        console.log(url)
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', objectName);
            document.body.appendChild(link);
            link.click();
        });
    }

    handleDelete(objectName) {
        console.log("delete")
        axios.delete('http://localhost:8080/' + this.state.bucket + "/" + objectName + "?delete").then((response) => {
            console.log(response)
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
                <div>

                    <GridList cellHeight={500} cols={3}>
                        {this.state.gifs.map(tile => (
                            <Card key={tile.name}>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="320"
                                        image={"http://localhost:8080/" + this.state.bucket + "/" + tile.name}
                                        title={tile.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="title" component="h2">
                                            {tile.name}
                                        </Typography>
                                    </CardContent>
                                </CardContent>
                                <CardActions>
                                    <Button id={tile.name} size="small" color="primary" onClick={() => this.handleDownload(tile.name)}>
                                        Download
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => this.handleDelete(tile.name)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}

export default GIF;
