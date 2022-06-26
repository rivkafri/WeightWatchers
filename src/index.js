let usersList = new Array();
setUsersList = () => {
    // xhr to bring the data from json file.
    let users;
    const Request = new XMLHttpRequest();
    Request.open('GET', 'users.json');
    Request.send();
    Request.onload = () => {
        if (Request.status != 200) {
            alert(`Error ${Request.status}: ${Request.statusText}`);
        } else {
            users = JSON.parse(Request.responseText).users;
            console.log(users);
            users.forEach(u => {
                usersList.push(u);
            })
            usersList.forEach(user => {
                printUser(user);
            });

        }
    }
    return usersList;
}

//byWeight
byWeightFunc = (arr, min, max) => {
    console.log(arr);
    const ans = arr.filter(f => (f.weight.start > min) && (f.weight.start < max));
    console.log(ans);
    return ans;
}

//byProcess
byProcessFunc = (arr) => {
    console.log("byProcessFunc");
    const ans = arr.filter(f => f.weight.start > (f.weight.meetings[f.weight.meetings.length - 1].weight));
    console.log(ans);
    return ans;
}

//byBMI
byBMIFunc = (arr, bmiMin, bmiMax) => {
    const ans = arr.filter(f => (f.weight.start / (f.height * f.height) > bmiMin) &&
        (f.weight.start / (f.height * f.height) < bmiMax));
    return ans;
}

//byCity
byCityFunc = (arr, city) => {
    const ans = arr.filter(f => f.address.city === city);
    return ans;
}

//search
searchFunc = (arr, inputToSearch) => {
    const ans = arr.filter(user => user.id === inputToSearch ||
        user.firstName === inputToSearch || user.lastName === inputToSearch ||
        user.address.city === inputToSearch || user.address.street === inputToSearch ||
        user.phone === inputToSearch ||
        user.email === inputToSearch || user.height === inputToSearch);
    return ans;
}


let container = "";

//print one user
const printUser = (user) => {
    console.log(user);
    //check the BMI
    let bmi = user.weight.meetings[user.weight.meetings.length - 1].weight / (user.height * user.height);
    let color = "green";
    if (bmi > user.weight.meetings[user.weight.meetings.length - 2].weight / (user.height * user.height))
        color = "red";
    let table = '';
    table += `
        <tr>
            <th><a href="../user.html?id=${user.id}">${user.firstName + ' ' + user.lastName}</a></th>
            <th style="color:${color}" >${bmi}</th>
        </tr>`
    container = document.querySelector('.usersTable');
    container.innerHTML += table;
}


//send to print
const sendToPrint = (arr) => {
    console.log("sendToPrint");
    container.innerHTML = "";
    arr.forEach((u) => {
        printUser(u);
    });
    for (let index = 0; index < boolSearch.length; index++) {
        boolSearch[index] = false;
    }
    currentUsers = list;
}

//search & filter
const byWeight = document.querySelector('#byWeight');
const byProcess = document.querySelector('#byProcess');
const byBMI = document.querySelector('#byBMI');
const byCity = document.querySelector('#byCity');
const inputToSearch = document.querySelector('#inputSearch');
const search = document.querySelector('#search');

const weightInputs = document.querySelector('#weightInputs');
let inputMinWeight = null;
let inputMaxWeight = null;
let weightDiv = null;
let labelBigger = null;
let labelLower = null;
const boolSearch = [false, false, false, false];

byWeight.onchange = (e) => {
    e.preventDefault();
    boolSearch[0] = true;
    inputMinWeight = document.createElement('input');
    inputMaxWeight = document.createElement('input');
    labelBigger = document.createElement('label');
    labelLower = document.createElement('label');
    inputMinWeight.type = "text";
    inputMaxWeight.type = "text";
    labelBigger.innerHTML = "bigger than:";
    labelLower.innerHTML = "lower than:";
    weightDiv = document.createElement('div');
    weightDiv.append(labelBigger, inputMinWeight, labelLower, inputMaxWeight);
    weightInputs.append(weightDiv);
}

byProcess.onchange = (e) => {
    e.preventDefault();
    boolSearch[1] = true;
}
const bmiInputs = document.querySelector('#bmiInputs');
let minBmi = null;
let maxBmi = null;
let BMIDiv = null;
let labelBigger2 = null;
let labelLower2 = null;
byBMI.onchange = (e) => {
    e.preventDefault();
    boolSearch[2] = true;
    minBmi = document.createElement('input');
    maxBmi = document.createElement('input');
    labelBigger2 = document.createElement('label');
    labelLower2 = document.createElement('label');
    minBmi.type = "text";
    maxBmi.type = "text";
    labelBigger2.innerHTML = "bigger than:";
    labelLower2.innerHTML = "lower than:";
    BMIDiv = document.createElement('div');
    BMIDiv.append(labelBigger2, minBmi, labelLower2, maxBmi);
    bmiInputs.append(BMIDiv);
}


const cityInput = document.querySelector('#cityInput');
let city = null;
byCity.onchange = (e) => {
    e.preventDefault();
    boolSearch[3] = true;
    city = document.createElement('input');
    city.type = "text";
    cityInput.append(city);
}

let list = setUsersList();
console.log(list);
let currentUsers = list;
console.log(currentUsers);
//
let flag = true;
search.onclick = (e) => {
    e.preventDefault();
    for (let i = 0; i < boolSearch.length; i++) {
        if (boolSearch[i]) {
            switch (i) {
                case 0: currentUsers = byWeightFunc(currentUsers, parseInt(inputMinWeight.value), parseInt(inputMaxWeight.value));
                    break;
                case 1: currentUsers = byProcessFunc(currentUsers);
                    break;
                case 2: currentUsers = byBMIFunc(currentUsers, parseInt(minBmi.value), parseInt(maxBmi.value));
                    break;
                case 3: currentUsers = byCityFunc(currentUsers, city.value);
                    break;
            }
        }
    }
    sendToPrint(currentUsers);
    if (inputToSearch.value != "")
        sendToPrint(searchFunc(list, inputToSearch.value));
}
//
const reset = document.querySelector('#reset');
reset.onclick = (e) => {
    e.preventDefault();
    byWeight.checked = false;
    byProcess.checked = false;
    byBMI.checked = false;
    byCity.checked = false;
    weightInputs.innerHTML = "";
    bmiInputs.innerHTML = "";
    cityInput.innerHTML = "";
    sendToPrint(list);
}

//new meeting
const newMeeting = document.querySelector('#newMeeting');
newMeeting.onclick = (e) => {
    e.preventDefault();

}
