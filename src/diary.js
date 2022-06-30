const searchURL = new URLSearchParams(location.search);
const userURL = parseInt(searchURL.get('id'));
console.log(userURL);
let container="";
let arrDairy=[];

showDairy = (u) => {
    console.log(u);
    container.innerHTML = "";
    arrDairy=u.dairy;
    console.log(arrDairy);
    u.dairy.forEach(day => {
        let table = '';
        table += `
            <tr>
            <th>${day.date}</th>
            <th>${day.summery}</th>
            </tr>`
            container = document.querySelector('.usersTable');
        container.innerHTML += table;
    })
}
// day.summery.forEach(meal => {
//     <th>${meal}</th>

const fetchGet = () => {
    fetch('http://localhost:3000/users')
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            data.forEach(user => {
                if (user.id === userURL) {
                    showDairy(user);
                }
            });
        })
};
fetchGet();

const summaryDay = document.querySelector('#summaryDay');
const Meals = document.querySelector('#Meals');

let dairy = [];
let obj = {};
let food = "";
let addMeal = "";
let allFoods = "";
let save = "";
let content = "";
let dateBtn = "";

saveInJson = (obj) => {
    console.log(obj);
    arrDairy.push(obj);
    console.log(arrDairy);
    fetch(`http://localhost:3000/users/${userURL}`, {
        method: `PATCH`,
                   body: JSON.stringify({
                "dairy": arrDairy,
            }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => console.log(response));
    arrDairy=[];
}

summaryDay.onclick = (e) => { 
    e.preventDefault();
    dateBtn = document.createElement("input");
    dateBtn.type = "Date";
    dateBtn.value = new Date().toISOString().split("T")[0];
    addMeal = document.createElement('button');
    addMeal.innerHTML = "add meal";
    allFoods = document.createElement('div');
    content = document.createElement('div');
    addMeal.addEventListener("click", () => {
        food = document.createElement('textarea');
        food.addEventListener('change', () => {
            dairy.push(food.value);
        });
        content.append(food);
        allFoods.append(content, save);
    });
    save = document.createElement('button');
    save.innerHTML = "save";
    save.addEventListener("click", () => {
        Meals.innerHTML = "";
        obj = { date: dateBtn.value, summery: dairy }
        saveInJson(obj);
        dairy = [];
    });
    Meals.append(addMeal, dateBtn, allFoods);
}

    // addMeal.onclick = () => {
    //     food = document.createElement('textarea');
    //     allFoods.append(food);
    // }
    // btMeals.append(addMeal);


    
    // fetch(`http://localhost:3000/users/${user.id}`, {
    //         method: `PATCH`,
    //         body: JSON.stringify({
    //             "weight": user.weight,
    //         }),
    //         headers: { 'Content-type': `application/json; charset=UTF-8` },
    //     }).then((response) => {
    //         if (response.status === 200 && response.status !== undefined) {
    //             alert(`the meeting was successfully added`)
    //         }
    //         else {
    //             alert(response.message)
    //         }
    //     })



    // fetch("http://localhost:3000/users", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         title: "dairy",
    //         body: obj,
    //         userId: userURL
    //     }),
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // })
    //     .then(response => response.json())