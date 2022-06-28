const searchURL = new URLSearchParams(location.search);
const userURL = parseInt(searchURL.get('id'));

const userContainer = document.querySelector('#userContainer');
let FirstName = "";
let LastName = "";
let Address = "";
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
    LastName = document.createElement('h4');
    Address = document.createElement('h4');
    Phone = document.createElement('h4');
    Email = document.createElement('h4');
    Height = document.createElement('h4');
    Weight = document.createElement('div');
    WeightStart = document.createElement('h4');
    StartBmi = document.createElement('h4');
    CurrentBmi = document.createElement('h4');
    WeightMeetings = document.createElement('h4');
    FirstName.innerHTML = u.firstName;
    LastName.innerHTML = u.lastName;
    Address.innerHTML = u.address.street + " " + u.address.number + " " + u.address.city;
    Phone.innerHTML = u.phone;
    Email.innerHTML = u.email;
    Height.innerHTML = u.height;
    WeightStart.innerHTML = "Start Weight: " + u.weight.start;
    StartBmi.innerHTML = "Start BMI: " + u.weight.start / (u.height * u.height);
    CurrentBmi.innerHTML = "CurrentBmi: " + u.weight.meetings[u.weight.meetings.length - 1].weight / (u.height * u.height);
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
    userContainer.append(FirstName, LastName, Address, Phone, Email, Height, WeightStart, StartBmi, CurrentBmi, WeightMeetings);

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
    Address.setAttribute('contenteditable', 'true');
    Phone.setAttribute('contenteditable', 'true');
    Email.setAttribute('contenteditable', 'true');
    Height.setAttribute('contenteditable', 'true');
    FirstName.style.color = 'gray';
    LastName.style.color = 'gray';
    Address.style.color = 'gray';
    Phone.style.color = 'gray';
    Email.style.color = 'gray';
    Height.style.color = 'gray';
}
const form = document.querySelector('#form');
form.onsubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries([...formData.entries()]);
    // let users = localStorage.getItem('users');
    // let usersArray = JSON.parse(users) || [];
    // usersArray.push(data);
    // localStorage.setItem('users', JSON.stringify(usersArray));
    // localStorage.setItem("currentUser", JSON.stringify(data));

}

const diary=document.querySelector('#diary');
diary.onclick=(e)=>{
    e.preventDefault();
    window.location.href = './diary.html?id=' + `${userURL}`;
}
