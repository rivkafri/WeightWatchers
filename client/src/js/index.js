let usersList = new Array();
setUsersList = () => {
    // xhr to bring the data from json file.
    let users;
    const Request = new XMLHttpRequest();
    Request.open('GET', 'http://localhost:8000/users');
    Request.send();
    Request.onload = () => {
        if (Request.status != 200) {
            alert(`Error ${Request.status}: ${Request.statusText}`);
        } else {
            users = JSON.parse(Request.responseText);
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

// //////////////search/////////////
// //byWeight
// byWeightFunc = (arr, min, max) => {
//     const ans = arr.filter(f => (f.weight.start > min) && (f.weight.start < max));
//     console.log(ans);
//     return ans;
// }

// //byProcess
// byProcessFunc = (arr) => {
//     console.log('byProcessFunc');
//     const ans = arr.filter(f => f.weight.start > (f.weight.meetings[f.weight.meetings.length - 1].weight));
//     console.log(ans);
//     return ans;
// }

// //byBMI
// byBMIFunc = (arr, bmiMin, bmiMax) => {
//     const ans = arr.filter(f => (f.weight.start / (f.height * f.height) > bmiMin) &&
//         (f.weight.start / (f.height * f.height) < bmiMax));
//     return ans;
// }

// //byCity
// byCityFunc = (arr, city) => {
//     const ans = arr.filter(f => f.address.city === city);
//     return ans;
// }

// //searchAll
// searchFunc = (arr, inputToSearch) => {
//     const ans = arr.filter(user => user.id === inputToSearch ||
//         user.firstName === inputToSearch || user.lastName === inputToSearch ||
//         user.address.city === inputToSearch || user.address.street === inputToSearch ||
//         user.phone === inputToSearch ||
//         user.email === inputToSearch || user.height === inputToSearch);
//     return ans;
// }

let container = '';
let USER = {};
//print one user
const printUser = (user) => {
    USER = user;
    //check the BMI
    let bmi = user.weight.start / (user.height ** 2);
    let color = "green";
    if (bmi > 25)
        color = "red";
    let table = '';
    table += `
        <tr>
            <th><a href="../html/user.html?id=${user._id}">${user.firstName + ' ' + user.lastName}</a></th>
            <th style="color:${color}" >${bmi}</th>
            <th><button id="deleteBtn" type="button">delete</button><th> 
        </tr>`
    container = document.querySelector('.usersTable');
    container.innerHTML += table;

    deleteBtn.addEventListener('click', () => {
        console.log(user._id);
        const id = user._id;
        fetch(`http://localhost:8000/users/${id}`,
            {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => console.log(response));
    });
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

// byProcess.onchange = (e) => {
//     e.preventDefault();
//     boolSearch[1] = true;
// }
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
let currentUsers = list;

//
let searches = ['', '', '', '', '', ''];

let flag = true;
search.onclick = (e) => {
    e.preventDefault();
    for (let i = 0; i < boolSearch.length; i++) {
        if (boolSearch[i]) {
            switch (i) {
                case 0:
                    // currentUsers = byWeightFunc(currentUsers, parseInt(inputMinWeight.value), parseInt(inputMaxWeight.value));
                    searches[1] = inputMinWeight.value;
                    searches[2] = inputMaxWeight.value;
                    break;
                case 1:
                    // currentUsers = byProcessFunc(currentUsers);
                    break;
                case 2:
                    // currentUsers = byBMIFunc(currentUsers, parseInt(minBmi.value), parseInt(maxBmi.value));
                    searches[3] = minBmi.value;
                    searches[4] = maxBmi.value;
                    break;
                case 3:
                    // currentUsers = byCityFunc(currentUsers, city.value);
                    searches[5] = city.value;
                    break;
            }
        }
    }
    //sendToPrint(currentUsers);
    if (inputToSearch.value != "") {
        // currentUsers = searchFunc(list, inputToSearch.value);
        searches[0] = inputToSearch.value;
        //  sendToPrint(currentUsers);
    }
    console.log(searches);
    console.log(boolSearch);
    getFromServer(searches);
    funcReset();
}

const getFromServer = (searches) => {
    let a = 'aa'
    fetch(`http://localhost:8000/users/${a}}`, {
        method: `POST`,
        body: JSON.stringify(
            searches
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        sendToPrint(data);
    })
}

//reset
const reset = document.querySelector('#reset');
const funcReset = () => {
    console.log('funcReset');
    byWeight.checked = false;
    byProcess.checked = false;
    byBMI.checked = false;
    byCity.checked = false;
    weightInputs.innerHTML = "";
    bmiInputs.innerHTML = "";
    cityInput.innerHTML = "";
}
reset.onclick = (e) => {
    e.preventDefault();
    funcReset();
    sendToPrint(list);
}

const newMeeting = document.querySelector('#newMeeting');
newMeeting.onclick = (e) => {
    e.preventDefault();
    window.location.href = 'meeting.html';
}
// creat new user
const form = document.querySelector('#form');
form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries([...formData.entries()]);
    const newUser = {
        firstName: data.firstName, lastName: data.lastName,
        address: { city: data.city, street: data.street, number: data.BuildingNumber },
        phone: data.phone, email: data.email, height: data.height,
        weight: { start: data.weight, meetings: [] }, diary: []
    };
    console.log(newUser);
    fetch(`/users`, {
        method: `POST`,
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
