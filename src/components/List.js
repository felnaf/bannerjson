import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isGetData, isDeleteData } from '../actions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const List = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(isGetData());
  }, []);
  // console.log(data);
  const item = data.map((d, index) => {
    return (
      <div key={index}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={d.image} style={{ height: '200px' }} />
          <Card.Body>
            <Card.Title>{d.firstName}</Card.Title>
            <Card.Text>{d.email}</Card.Text>
            <Card.Text>{d.phoneNo}</Card.Text>
            <Card.Text>{d.address}</Card.Text>
            <Card.Text>{d.date}</Card.Text>

            <Button as={Link} to={`/edit-form/${d.id}`} variant="primary">
              Edit
            </Button>
            <Button
              variant="danger"
              className="ml-5"
              onClick={() => dispatch(isDeleteData(d.id))}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  });
  return <div className="d-flex justify-content-around mt-5 ">{item}</div>;
};

export default List;
