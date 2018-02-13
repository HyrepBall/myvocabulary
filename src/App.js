import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import Testing from './components/Testing';
import Vocabulary from './components/Vocabulary';

import './App.css';



class App extends Component {
	static contextTypes = {
    changeTheme: PropTypes.func,
    currentTheme: PropTypes.object
  };

	state = {
		lightActive: true,
  };

  toggleTheme = () => {

  	this.setState({
  		lightActive: !this.state.lightActive
  	});

  	this.context.changeTheme();
  }

	render() {

		const { palette } = this.context.currentTheme;

		console.log(this.context.currentTheme)

		return (
			<div 
				className="app-container" 
				style={{
					backgroundColor: palette.grey[50]
				}} 
			>
				<div className="app" >

					<h2 className="app-title">Welcome to My Awesome Vocabulary!</h2>

					<div>
						<FormGroup>
			        <FormControlLabel
			          control={
			            <Switch
			              checked={
			              	this.state.lightActive ?
			              	false :
			              	true 
			              }
			              onChange={() => this.toggleTheme() }
			            />
			          }
			          label="Яркий / тёмный режим"
			        />
			      </FormGroup>
					</div>

					<Vocabulary />

					<Testing />

				</div>
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
