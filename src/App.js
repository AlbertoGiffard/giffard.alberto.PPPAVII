import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home/Home';
import Check from './components/check/Check';
import Error404 from './components/error404/Error404';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/mascotas/:id' component={Check} />
        <Route path='*' component={Error404} />
      </Switch>
    </Router>
  )
}


export default App;
