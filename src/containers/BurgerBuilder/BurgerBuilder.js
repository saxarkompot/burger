import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary"
import Burger from "../../components/Layout/Burger/Burger";
import BuildControls from "../../components/Layout/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
}

class BurgerBuilder extends Component {
   // constructor(props){
   //    super(props);
   //    this.state = {...}
   // }
   state = {
      ingredients: {
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0
      },
      totalPrice: 4, //Object.keys(INGREDIENT_PRICES).map((n, i) => n[i] * this.ingredients[n]).reduce((acc, cur) => acc + cur, 0),
      purchasable: false
   }

   updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
         .map(igKey => {
            return ingredients[igKey]
         })
         .reduce((sum, el) => {
            return sum + el
         }, 0);
      this.setState({ purchasable: sum > 0 })
   }

   addIngredientHandler = (type) => {
      let oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      console.log(newPrice);
      this.setState({
         ingredients: updatedIngredients,
         totalPrice: newPrice
      });
      this.updatePurchaseState(updatedIngredients);
   }

   removeIngredientHandler = (type) => {
      let oldCount = this.state.ingredients[type];
      if (oldCount <= 0) {
         return;
      };
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      console.log(newPrice);
      this.setState({
         ingredients: updatedIngredients,
         totalPrice: newPrice
      });
      this.updatePurchaseState(updatedIngredients);
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      return (
         <Auxiliary>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
               ingredientAdded={this.addIngredientHandler}
               ingredientRemoved={this.removeIngredientHandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               purchasable={this.state.purchasable}
            />
         </Auxiliary>
      );
   }
};

export default BurgerBuilder;