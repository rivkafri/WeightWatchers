const inputToLogin = document.querySelector('#inputToLogin');
const login = document.querySelector('#login');

login.onclick = (e) => {
    e.preventDefault();
    const Request = new XMLHttpRequest();
    let users;
    Request.open('GET', 'users.json');
    Request.send();
    Request.onload = () => {
        if (Request.status != 200) {
            alert(`Error ${Request.status}: ${Request.statusText}`);
        } else {
            users = JSON.parse(Request.responseText);
            console.log(users);
            debugger;
            if (inputToLogin.value != "") {
                const user = users.users.find(user => user.email === inputToLogin.value || user.phone === inputToLogin.value);
                const manager = users.manager.email === inputToLogin.value || users.manager.phone === inputToLogin.value;
                if (user)
                    window.location.href = './user.html?id=' + `${user.id}`;
                if (manager)
                    window.location.href = './index.html';
                else
                    alert('not found try again');
            }
            else {
                alert('you not enter anything');
            }

        }
    }
}