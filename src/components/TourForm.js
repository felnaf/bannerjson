import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// importing materialui
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

// importing datepicker
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getEditPackage, onEditPackage, tourPost } from '../actions';

//importing imageuploader
import ImageUploader from 'react-images-upload';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionTypes } from '@mui/base';
import { values } from 'lodash';

const TourForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [date, onChange] = useState(new Date());
  const [enddate, setenddate] = useState(new Date());
  const [pictures, setpictures] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const [errorRating, setErrorRating] = useState('');

  const { id } = useParams();

  const { editPackage } = useSelector((state) => state.postReducer);
  useEffect(() => {
    if (id) {
      dispatch(getEditPackage(id));
    }
  }, []);

  useEffect(() => {
    if (editPackage.value) {
      setValue(editPackage.value);
    }
  }, [editPackage]);

  useEffect(() => {
    setenddate(date);
  }, [date]);

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setpictures(pictureDataURLs);
  };
  const initial = {
    Name: id ? editPackage.Name : '',
    description: id ? editPackage.description : '',
    price: id ? editPackage.price : '',
    loc: id ? editPackage.loc : '',
    guide: id ? editPackage.guide : '',
  };
  // console.log('initial', initial);
  const validation = Yup.object({
    //name validation
    Name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required(' Name is Required'),

    //description validation
    description: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required(' Description is Required'),
    // price validation
    price: Yup.number()
      .required('Price is required')
      .test(
        'Is positive?',
        'ERROR: The number must be greater than 0!',
        (value) => value > 0
      ),
    loc: Yup.string().required('Location is Required'),
    // startDate: Yup.date().required('Date is Required'),s
    // endDate: Yup.date().required('Date is Required'),
    guide: Yup.string().required('Guide is Required'),
  });
  return (
    <div className="container mt-5">
      <h3>Tour Package Form</h3>
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          if (pictures === '') {
            if (!editPackage.pictures) setErrorImage('Required');
          }
          if (value === 0) {
            setErrorRating('Required');
          } else {
            values = {
              ...values,
              value: value,
              date: date,
              enddate: enddate,
              pictures: pictures,
            };
            if (id) {
              let img = pictures || editPackage.pictures;
              dispatch(onEditPackage({ ...values, pictures: img }, id));
              navigate('/view-package');
            } else {
              dispatch(tourPost(values));
              setValue(0);
              setErrorImage('');
              resetForm();
              navigate('/view-package');
            }
            // dispatch(tourPost(values));
            // setValue(0);
            // setErrorImage('');
            // resetForm();
            // navigate('/view-package');
          }
        }}
        enableReinitialize
      >
        <Form>
          <div className="mb-4">
            <div>
              <label htmlFor="Name">Name</label>
            </div>

            <Field name="Name" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="Name" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="description">Description</label>
            </div>

            <Field
              name="description"
              type="textarea"
              className="form-control"
            />
            <div className="text-danger">
              <ErrorMessage name="description" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="price">Price</label>
            </div>

            <Field name="price" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="price" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="loc">Location</label>
            </div>

            <Field name="loc" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="loc" />
            </div>
          </div>

          <div className="mb-4 date">
            <label htmlFor="startDate">Start Date</label>
            <div>
              <DatePicker
                onChange={onChange}
                value={date}
                minDate={new Date()}
              />
            </div>
            {/* <div className="text-danger">
              <ErrorMessage name="startDate" />
            </div> */}
            <label htmlFor="endDate">End Date</label>
            <div>
              <DatePicker
                onChange={setenddate}
                value={enddate}
                minDate={date}
              />
            </div>
            {/* <div className="text-danger">
              <ErrorMessage name="endDate" />
            </div> */}
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="loc">Guide</label>
            </div>

            <Field name="guide" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="guide" />
            </div>
          </div>
          <div>
            <div>
              <label>Image Upload</label>
            </div>
            {/* {id ? <img src={editPackage.pictures} width="100px" /> : ''} */}

            {editPackage?.pictures
              ? editPackage.pictures.map((pic) => <img src={pic} width={100} />)
              : null}
            <ImageUploader
              withIcon={true}
              value={pictures}
              withPreview={true}
              buttonText="Choose images"
              onChange={onDrop}
              imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
              maxFileSize={5242880}
            />
            <span className="text-danger">{errorImage}</span>
          </div>

          <div className="mb-4">
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
            <span className="text-danger">{errorRating}</span>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default TourForm;
