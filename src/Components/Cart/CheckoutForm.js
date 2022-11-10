import { useRef, useState } from "react";
import classes from "./CheckoutForm.module.css";

const isEmpty = (value) => value.trim() === "";

const CheckoutForm = (props) => {
  const [nameValidity, setNameValidity] = useState(true);
  const [addressValidity, setAddressValidity] = useState(true);
  const nameInputRef = useRef();
  const addressInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);

    setNameValidity(enteredNameIsValid);
    setAddressValidity(enteredAddressIsValid);

    const formIsValid = enteredNameIsValid && enteredAddressIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${nameValidity ? "" : classes.invalid}`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!nameValidity && <p>Enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          addressValidity ? "" : classes.invalid
        }`}
      >
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!addressValidity && <p>Enter a valid adrress</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
