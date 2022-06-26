//login
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
            let flag = 0;
            if (inputToLogin.value != "") {
                if (inputToLogin.value === users.manager.email || inputToLogin.value === users.manager.phone) {
                    window.location.href = './index.html';
                    flag = 1;
                }
                else {
                    users.users.forEach(u => {
                        if (inputToLogin.value === u.email || inputToLogin.value === u.phone) {
                            window.location.href = './user.html?id=' + `${u.id}`;
                            flag = 1;
                        }
                    });
                }
                if (flag === 0) {
                    alert("not found try again");
                }
            }
            else {
                alert("you not enter anything");
            }
        }

    }
}