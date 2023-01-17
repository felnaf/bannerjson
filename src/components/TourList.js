import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { tourGetData, isDeletePackage } from '../actions';
import { Link } from 'react-router-dom';

const TourList = () => {
  const dispatch = useDispatch();
  const { tourData } = useSelector((state) => state.postReducer);


  useEffect(() => {
    dispatch(tourGetData());
  }, []);
  // console.log(tourData);
  const tourList = tourData.map((d, index) => {
    // console.log(d.pictures);
    return (
      <div key={index}>
        <Card style={{ width: '18rem' }}>
          {d.pictures.map((da, index) => (
            // <div style ={{width:'100px',heigth:'100px'}}>
            <Card.Img variant="top" src={da} />
            // </div>
          ))}

          <Card.Body>
            <Card.Title>Name:{d.Name}</Card.Title>
            <Card.Text>Description:{d.description}</Card.Text>
            <Card.Text>Price:{d.price}</Card.Text>
            <Card.Text>StartDate:{d.date}</Card.Text>
            <Card.Text>EndDate:{d.enddate}</Card.Text>
            <Card.Text>Location:{d.loc}</Card.Text>
            <Card.Text>Rating:{d.value}</Card.Text>

            <Button as={Link} to={`/edit-package/${d.id}`} variant="primary">
              Edit{' '}
            </Button>
            <Button
              variant="danger"
              onClick={() => dispatch(isDeletePackage(d.id))}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  });

  return <div className="d-flex justify-content-around mt-5">{tourList}</div>;
};

export default TourList;
