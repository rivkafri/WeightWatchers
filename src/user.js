const searchURL = new URLSearchParams(location.search);
const userURL = parseInt(searchURL.get('id'));
// let currentUser;

const userContainer = document.querySelector('#userContainer');
let FirstName = "";
let LastName = "";
let Street = "";
let NumberHouse = "";
let City = "";
let Phone = "";
let Email = "";
let Height = "";
let Weight = "";
let WeightStart = "";
let StartBmi = "";
let CurrentBmi = "";
let WeightMeetings = "";
let containerMeetings = "";

const createUser = (u) => {
    userContainer.innerHTML = "";
    FirstName = document.createElement('h4');
    FirstName.style = "margin-top:0";
    LastName = document.createElement('h4');
    LastName.style = "margin-top:0";
    Street = document.createElement('h4');
    Street.style = "margin-top:0";
    NumberHouse = document.createElement('h4');
    NumberHouse.style = "margin-top:0";
    City = document.createElement('h4');
    City.style = "margin-top:0";
    Phone = document.createElement('h4');
    Phone.style = "margin-top:0";
    Email = document.createElement('h4');
    Email.style = "margin-top:0";
    Height = document.createElement('h4');
    Height.style = "margin-top:0";
    Weight = document.createElement('div');
    Weight.style = "margin-top:0";
    WeightStart = document.createElement('h4');
    WeightStart.style = "margin-top:0";
    StartBmi = document.createElement('h4');
    StartBmi.style = "margin-top:0";
    CurrentBmi = document.createElement('h4');
    CurrentBmi.style = "margin-top:0";
    WeightMeetings = document.createElement('h4');
    WeightMeetings.style = "margin-top:0";
    FirstName.innerHTML = u.firstName;
    LastName.innerHTML = u.lastName;
    Street.innerHTML = u.address.street;
    NumberHouse.innerHTML = u.address.number;
    City.innerHTML = u.address.city;
    Phone.innerHTML = u.phone;
    Email.innerHTML = u.email;
    Height.innerHTML = u.height;
    WeightStart.innerHTML = "Start Weight: " + u.weight.start;
    StartBmi.innerHTML = "Start BMI: " + u.weight.start / (u.height * u.height);
    CurrentBmi.innerHTML = "CurrentBmi: " + u.weight.meetings[u.weight.meetings.length - 1].weight / (u.height ** 2);
    WeightMeetings.innerHTML = "Meetings: ";
    u.weight.meetings.forEach(m => {
        let table = '';
        table += `
        <tr>
            <th>${m.date}</a></th>
            <th>${m.weight}</th>
        </tr>`
        containerMeetings = document.querySelector('.userTable');
        containerMeetings.innerHTML += table;
    })
    userContainer.style.display = "flex";
    userContainer.style.flexDirection = "column";
    userContainer.style.padding = "10px";
    userContainer.style.alignItems = "start";
    userContainer.append(FirstName, LastName, Street, NumberHouse, City, Phone, Email, Height, WeightStart, StartBmi, CurrentBmi, WeightMeetings);
}

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
        users.forEach(user => {
            if (user.id === userURL) {
                console.log(user);
                // currentUser = user;
                createUser(user);
            }
        })
    }
}

const Edit = document.querySelector('#Edit');
Edit.onclick = (e) => {
    e.preventDefault();
    FirstName.setAttribute('contenteditable', 'true');
    LastName.setAttribute('contenteditable', 'true');
    Street.setAttribute('contenteditable', 'true');
    NumberHouse.setAttribute('contenteditable', 'true');
    City.setAttribute('contenteditable', 'true');
    Phone.setAttribute('contenteditable', 'true');
    Email.setAttribute('contenteditable', 'true');
    Height.setAttribute('contenteditable', 'true');
    FirstName.style.color = 'gray';
    LastName.style.color = 'gray';
    Street.style.color = 'gray';
    NumberHouse.style.color = 'gray';
    City.style.color = 'gray';
    Phone.style.color = 'gray';
    Email.style.color = 'gray';
    Height.style.color = 'gray';
}
const form = document.querySelector('#form');
form.onsubmit = (e) => {
    e.preventDefault();
    console.log(FirstName.innerHTML);
    saveInJson();
}

saveInJson = () => {
    fetch(`http://localhost:3000/users/${userURL}`, {
        method: `PATCH`,
        body: JSON.stringify({
            "firstName": FirstName.innerHTML,
            "lastName": LastName.innerHTML,
            "address.city": City.innerHTML,
            "address.street": Street.innerHTML,
            "address.number": NumberHouse.innerHTML,
            "phone": Phone.innerHTML,
            "email": Email.innerHTML,
            "height": Height.innerHTML,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => console.log(response));
}


const diary = document.querySelector('#diary');
diary.onclick = (e) => {
    e.preventDefault();
    window.location.href = './diary.html?id=' + `${userURL}`;
}
