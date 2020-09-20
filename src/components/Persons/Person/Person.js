import React, { Component } from 'react';
import classes from './Person.module.css';
import withClass from "../../../hoc/withClass";
import Axl from "../../../hoc/Axl";

class Person extends Component {
   constructor(props) {
      super(props);
      console.log('[Person.js] Inside Constructor', props);
   }

   componentWillMount() {
      console.log('[Person.js] Inside componentWillMount')
   }

   componentDidMount() {
      console.log('[Person.js] Inside componentDidMount')
   }

   render() {
      console.log('[Person.js] Inside Render')
      return (
         <Axl>
            <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p>{this.props.children}</p>
            <input type="text" onChange={this.props.changed} value={this.props.name} />
         </Axl>
      )
   };
}

export default withClass(Person, classes.Person);
