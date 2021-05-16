import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthTemplate } from './templates/AuthTemplate/AuthTemplate'
import Login from './pages/Auth/Login'
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Homepage from './pages/Homepage/homepage'
import DoAm from './pages/Homepage/DoAm'
import MayBom from './pages/Homepage/MayBom'
import LichSu from './pages/Homepage/LichSu'
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import HomeAdmin from './pages/Admin/HomeAdmin';
import QuanLyNongTrai from './pages/Admin/QuanLyNongTrai';
import QuanLyNongTraiChiTiet from './pages/Admin/QuanLyNongTraiChiTiet';

function App() {
  return (
    <BrowserRouter>
      <Switch>
      
        <AuthTemplate exact path='/login' component={Login} />
        <UserTemplate exact path='/doam' component={DoAm} />
        <UserTemplate exact path='/maybom' component={MayBom} />
        <UserTemplate exact path='/lichsu' component={LichSu} />
        <AdminTemplate exact path='/admin' component={HomeAdmin} />
				<AdminTemplate exact path='/admin/canhbaomayhu' component={HomeAdmin} />
				<AdminTemplate exact path='/admin/quanlynongtrai' component={QuanLyNongTrai} />
				<AdminTemplate exact path='/admin/quanlynongtrai/:farmId' component={QuanLyNongTraiChiTiet} />
        <UserTemplate exact path='/' component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
