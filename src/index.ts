import './css/_site.scss';
import 'bootstrap';

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello Webpack';//_.join(['Hello', 'webpack'], ' ');
    return element;
  }

  document.body.appendChild(component());