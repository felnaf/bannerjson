import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postLoginData } from '../actions';

const LoginRegister = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     dispatch(postLoginData(user));
  //   }, []);
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(postLoginData({ user, password }, () => navigate('/login')));
  };

  return (
    <div>
      LoginRegister
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

export default LoginRegister;
