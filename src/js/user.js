const searchURL = new URLSearchParams(location.search);
const userURL = parseInt(searchURL.get('id'));
const form = document.querySelector('#form');
let container = '';
let containerMeetings = '';

const printUser = (user) => {
    console.log(user);
    let CurrentBmi = '';
    if (user.weight.meetings.length === 0) {
        CurrentBmi = user.weight.start / (user.height ** 2);
    }
    else {
        CurrentBmi = user.weight.meetings[user.weight.meetings.length - 1].weight / (user.height ** 2);
    }
    let table = '';
    table += `
            <tr><td><input id='fName' minlength='2' type='text' value='${user.firstName}' readonly required /></td></tr>
            <tr><td><input id='lName' minlength='2' type='text' value='${user.lastName}' readonly required/></td> </tr>
            <tr><td><input id='street' minlength='2' type='text' value='${user.address.street}' readonly required/><td></tr>
            <tr><td><input id='number' min='1' type='text' value='${user.address.number}' readonly required/><td></tr>
            <tr><td><input id='city' minlength='2' type='text' value='${user.address.city}' readonly required/><td></tr>
            <tr><td><input id='phone' minlength='9' maxlength='10' type='text' value='${user.phone}' readonly required/><td></tr>
            <tr><td><input id='email' type='email' value='${user.email}' readonly required/><td></tr>
            <tr><td><input id='height' minlength='1' type='text' value='${user.height}' readonly required/><td></tr>
            <tr><td>Start Weight: ${user.weight.start}<td></tr>
            <tr><td>Start BMI: ${user.weight.start / (user.height ** 2)}<td></tr>
            <tr><td>Current BMI: ${CurrentBmi}<td></tr>
       `
    container = document.querySelector('.userContainer');
    container.innerHTML += table;

    user.weight.meetings.forEach(m => {
        let table = '';
        table += `
                <tr>
                    <th>${m.date}</a></th>
                    <th>${m.weight}</th>
                </tr>`
        containerMeetings = document.querySelector('.userTable');
        containerMeetings.innerHTML += table;
    })
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
                printUser(user);
            }
        })
    }
}

const Edit = document.querySelector('#Edit');
Edit.onclick = (e) => {
    e.preventDefault();
    console.log('Edit');
    const fName = document.getElementById('fName');
    fName.removeAttribute('readonly');
    fName.style.color = 'gray'
    const lName = document.getElementById('lName');
    lName.removeAttribute('readonly');
    lName.style.color = 'gray'
    const street = document.getElementById('street');
    street.removeAttribute('readonly');
    street.style.color = 'gray'
    const number = document.getElementById('number');
    number.removeAttribute('readonly');
    number.style.color = 'gray'
    const city = document.getElementById('city');
    city.removeAttribute('readonly');
    city.style.color = 'gray'
    const phone = document.getElementById('phone');
    phone.removeAttribute('readonly');
    phone.style.color = 'gray'
    const email = document.getElementById('email');
    email.removeAttribute('readonly');
    email.style.color = 'gray'
    const height = document.getElementById('height');
    height.removeAttribute('readonly');
    height.style.color = 'gray'
}

form.onsubmit = (e) => {
    e.preventDefault();
    console.log('Save');
    saveInJson();
}

saveInJson = () => {
    fetch(`http://localhost:3000/users/${userURL}`, {
        method: `PATCH`,
        body: JSON.stringify({
            "firstName": fName.value,
            "lastName": lName.value,
            "phone": phone.value,
            "email": email.value,
            "height": height.value,
            "address": { city: city.value, street: street.value, number: number.value }
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