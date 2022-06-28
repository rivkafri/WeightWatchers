const allFoods = document.querySelector('#allFoods');
const summaryDay = document.querySelector('#summaryDay');
const btMeals=document.querySelector('#btMeals');
let addFood = null;
//const addMeal = null;
/* <textarea name="message" rows="10" cols="30"></textarea> */
summaryDay.onclick = (e) => {
    e.preventDefault();
    const addMeal = document.createElement('button');
    addMeal.innerHTML="to add meal";
    btMeals.append(addMeal);
    addMeal.addEventListener("click", () => {
        addFood = document.createElement('textarea');
        allFoods.append(addFood);
    });

}