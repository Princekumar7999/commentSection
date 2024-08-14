import React from 'react';
import './styles.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import CommentBox from './components/CommentBox';
import CommentList from './components/CommentList';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>💬 Vibe Check</h1>
        <CommentBox />
        <CommentList />
      </div>
    </Provider>
  );
};

export default App;