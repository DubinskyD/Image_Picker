import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/reducers/app-reducer';
import { likesSortDescending, likesSortAscending, commentsSortDescending, commentsSortAscending } from './redux/reducers/picker-reducer';
import './App.css';

import Preloader from './components/preloader/Preloader';
import MainContent from './components/mainContent/MainContent';

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div >
        <MainContent
          imageChunks={this.props.imageData.chunks}
          imagesData={this.props.imageData.data.hits}
          likesSortDescending={this.props.likesSortDescending}
          likesSortAscending={this.props.likesSortAscending}
          commentsSortDescending={this.props.commentsSortDescending}
          commentsSortAscending={this.props.commentsSortAscending}
        />
      </div >

    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  imageData: state.imageData,

})

export default connect(mapStateToProps, { initializeApp, likesSortDescending, likesSortAscending, commentsSortDescending, commentsSortAscending })(App);
