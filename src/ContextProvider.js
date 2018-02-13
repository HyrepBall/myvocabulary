import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme  } from 'material-ui/styles';
import PropTypes from 'prop-types';
import themes from './themes';


class ContextProvider extends Component {
  static childContextTypes = {
    changeTheme: PropTypes.func,
    currentTheme: PropTypes.object
  };

  state = {
    muiTheme: createMuiTheme(themes.light)
  };

  getChildContext() {
    return {
      changeTheme: this.changeTheme,
      currentTheme: this.state.muiTheme
    };
  }

  changeTheme = () => {

    const theme = this.state.muiTheme.palette.type === 'light' ?
          'dark' :
          'light'

    this.setState({
      muiTheme: createMuiTheme(themes[theme])
    });

  };

  render() {

    return (
      <MuiThemeProvider theme={this.state.muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}


export default ContextProvider;