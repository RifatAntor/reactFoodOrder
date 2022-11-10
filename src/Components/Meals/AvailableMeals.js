import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItems from "./MealItems";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-gpost-default-rtdb.firebaseio.com/meals.json"
      );

      const loadedMeals = await response.json();
      const mealsData = [];

      for (const key in loadedMeals) {
        mealsData.push({
          id: key,
          name: loadedMeals[key].name,
          description: loadedMeals[key].description,
          price: loadedMeals[key].price,
        });
      }
      setMeals(mealsData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <h3>Loading...</h3>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <h3>{httpError}</h3>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItems
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
