import React from 'react';
import ReactDOM from 'react-dom';
import { FeaturePost, PostContainer } from 'containers';
import elements from './elements';
// import './index.css';
import './assets/scss/index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<FeaturePost />, elements.HOME_FEATURED_POST);
ReactDOM.render(<PostContainer />, elements.HOME_POST_CONTAINER);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
