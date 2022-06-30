const form = document.querySelector('#form');
let obj = {};
let arrMeetings = [];

const fetchGet = () => {
    fetch('http://localhost:3000/users')
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            data.forEach(user => {
                arrMeetings = user.weight.meetings;
                creatTableMeeting(user);
            });
        })
};
fetchGet();

let usersMeeting = "";
creatTableMeeting = (user) => {
    let table = '';
    table += `
                <tr>
                    <th><input  type="text" value=${user.firstName + user.lastName}></th>
                    <th><input  type="text" value=${user.weight.meetings[user.weight.meetings.length - 1].weight}></th>
                    <th><input  type="Date"  value=${new Date().toISOString().split("T")[0]}></th>
                    <th><input  type="text" placeholder="write a comments"/></th>
                    <th><input type="checkbox"/></th>
                </tr>`
    usersMeeting = document.querySelector('.usersMeeting');
    usersMeeting.innerHTML += table;
}

saveInJson = (obj) => {
    console.log(obj);
    arrMeetings.push(obj);
    console.log(arrMeetings);
    fetch(`http://localhost:3000/users/${userURL}`, {
        method: `PATCH`,
        // body: JSON.stringify(obj),
        body: JSON.stringify({
            "weight.meetings": arrMeetings,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => console.log(response));
    arrMeetings = [];
}

// form.onsubmit = (e) => {
//     e.preventDefault();
//     obj = { date: , weight: , comments: , notVisit:  }
// }
