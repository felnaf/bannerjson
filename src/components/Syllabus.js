import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSyllabusData, postSyllabus, editSyllabusData } from '../actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const Syllabus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { editSyllabus } = useSelector((state) => state.postReducer);
  // console.log(editSyllabus);

  useEffect(() => {
    if (id) {
      dispatch(getSyllabusData(id));
    }
  }, []);

  return (
    <div className="mt-5 container">
      <h3>Syllabus</h3>
      <Formik
        initialValues={{
          Class: id ? editSyllabus.Class : '',
          sub: id ? editSyllabus.sub : '',
          term: id ? editSyllabus.term : '',
          duration: id ? editSyllabus.duration : '',
          startdate: id ? editSyllabus.startdate : '',
          enddate: id ? editSyllabus.enddate : '',
          type: id ? editSyllabus.type : '',
        }}
        validationSchema={Yup.object({
          Class: Yup.string().required('Required'),
          sub: Yup.string().required('Required'),
          term: Yup.string().required('Required'),
          duration: Yup.string().required('Required'),
          startdate: Yup.string().required('Required'),
          enddate: Yup.string().required('Required'),
          type: Yup.string().required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          if (id) {
            dispatch(editSyllabusData(values,id));
            // resetForm();
            navigate('/syllabus-view');
          } else {
            dispatch(postSyllabus(values));
            resetForm();
            navigate('/syllabus-view');
          }
        }}
        enableReinitialize
      >
        <Form>
          <div className="mb-4">
            <div>
              <label htmlFor="class">Class</label>
            </div>
            <Field name="Class" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="Class" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="sub">Subject</label>
            </div>
            <Field name="sub" type="text" />
            <div className="text-danger">
              <ErrorMessage name="sub" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="term">Term</label>
            </div>
            <Field name="term" type="text" />
            <div className="text-danger">
              <ErrorMessage name="term" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="duration">Duration</label>
            </div>
            <Field name="duration" type="text" />
            <div className="text-danger">
              <ErrorMessage name="duration" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="date">Start Date</label>
              <Field name="startdate" type="date" />
              <div className="text-danger">
                <ErrorMessage name="startdate" />
              </div>
              <label htmlFor="date" className="ml-5">
                End Date
              </label>
              <Field name="enddate" type="date" />

              <div className="text-danger">
                <ErrorMessage name="enddate" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label>Type</label>
            </div>
            <Field name="type" as="select" className="my-select form-control">
              <option value="">Select Type</option>
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
            </Field>
            <div className="text-danger">
              <ErrorMessage name="type" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Syllabus;
