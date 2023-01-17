import {
  getData,
  postData,
  deleteData,
  getDataById,
  editData,
  encrypt,
  decrypt,
} from '../service';

export const isGetData = () => async (dispatch) => {
  const { data } = await getData('RegisterForm');
  dispatch({
    type: 'GET_POST',
    payload: data,
  });
};

export const createData = (data) => async (dispatch) => {
  await postData('RegisterForm', data);
  dispatch(isGetData());
};

export const isDeleteData = (id) => async (dispatch) => {
  await deleteData(`RegisterForm/${id}`);
  dispatch(isGetData());
};

export const getEditData = (id) => async (dispatch) => {
  // console.log(id);
  const { data } = await getData(`RegisterForm/${id}`);
  // console.log(data);
  dispatch({
    type: 'EDIT_DATA',
    payload: data,
  });
};

export const editPost = (data, id) => async (dispatch) => {
  console.log(data);
  await editData(`RegisterForm/${id}`, data);
  dispatch(isGetData());
};

// Tour Package

export const tourGetData = () => async (dispatch) => {
  const { data } = await getData('TourPackage');
  dispatch({
    type: 'GET_DATA',
    payload: data,
  });
};

export const tourPost = (data) => async (dispatch) => {
  await postData('TourPackage', data);
  dispatch(tourGetData());
};

export const isDeletePackage = (id) => async (dispatch) => {
  await deleteData(`TourPackage/${id}`);
  dispatch(tourGetData());
};

export const getEditPackage = (id) => async (dispatch) => {
  const { data } = await getData(`TourPackage/${id}`);
  dispatch({
    type: 'EDIT_PACKAGE',
    payload: data,
  });
};

export const onEditPackage = (data, id) => async (dispatch) => {
  await editData(`TourPackage/${id}`, data);
  dispatch(tourGetData());
};

// Review
export const getReview = () => async (dispatch) => {
  const { data } = await getData('Review');
  dispatch({
    type: 'GET_REVIEW',
    payload: data,
  });
};

export const postReview = (data) => async (dispatch) => {
  await postData('Review', data);
  dispatch(getReview());
};

export const deleteReview = (id) => async (dispatch) => {
  await deleteData(`Review/${id}`);
  dispatch(getReview());
};

export const getReviewData = (id) => async (dispatch) => {
  const { data } = await getData(`Review/${id}`);
  dispatch({
    type: 'REVIEW_DATA',
    payload: data,
  });
};

export const editReviewData = (data, id) => async (dispatch) => {
  await editData(`Review/${id}`, data);
  dispatch(getReview());
};

// Syllabus

export const getSyllabus = () => async (dispatch) => {
  const { data } = await getData('Syllabus');
  dispatch({
    type: 'GET_SYLLABUS',
    payload: data,
  });
};

export const postSyllabus = (data) => async (dispatch) => {
  await postData('Syllabus', data);
  dispatch(getSyllabus());
};

export const deleteSyllabus = (id) => async (dispatch) => {
  await deleteData(`Syllabus/${id}`);
  dispatch(getSyllabus());
};

export const getSyllabusData = (id) => async (dispatch) => {
  const { data } = await getData(`Syllabus/${id}`);
  dispatch({
    type: 'EDIT_SYLLABUS',
    payload: data,
  });
};

export const editSyllabusData = (data, id) => async (dispatch) => {
  await editData(`Syllabus/${id}`, data);
  dispatch(getSyllabus());
};

// Login

export const loginGetData = (user, password, navigate) => async (dispatch) => {
  const { data } = await getData('Login');
  let item = false;
  console.log(data);

  if (
    data.find(
      (d) => d.user === user && decrypt(d.encyrptedPassword) === password
    )
  ) {
    item = true;
    sessionStorage.setItem('value', item);
    alert('login Success');
    navigate();
  } else {
    alert('invalid');
  }
  dispatch({
    type: 'LOGIN',
    payload: item,
  });
};

export const postLoginData = (values, navigate) => async (dispatch) => {
  const { data } = await getData('Login');

  if (data.find((d) => d.user === values.user)) {
    alert('User already exists');
  } else {
    let { password, ...restValues } = values;

    const encyrptedPassword = encrypt(password);

    restValues = { ...restValues, encyrptedPassword };

    await postData('Login', restValues);

    navigate('/login');
  }
};
