const inputToLogin = document.querySelector('#inputToLogin');
const login = document.querySelector('#login');

login.onclick = (e) => {
    console.log('login');
    e.preventDefault();
    const Request = new XMLHttpRequest();
    let users;
    Request.open('GET', 'http://localhost:8000/account');
    Request.send();
    Request.onload = () => {
        if (Request.status != 200) {
            alert(`Error ${Request.status}: ${Request.statusText}`);
        } else {
            users = JSON.parse(Request.responseText);
            console.log(users);
            if (inputToLogin.value != "") {
                const user = users.users.find(user => user.email === inputToLogin.value);
                const manager = users.manager.email === inputToLogin.value;
                if (user)
                    window.location.href = '../html/user.html?id=' + `${user.id}`;
                else if (manager)
                    window.location.href = '../html/index.html';
                else
                    alert('not found try again');
            }
            else {
                alert('you not enter anything');
            }

        }
    }
}