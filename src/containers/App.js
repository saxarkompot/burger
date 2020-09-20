import React, { PureComponent } from 'react';
//import Radium, { StyleRoot } from 'radium';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Axl from "../hoc/Axl";
import withClass from "../hoc/withClass";

class App extends PureComponent {
   constructor(props) {
      super(props);
      console.log('[App.js] Inside Constructor', props);
      this.state = {
         persons: [
            { id: "de3f", name: "Max", age: 28 },
            { id: "fed4", name: "Manu", age: 29 },
            { id: "fd4f", name: "Stephanie", age: 26 },
         ],
         showPersons: false
      }
   }

   componentWillMount() {
      console.log('[App.js] Inside componentWillMount')
   }

   componentDidMount() {
      console.log('[App.js] Inside componentDidMount')
   }

   // shouldComponentUpdate(nextProps, nextState) {
   //    console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
   //    return nextState.persons !== this.state.persons ||
   //       nextState.showPersons !== this.state.showPersons;
   // }

   componentWillUpdate(nextProps, nextState) {
      console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState)
   }

   componentDidUpdate(prevProps, prevState) {
      console.log('[UPDATE App.js] Inside componentDidUpdate', prevProps, prevState)
   }


   deletePersonHandler = (personIndex) => {
      const persons = [...this.state.persons];
      persons.splice(personIndex, 1);
      this.setState({
         persons: persons
      })
   }

   nameChangedHandler = (event, id) => {
      const personIndex = this.state.persons.findIndex(p => {
         return p.id === id;
      });

      const person = {
         ...this.state.persons[personIndex]
      };

      person.name = event.target.value;

      const persons = [...this.state.persons];
      persons[personIndex] = person;

      this.setState({ persons: persons })
   }

   togglePersonsHandler = () => {
      const doesShow = this.state.showPersons
      this.setState({
         showPersons: !doesShow
      })
   }

   render() {

      console.log("[App.js] Inside Render");

      let persons = null;

      if (this.state.showPersons) {
         persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
      }

      return (
         <Axl classes={classes.App}>
            <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
            <Cockpit
               appTitle={this.props.title}
               persons={this.state.persons}
               showPersons={this.state.showPersons}
               clicked={this.togglePersonsHandler}
            />
            {persons}
         </Axl>
      );
   }
}

export default withClass(App, classes.App);
