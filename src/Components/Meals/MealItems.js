import React, {useContext} from "react";
import classes from './MealItems.module.css'
import MealItemsForm from "./MealItemsForm";
import CartContext from "../../store/cart-context";

function MealItems(props) {

  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })

  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>   
      <div>
        <MealItemsForm id = {props.id} onAddToCart={addToCartHandler}/>

      </div>
    </li>
  );
}

export default MealItems;

