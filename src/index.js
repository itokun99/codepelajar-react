import React from 'react';
import ReactDOM from 'react-dom';
import { FeaturePost, PostContainer, SidebarPopularPost } from 'containers';
import elements from './elements';
// import './index.css';
import './assets/scss/index.scss';
import * as serviceWorker from './serviceWorker';

const registerComponent = [
  { component: FeaturePost, element: elements.HOME_FEATURED_POST },
  { component: PostContainer, element: elements.HOME_POST_CONTAINER },
  { component: SidebarPopularPost, element: elements.SIDEBAR_POPULAR_POST }
];

registerComponent.forEach(app => {
  const Component = app.component;
  const el = app.element;
  if (el) {
    ReactDOM.render(<Component />, el);
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
