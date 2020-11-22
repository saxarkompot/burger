import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
   }

   componentDidMount() {
      axios.get('https://react-my-burger-dcedc.firebaseio.com/ingredients.json')
         .then(response => {
            this.setState({ ingredients: response.data })
         })
         .catch(error => {
            this.setState({ error: true })
         })
   }

   updatePurchaseState(ingredients) {
      const sum = Object.values(ingredients)
         // .map(igKey => {
         //    return ingredients[igKey]
         // })
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

   // totalPriceRender() {
   //    const newPrice = Object.keys(INGREDIENT_PRICES)
   //       .map((n, i) => INGREDIENT_PRICES[n] * this.state.ingredients[n])
   //       .reduce((acc, cur) => acc + cur, 0);
   //    this.setState({
   //       totalPrice: newPrice
   //    })
   // }

   // componentDidMount() {
   //    this.totalPriceRender();
   // }

   purchaseHandler = () => {
      this.setState({ purchasing: true })
   }

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false })
   }

   purchaseContinueHandler = () => {
      this.setState({ loading: true });
      const order = {
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
         customer: {
            name: 'Dimasik',
            address: {
               street: "Vishnova 1",
               zipCode: '41351',
               country: 'Hungry'
            },
            email: 'teterev@teterev.com'
         },
         deliveryMethod: 'fastest'
      };
      axios.post('/orders.json', order)
         .then(response => {
            this.setState({ loading: false, purchasing: false });
         })
         .catch(error => {
            this.setState({ loading: false, purchasing: false });
         });
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary = null;
      let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
      if (this.state.ingredients) {
         burger = (
            <Auxiliary>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemoved={this.removeIngredientHandler}
                  disabled={disabledInfo}
                  price={this.state.totalPrice}
                  purchasable={this.state.purchasable}
                  ordered={this.purchaseHandler}
               />
            </Auxiliary>
         );
         orderSummary = <OrderSummary
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice} />;
      }
      if (this.state.loading) {
         orderSummary = <Spinner />
      }

      return (
         <Auxiliary>
            <Modal
               show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </Auxiliary>
      );
   }
};

export default withErrorHandler(BurgerBuilder, axios);