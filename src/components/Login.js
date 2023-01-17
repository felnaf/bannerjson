import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginGetData } from '../actions';
import { Context } from './App';

const Login = () => {
  const { loginData } = useSelector((state) => state.postReducer);
  // let [auth, setAuth] = useContext(Context);

  // let auth = JSON.parse(sessionStorage.getItem('value'));

  const navigate = useNavigate();

  console.log(loginData);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(postLoginData(user));
  //   }, []);
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginGetData(user, password, () => navigate('/')));
  };

  return (
    <div>
      Login
      <form onSubmit={onFormSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label>password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
