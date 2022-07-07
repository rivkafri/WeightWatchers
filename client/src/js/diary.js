const searchURL = new URLSearchParams(location.search);
const userURL = parseInt(searchURL.get('id'));
console.log(userURL);
let container = "";
let arrDiary = [];

showDairy = (u) => {
    console.log(u);
    container.innerHTML = "";
    arrDiary = u.diary;
    console.log(arrDiary);
    if (arrDiary.length > 0) {
        u.diary.forEach(day => {
            let table = '';
            table += `
                <tr>
                <th>${day.date}</th>
                <th>${day.summery}</th>
                <th>${day.summery.length}</th>
                </tr>`
            container = document.querySelector('.usersTable');
            container.innerHTML += table;
        })
    }
}

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

let diary = [];
let obj = {};
let food = "";
let addMeal = "";
let allFoods = "";
let save = "";
let content = "";
let dateBtn = "";

saveInJson = (obj) => {
    console.log(obj);
    arrDiary.push(obj);
    console.log(arrDiary);
    fetch(`http://localhost:3000/users/${userURL}`, {
        method: `PATCH`,
        body: JSON.stringify({
            "diary": arrDiary,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => console.log(response));
    arrDairy = [];
}

summaryDay.onclick = (e) => {
    e.preventDefault();
    dateBtn = document.createElement('input');
    dateBtn.type = "Date";
    dateBtn.value = new Date().toISOString().split('T')[0];
    addMeal = document.createElement('button');
    addMeal.innerHTML = "add meal";
    allFoods = document.createElement('div');
    content = document.createElement('div');
    addMeal.addEventListener("click", () => {
        food = document.createElement('textarea');
        food.addEventListener('change', () => {
            diary.push(food.value);
        });
        content.append(food);
        allFoods.append(content, save);
    });
    save = document.createElement('button');
    save.innerHTML = "save";
    save.addEventListener("click", () => {
        Meals.innerHTML = "";
        obj = { date: dateBtn.value, summery: diary }
        saveInJson(obj);
        diary = [];
    });
    Meals.append(addMeal, dateBtn, allFoods);
}