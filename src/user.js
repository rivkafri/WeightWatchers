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
    FirstName.innerHTML = "FirstName: " + u.firstName;
    LastName.innerHTML = "LastName: " + u.lastName;
    Address.innerHTML = "Address: " + u.address.street + " " + u.address.number + " " + u.address.city;
    Phone.innerHTML = "Phone: " + u.phone;
    Email.innerHTML = "Email: " + u.email;
    Height.innerHTML = "Height: " + u.height;
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