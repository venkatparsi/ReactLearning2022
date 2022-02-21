
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App/components/App';
import {Provider} from 'react-redux';
import noteStore from './AppStore'
ReactDOM.render(
  <Provider store={noteStore}>
    <BrowserRouter>
       <App />  
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);  