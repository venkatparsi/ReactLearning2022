
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App/components/App';
import {Provider} from 'react-redux';
import noteStore from './AppStore';
import 'bootstrap/dist/css/bootstrap.css';
import {IntlProvider } from 'react-intl';
import './i18n'
ReactDOM.render(
  <Provider store={noteStore}>
    <BrowserRouter>
    <IntlProvider>
       <App />  
       </IntlProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);  