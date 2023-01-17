import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {
  isGetData,
  tourGetData,
  postReview,
  getReviewData,
  getEditPackage,
  editReviewData,
} from '../actions';

//materialui
// import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';

const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.postReducer);
  const { tourData } = useSelector((state) => state.postReducer);
  const { editReview } = useSelector((state) => state.postReducer);

  const { id } = useParams();

  //   console.log(data);
  // console.log(tourData);
  // console.log(editReview);

  const [rating, setRating] = useState(0);
  const [errorRating, setErrorRating] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getReviewData(id));
    } else {
      setRating(0);
    }
  }, [id]);

  useEffect(() => {
    if (editReview && id) {
      setRating(editReview.rating);
    }
  }, [editReview]);

  useEffect(() => {
    dispatch(isGetData());
    dispatch(tourGetData());
  }, []);

  const initial = {
    user: id ? editReview.user : '',
    tour: id ? editReview.tour : '',
    review: id ? editReview.review : '',
  };
  const validation = Yup.object({
    user: Yup.string().required('Required'),
    tour: Yup.string().required('Required'),
    review: Yup.string().required('Required'),
  });
  // const list =data.firtName.map((e)=>(

  // ))
  return (
    <Formik
      initialValues={initial}
      validationSchema={validation}
      onSubmit={(values, { resetForm }) => {
        if (rating === 0) {
          setErrorRating('Required');
        } else {
          values = { ...values, rating };
        }

        if (id) {
          dispatch(editReviewData({ ...values }, id));
          navigate('/review-list');
        } else {
          dispatch(postReview(values));
          setErrorRating('');
          resetForm();
          navigate('/review-list');
        }
      }}
      enableReinitialize
    >
      <Form>
        <div className="container mt-5">
          <h3>Review</h3>

          <div className="mb-4">
            <div>
              {' '}
              <label htmlFor="user">User</label>
            </div>

            <Field name="user" as="select" className="my-select form-control">
              <option value="">Select User</option>
              {data.map((e, index) => {
                return (
                  <option value={e.email} key={index}>
                    {e.firstName}
                  </option>
                );
              })}
            </Field>
            <div className="text-danger">
              <ErrorMessage name="user" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="tour">Tour Package</label>
            </div>

            <Field name="tour" as="select" className="my-select form-control">
              <option value="">Package</option>
              {tourData.map((p, index) => {
                return (
                  <option value={p.Name} key={index}>
                    {p.Name}
                  </option>
                );
              })}
            </Field>
            <div className="text-danger">
              <ErrorMessage name="tour" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="review">Review</label>
            </div>
            <Field
              name="review"
              as="textarea"
              className="form-textarea form-control"
            />
            <div className="text-danger">
              <ErrorMessage name="review" />
            </div>
          </div>

          <div className="mb-4">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            {/* {errorRating && rating === 0 ? (
              <span className="text-danger">Rating required</span>
            ) : null} */}
            <div className="text-danger">
              <span>{errorRating}</span>

              {/* <ErrorMessage name="simple-controlled" /> */}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default Review;
