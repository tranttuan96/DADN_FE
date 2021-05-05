import { BrowserRouter, Switch } from 'react-router-dom'
import { AuthTemplate } from './templates/AuthTemplate/AuthTemplate'
import Login from './pages/Auth/Login'
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Homepage from './pages/Homepage/Homepage'
import DoAm from './pages/Homepage/DoAm'
import MayBom from './pages/Homepage/MayBom'
import LichSu from './pages/Homepage/LichSu'
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import HomeAdmin from './pages/Admin/HomeAdmin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
      
        <AuthTemplate exact path='/login' component={Login} />
        <UserTemplate exact path='/doam' component={DoAm} />
        <UserTemplate exact path='/maybom' component={MayBom} />
        <UserTemplate exact path='/lichsu' component={LichSu} />
        <AdminTemplate exact path='/admin' component={HomeAdmin} />
        <UserTemplate exact path='/' component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
