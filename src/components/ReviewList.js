import React, { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { getReview, deleteReview, getReviewData } from '../actions';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ReviewList = () => {
  const dispatch = useDispatch();
  const { reviewData } = useSelector((state) => state.postReducer);
  //   const {}

  useEffect(() => {
    dispatch(getReview());
    // dispatch(getReviewData());
  }, []);

  //   console.log(reviewData);

  return (
    <div className="review-display mt-5">
      {reviewData.map((d, index) => (
        <Card style={{ width: '18rem' }} key={index}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Text>User:{d.user}</Card.Text>
            <Card.Text>Package:{d.tour}</Card.Text>
            <Card.Text>Review:{d.review}</Card.Text>
            {/* <Card.Text>Rating:{d.rating}star</Card.Text> */}
            <Card.Text>
              Rating:
              <Rating
                name="simple-controlled"
                value={d.rating}
                //   onChange={(event, newValue) => {
                //     setRating(newValue);
                //   }}
              />
            </Card.Text>
            <Button as={Link} to={`/edit-review/${d.id}`} variant="primary">
              Edit
            </Button>
            <Button
              variant="danger"
              className="delete-btn"
              onClick={() => {
                dispatch(deleteReview(d.id));
              }}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;
