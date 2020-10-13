import React from 'react';
import classes from "./NavigationItem.module.css";

const navigatiomItem = (props) => (
   <li className={classes.NavigationItem}>
      <a
         href={props.lonk}
         className={props.active ? classes.active : null}
      >
         {props.children}
      </a>
   </li>
);

export default navigatiomItem;