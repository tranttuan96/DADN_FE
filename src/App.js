import { BrowserRouter, Switch } from 'react-router-dom'
import { AuthTemplate } from './templates/AuthTemplate/AuthTemplate'
import Login from './pages/Auth/Login'
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import homepage from './pages/Homepage/homepage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        
        <AuthTemplate exact path='/login' component={Login} />
        <UserTemplate exact path='/' component={homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
