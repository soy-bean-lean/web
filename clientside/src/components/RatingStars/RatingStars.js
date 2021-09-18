import ReactStars from 'react-rating-stars-component';
import React, { useState } from 'react';

const Rating = props => {
  const ratingChanged = newRating => {
    if (props.status == 'false') {
      props.getRating(newRating);
    }
  };

  if (props.status == 'false') {
    return (
      <>
        <ReactStars
          value={props.rate}
          count={5}
          onChange={ratingChanged}
          size={20}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="gold"
          color="gray"
        />
        ,
      </>
    );
  } else {
    return (
        <>
          <ReactStars
            edit={false}
            value={props.rate}
            count={5}
            onChange={ratingChanged}
            size={20}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="gold"
            color="gray"
          />
          ,
        </>
      );
  }
};

export default Rating;
