import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createData, getEditData, editPost } from '../actions';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploader from 'react-images-upload';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { editData } = useSelector((state) => state.postReducer);
  // console.log(initial);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getEditData(id));
    }
  }, []);
  const [image, setImage] = useState('');

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImage(pictureDataURLs[0]);
  };

  const initial = {
    firstName: id ? editData.firstName : '',
    email: id ? editData.email : '',
    phoneNo: id ? editData.phoneNo : '',
    address: id ? editData.address : '',
    date: id ? editData.date : '',
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validation = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('FirstName is Required'),

    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    address: Yup.string()
      .min(15, 'Must be 15 characters ')
      .max(30, 'too long')
      .required('Address Required'),
    date: Yup.date().required('Required'),
    // date: Yup.date().min(new Date()).required('Required'),
    // pic: Yup.string().required('must required'),
  });

  return (
    <div className="container mt-5">
      <h3>Register Form </h3>
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          values = {
            ...values,
            image,
          };
          if (id) {
            let img = image ? image : editData.image;
            // console.log(img);
            dispatch(editPost({ ...values, image: img }, id));
            navigate('/view');
          } else {
            dispatch(createData(values));
            navigate('/view');
            resetForm();
          }
        }}
        enableReinitialize
      >
        <Form>
          <div className="mb-4">
            <div>
              <label htmlFor="firstName">First Name</label>
            </div>

            <Field name="firstName" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="firstName" />
            </div>
          </div>

          {/* <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" /> */}
          <div className="mb-4">
            <div>
              {' '}
              <label htmlFor="email">Email Address</label>
            </div>

            <Field name="email" type="email" className="form-control" />
            <div className="text-danger">
              {' '}
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="number">Phone No.</label>
            </div>
            <Field name="phoneNo" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="phoneNo" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="date">Date Of Birth</label>
            </div>
            <Field name="date" type="date" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="date" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="address"> Address</label>
            </div>

            <Field name="address" as="textarea" className="form-textarea form-control" />
            <div className="text-danger">
              <ErrorMessage name="address" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="image">Photo</label>
            </div>
            {id ? <img src={editData.image} width="100px" /> : null}
            <ImageUploader
              withIcon={true}
              singleImage={true}
              value={image}
              buttonText="Choose images"
              withPreview={true}
              onChange={onDrop}
              imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
              maxFileSize={5242880}
            />
          </div>
          {/* <label htmlFor="image">Photo</label>
          <Field name="pic" type="input" className="form-control" />
          <ErrorMessage name="pic" /> */}

          <button type="submit" className="btn btn-primary mt-5">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
