import React, { Component } from 'react'
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchTipsData } from '../actions/tips';
import moment from 'moment'
import './stats-page.css'
// console.log(moment('2019-02-07')) 

export class StatsPage extends Component {
  state = {
    view: ''
  }

  componentDidMount() {
    this.props.dispatch(fetchTipsData())
  }

  genereteFormattedDate(date) {
    return moment(date).format('dddd, MMMM Do YYYY');
  }

  render() {
    const tips = this.props.tips.map((tip) => {
      const formattedDate = this.genereteFormattedDate(tip.date);
      return (
        <li className="tip-report" key={tip.id}>
          <p>{formattedDate}</p>
          <p name="tips">Total Tips: <span>{(tip.totalTips - tip.tippedOut)}</span></p>
          <p name="tips">Total Hours: <span>{tip.hours}</span></p>          
          <p name="tips">Hourly Rate: <span>${(tip.totalTips / tip.hours).toFixed(2)} / hr</span></p>
          <p name="notes">Notes: <span>{tip.notes}</span></p>
        </li>
      )
    });
    
    return (
      <div>
        <h2>Stats for {this.props.username}</h2>
        <button onClick={() => this.setState({view: 'daily'})}>daily</button>
        <button onClick={() => this.setState({view: 'weekly'})}>weekly</button>
        <button onClick={() => this.setState({view: 'monthly'})}>monthly</button>
        <ul>
         {tips}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  tips: state.tipsData.tips
})

export default requiresLogin()(connect(mapStateToProps)(StatsPage));