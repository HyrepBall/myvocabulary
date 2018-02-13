import React, { Component } from 'react';
import { connect } from 'react-redux'

import Testing from './components/Testing';
import Vocabulary from './components/Vocabulary';

import './App.css';

class Home extends Component {

	render() {
		return (
			<div className="app">

				<h2 className="app-title">Hello in Home</h2>

			</div>
		);
	}

}

export default connect(
	state => ({
	}),
	dispatch => ({
	})
)(Home);
