import { BrowserRouter, Switch } from 'react-router-dom'
import { AuthTemplate } from './templates/AuthTemplate/AuthTemplate'
import Login from './pages/Auth/Login'
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import homepage from './pages/Homepage/homepage'
import DoAm from './pages/Homepage/DoAm'
import MayBom from './pages/Homepage/MayBom'
import LichSu from './pages/Homepage/LichSu'

function App() {
  return (
    <BrowserRouter>
      <Switch>
      
        <AuthTemplate exact path='/login' component={Login} />
        <UserTemplate exact path='/doam' component={DoAm} />
        <UserTemplate exact path='/maybom' component={MayBom} />
        <UserTemplate exact path='/lichsu' component={LichSu} />
        <UserTemplate exact path='/' component={homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
