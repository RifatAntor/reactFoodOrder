import {Fragment} from 'react'
import classes from './Header.module.css'
import mealImage from '../../Assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>reactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>

        <div>
            <img className={classes['main-image']} src={mealImage} alt = 'meals os table'/>
        </div>

    </Fragment>
    
  )
}

export default Header;