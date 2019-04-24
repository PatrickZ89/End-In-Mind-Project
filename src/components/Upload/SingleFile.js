import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 8,
    overflowX: "auto"
  },
  iconHover: {
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
});

class FileDisplay extends Component {
  state = {
    signedUrl: ""
  };

  componentDidMount() {
    // for each file, get the signed URL
    axios({
      method: "GET",
      url: "/api/aws/signed-url",
      params: { key: this.props.myFile.key }
    })
      .then(response => {
        console.log("got signed url", response);
        this.setState({
          signedUrl: response.data.signedUrl
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDeleteClick = () => {
    this.props.dispatch({
      type: "DELETE_FILE",
      payload: this.props.myFile.key
    });

    return;
  };

  render() {
    const { classes } = this.props;

    const file = this.props.myFile;
    return (
      <TableRow key={file.id}>
        <CustomTableCell component="th" scope="row">
          {file.title}
        </CustomTableCell>
        <CustomTableCell component="th" scope="row">
          {file.description}
        </CustomTableCell>
        <CustomTableCell component="th" scope="row">
          <a href={this.state.signedUrl}>file</a>
        </CustomTableCell>

        <CustomTableCell style={{ width: "10%" }} align="right">
          <IconButton
            className={classes.iconHover}
            onClick={this.handleDeleteClick}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </CustomTableCell>
      </TableRow>
    );
  }
}

const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default withStyles(styles)(connect(mapReduxStateToProps)(FileDisplay));
