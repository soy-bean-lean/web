import classNames from 'classnames';
import React from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import PropTypes from 'utils/propTypes';
import Avatar from '../Avatar';
import { AuthContext } from "../helpers/AuthContext";

const AvatarCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  children,
  className,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme-left', className);
  const { authState } = useContext(AuthContext); 
  const profilePic="http://localhost:3001/uploads/profileImages/" + authState.profileImage;
  

  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        <Avatar src={profilePic} size={avatarSize} className="mb-3" />
        <CardTitle>{title}</CardTitle>
        {!!subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        {!!text && (
          <CardText>
            <small>{text}</small>
          </CardText>
        )}
        {children}
      </CardBody>
    </Card>
  );
};

AvatarCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

AvatarCard.defaultProps = {
  avatarSize: 80,
};

export default AvatarCard;
