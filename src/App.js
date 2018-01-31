import React, { Component } from 'react';
import { connect } from 'react-redux'

import Testing from './components/Testing';
import Vocabulary from './components/Vocabulary';

import './App.css';

class App extends Component {

	render() {
		return (
			<div className="app">

				<h2 className="app-title">Welcome to My Awesome Vocabulary!</h2>

				<Vocabulary />

				<Testing />

			</div>
		);
	}

}

export default connect(
	state => ({
	}),
	dispatch => ({
	})
)(App);
