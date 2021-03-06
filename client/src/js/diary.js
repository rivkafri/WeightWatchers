const searchURL = new URLSearchParams(location.search);
const userURL = searchURL.get('id');
console.log(userURL);
let container = "";
let arrDiary = [];

showDairy = (ARRDiary) => {
    console.log(ARRDiary);
    container.innerHTML = "";
    arrDiary = ARRDiary;
    console.log(arrDiary);
    if (ARRDiary.length > 0) {
        ARRDiary.forEach(day => {
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
    fetch(`http://localhost:8000/diary/${userURL}`)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            showDairy(data);
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

saveInJson = (dailyDiary) => {
    console.log(dailyDiary);
    fetch(`http://localhost:8000/diary/${userURL}`, {
        method: `POST`,
        body: JSON.stringify(
            dailyDiary),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => console.log(response));
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
        saveInJson({ date: dateBtn.value, summery: diary });
        diary = [];
    });
    Meals.append(addMeal, dateBtn, allFoods);
}