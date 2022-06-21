
class Manager {
    #usersList;
    constructor() {
        this.setUsersList();
    }
    setUsersList(arr) {
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
                users.forEach(user => {
                    printUser(user);
                });
                this.#usersList = users;
            }
        }
    }
    getUsersList() {
        console.log('getUsersList');
        return this.#usersList;
    }
}

let manager = new Manager();
let container = "";
//print one user
const printUser = (user) => {
    let table = '';
    //איך עושים לינק לעמוד יוזר?
    table += `
        <tr>
            <th><a href="../user.html">${user.firstName + ' ' + user.lastName}</a></th>
            <th>${user.weight.start / (user.height * user.height)}</th>
        </tr>`
    container = document.querySelector('.usersTable');
    container.innerHTML += table;
}

//search
const inputToSearch = document.querySelector('#inputSearch');
const search = document.querySelector('#search');
search.onclick = (e) => {
    e.preventDefault();
    if (inputToSearch.value != "") {
        const ans = manager.getUsersList().filter(user => user.id === inputToSearch.value ||
            user.firstName === inputToSearch.value || user.lastName === inputToSearch.value ||
            user.address.city === inputToSearch.value || user.address.street === inputToSearch.value ||
            user.address.number === inputToSearch.value || user.phone === inputToSearch.value ||
            user.email === inputToSearch.value || user.height === inputToSearch.value)
        console.log(ans);
        container.innerHTML = "";
        ans.forEach((u) => {
            printUser(u);
        });
    }
    else {
        container.innerHTML = "";
        manager.getUsersList().forEach((u) => {
            printUser(u);
        });
    }
}

