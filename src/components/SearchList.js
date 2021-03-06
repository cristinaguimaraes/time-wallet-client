import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownOptions from './DropDownMenu.js';
import image from '../assets/sample-guy.jpeg';
import { requestToDoTask } from '../data/fetchServer.js';
import './SearchList.css';

class SearchList extends Component {

  constructor(props) {
    super(props);
    this.state ={
      requestedTasks:[],
    }
  }

  handleResponseClick = (event) => {
    this.setState({requestedTasks: this.state.requestedTasks.concat([event.target.name])})
    requestToDoTask(event.target.name, this.props.userId);
  }

  renderSearchItem = (key) => {
    const job = this.props.allJobs[key];
    return (
      <div id={job.taskId} className="search-item">
        <div className="search-image"><img src={image} alt="user-pic"/></div>
        <div className="taskInfo">
          <h1 className="search-title">{job.title}</h1>
          <div className="search-user-ask">{job.userAskName}</div>
          <div className="search-time">{"Time: "+ job.time + " minutes." }</div>
        </div>
        {this.state.requestedTasks.indexOf(key)===-1?<button name={key} className="search-respond" onClick={this.handleResponseClick}>Request this task!</button>:<button>Requested!</button>}

      </div>
    )
  }


  render() {
    const allJobs = Object.keys(this.props.allJobs);
    return (
      <div className="SearchList">
        <h1 className="list-title">List View</h1>
        <div className ="order-list">
          <div className="order-text"><span>Order by: </span></div><MuiThemeProvider><DropDownOptions/></MuiThemeProvider>
        </div>
        {Object.keys(this.props.allJobs).map((key)=> {
          return this.renderSearchItem(key)}
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allJobs:state.allJobs,
  userId:state.userId,
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchList));
