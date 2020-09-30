import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary"
import Burger from "../../components/Layout/Burger/Burger";
import BuildControls from "../../components/Layout/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
   // constructor(props){
   //    super(props);
   //    this.state = {...}
   // }
   state = {
      ingredients: {
         salad: 1,
         bacon: 1,
         cheese: 2,
         meat: 2
      }
   }

   render() {
      return (
         <Auxiliary>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls />
         </Auxiliary>
      );
   }
};

export default BurgerBuilder;