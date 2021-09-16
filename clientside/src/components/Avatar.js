import React, { useState, useContext } from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import userImage from 'assets/img/users/100_4.jpg';
import { AuthContext } from '../helpers/AuthContext';

const Avatar = ({
  rounded,
  circle,
  src,
  size,
  tag: Tag,
  className,
  style,
  ...restProps
}) => {
  const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  const { authState } = useContext(AuthContext);
  const profilePic =
    'http://localhost:3001/uploads/profileImages/' + authState.profileImage;

  return (
    <Tag
      src={profilePic}
      style={{ width: size, height: size, ...style }}
      className={classes}
      {...restProps}
    />
  );
};

Avatar.propTypes = {
  tag: PropTypes.component,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  style: PropTypes.object,
};

Avatar.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: true,
  size: 40,
  src: '',
  style: {},
};

export default Avatar;
