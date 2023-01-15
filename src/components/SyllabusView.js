import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSyllabus, getSyllabus } from '../actions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const SyllabusView = () => {
  const dispatch = useDispatch();
  const { syllabusData } = useSelector((state) => state.postReducer);

//   console.log(syllabusData);

  useEffect(() => {
    dispatch(getSyllabus());
  }, []);

  return (
    <div className="syllabus-display">
      {syllabusData.map((data, index) => (
        <Card style={{ width: '18rem' }} key={index} className="mt-5">
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Text>Class:{data.Class}</Card.Text>
            <Card.Text>Subject:{data.sub}</Card.Text>
            <Card.Text>Term:{data.term}</Card.Text>
            <Card.Text>Duration:{data.duration}</Card.Text>
            <Card.Text>startdate:{data.startdate}</Card.Text>
            <Card.Text>enddate:{data.enddate}</Card.Text>
            <Card.Text>Type:{data.type}</Card.Text>

            <Button as={Link} to ={`/edit-syllabus/${data.id}`} variant="primary" >Edit</Button>

            <Button variant="danger"  onClick = {()=>dispatch(deleteSyllabus(data.id))} className='delete-btn'>Delete</Button>
          </Card.Body>
        </Card>
        // </div>
      ))}
    </div>
  );
};

export default SyllabusView;
