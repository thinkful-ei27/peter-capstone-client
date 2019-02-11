import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BackArrow(props) {
  return (
    <div>
      <NavLink to={props.to}><FontAwesomeIcon pull={props.pull} icon="arrow-left"/></NavLink>
    </div>
  )
}
