
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './screens/App/components/App';
import {Provider} from 'react-redux';
import noteStore from './scNotes/noteStore'
ReactDOM.render(
  <Provider>
    <BrowserRouter>
       <App />  
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);  