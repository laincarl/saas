import { Component } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class Loading extends Component {
  componentWillMount() {
    NProgress.start();
  }
  
  componentDidMount() {
    NProgress.done();
  }
  
  render() {
    return (null);
  }
}

export default Loading;
