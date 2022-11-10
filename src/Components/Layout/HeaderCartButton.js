import React, {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {

  const [btnIsBump, setBtnIsBump] = useState(false)

  const cartCtx = useContext(CartContext)

  const numberOfCarts = cartCtx.items.reduce((initialNumber,item) => {
    return initialNumber + item.amount;
  }, 0)

  const btnClass = `${classes.button} ${btnIsBump ? classes.bump : ''}` 

  useEffect(() => {
    if(cartCtx.items.length === 0){
      return;
    }
    setBtnIsBump(true);

    const timer = setTimeout(() => {
      setBtnIsBump(false);
    },300);

    return () => {
      clearTimeout(timer);
    };
  },[cartCtx.items])

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>your cart</span>
      <span className={classes.badge}>{numberOfCarts}</span>
    </button>
  );
}
export default HeaderCartButton;
