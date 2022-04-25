
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import {Provider} from 'react-redux';
import appStore from './AppStore';
import 'bootstrap/dist/css/bootstrap.css';
import {IntlProvider } from 'react-intl';
import './i18n'
ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
    <IntlProvider>
       <App />  
       </IntlProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);  