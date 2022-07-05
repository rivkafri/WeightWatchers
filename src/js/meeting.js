const form = document.querySelector('#form');
const Back = document.querySelector('#back');
let obj = {};
let arrMeetings = [];
let date = '';
let weight = '';
let comment = '';
let visit = '';
let usersMeeting = '';

creatTableMeeting = (user) => {
    let table = '';
    table += `
                <tr>
                    <th><input type="text" value=${user.firstName + user.lastName} readonly></th>
                    <th><input id="date" type="Date" value=${new Date().toISOString().split("T")[0]}></th>
                    <th><input id="weight" type="text" placeholder="write a weight"></th>
                    <th><input id="comment" type="text" placeholder="write a comments"/></th>
                    <th><input id="visit" type="checkbox"/></th>
                    <th><button type='button' onclick="func(${user.id})">save</button></th>
                </tr>`
    usersMeeting = document.querySelector('.usersMeeting');
    usersMeeting.innerHTML += table;
}

const fetchGet = () => {
    fetch('http://localhost:8000/users')
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data.users);
            data.users.forEach(user => {
                creatTableMeeting(user);
            });
        })
};
fetchGet();


async function func(id) {
    console.log('func ' + id);
    await getById(id);
    date = document.getElementById('date');
    weight = document.getElementById('weight');
    comment = document.getElementById('comment');
    visit = document.getElementById('visit');
    obj = { date: date.value, weight: weight.value, comments: comment.value, visit: visit.checked };
    console.log(obj);
    arrMeetings.push(obj);
    console.log(arrMeetings);
    date = '';
    weight = '';
    comment = '';
    visit = '';
    obj = {};
    saveInJson(id);
}

async function getById(id) {
    let response = await fetch(`http://localhost:3000/users/${id}`);
    let user = await response.json();
    arrMeetings = user.weight.meetings;
    console.log(arrMeetings);
}

saveInJson = (id) => {
    console.log(arrMeetings);
    fetch(`http://localhost:3000/users/${id}`, {
        method: `PATCH`,
        body: JSON.stringify({
            "weight": { meetings: arrMeetings }
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => console.log(response));
    arrMeetings = [];
}

Back.onclick = (e) => {
    e.preventDefault();
    window.location.href = './index.html';
}