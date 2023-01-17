import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Context } from './App';

const PrivateRoute = () => {
  // let [auth, setAuth] = useContext(Context);
  let auth = JSON.parse(sessionStorage.getItem('value'));
  const navigate = useNavigate();
  return auth ? <Outlet /> : navigate('/login');
};
export default PrivateRoute;
