import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import 'antd/dist/antd.css';
import './assets/icon8/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from "./Router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import {firebaseConfig} from "./config/firebase.config";

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);


ReactDOM.render(<Routing />,
  document.getElementById('root')
);

