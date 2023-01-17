import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';

import Banner from './Banner';
import RegisterForm from './RegisterForm';
import List from './List';
import TourForm from './TourForm';
import TourList from './TourList';

import '../assets/index.css';
import Review from './Review';
import ReviewList from './ReviewList';
import Syllabus from './Syllabus';
import SyllabusView from './SyllabusView';
import LoginRegister from './LoginRegister';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

// import { create } from 'yup/lib/Reference';

// export const Context = React.createContext();

const App = () => {
  // const [auth, setAuth] = useState(false);

  useEffect(() => {
    let auth_value = sessionStorage.getItem('value');

    if (auth_value === null) {
      auth_value = false;
      sessionStorage.setItem('value', auth_value);
    }
  }, []);

  return (
    // <Context.Provider value={[auth, setAuth]}>
    <div>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Banner />} />
          <Route path="/form" element={<RegisterForm />} />
          <Route path="/view" element={<List />} />
          <Route path="/tour" element={<TourForm />} />
          <Route path="/edit-form/:id" element={<RegisterForm />} />
          <Route path="/view-package" element={<TourList />} />
          <Route path="/edit-package/:id" element={<TourForm />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review-list" element={<ReviewList />} />
          <Route path="/edit-review/:id" element={<Review />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/syllabus-view" element={<SyllabusView />} />
          <Route path="/edit-syllabus/:id" element={<Syllabus />} />
        </Route>
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    // </Context.Provider>
  );
};

export default App;
