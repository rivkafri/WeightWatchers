class User {
    #id;
    #firstName;
    #lastName;
    #city;
    #street
    #number;
    #phone;
    #email;
    #height;
    #weight;
    static Id = 0;
    constructor(firstName, lastName, city, street, number, phone, email, height, weight) {
        this.#id = ++this.Id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#city = city;
        this.#street = street;
        this.#number = number;
        this.#phone = phone;
        this.#email = email;
        this.#height = height;
        this.#weight = weight;
    }
    getId() {
        return this.#id;
    }
    setFirstName(firstName) {
        this.#firstName = firstName;
    }
    getFirstName() {
        return this.#firstName;
    }
    setLastName(lastName) {
        this.#lastName = lastName;
    }
    getLastName() {
        return this.#lastName;
    }
    setWeight(w) {
        this.#weight = w;
    }
    getWeight() {
        return this.#weight;
    }

    setHeight(h) {
        this.#height = h;
    }
    getHeight() {
        return this.#height;
    }
    //חישוב bmi
    getBmi() {

    }
    //bmi פונקציה שתדפיס לכל אחד תשם ות
    //משקל לחלק לגובה בשניה
}


  // //הוספת משתמש חדש
    // AddUser(user) {
    //     return this.#usersList.push(user);
    // }
    // //מחיקת משתמש
    // DeleteUser(id) {
    //     const arr = this.#usersList.filter(c => c.getId != id);
    //     this.#usersList = arr;
    // }

    // btnAdd.onclick = () => {
    //         u = new User(UserName.value, UserWeight.value);
    //         m.AddUser(u);
    //     }

    // btnUpdate.onclick = () => {
    //         Id = document.querySelector('#id');
    //         const u = m.SearchIdUser(Id.value);
    //         u[0].setUserName = UserName.value;
    //         u[0].setUserWeight = UserWeight.value;
    //         console.log(u);
    //     }

    // //בלחיצה על מחיקת user
    // btnDelete.onclick = () => {
    //         Id = document.querySelector('#idDelete');
    //         m.DeleteUser(parseInt(Id.value));
    //         console.log(m.getusersList);
    //     }

    // showUserById.onclick = () => {
    //         id = idShow.value;
    //         m.ShowUser.innerHTML = '';
    //         u = m.SearchIdUser(id);
    //         u.ShowUser();
    //     }

    //פונקצית הוספה לגייסון
// const form = document.querySelector('#form');
// // listen for submit even
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const req = new XMLHttpRequest();
//     req.open('POST', 'users.json');
//     const data = new FormData(form);
//     const user = Object.fromEntries([...data.entries()]);
//     console.log(user);
//     let userJson = JSON.stringify({
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         address: user.address,
//         phone: user.phone,
//         email: user.email,
//         height: user.height,
//         weight: user.weight
//     })
//     req.send(userJson);
//     req.onload = () => {
//         this.setUsersList();
//     }
// });


let hfirstName = null;
let hlastName = null;
let hWeight = null;
let div = null;
// let add = null;
// let less = null;
// let update = null;
// const list = document.querySelector('#list');
// const userList = document.querySelector('#userList');

// //שליחה להדפסת רשימת משתמשים  
// list.onclick = () => {
//     // e.preventDefault();
//     printUsers(manager.getusersList());
// }

//פונקציה להדפסת המשתמשים
const printUsers = (arr) => {
    console.log(arr);
    // console.log(boolSearch);
    console.log("printUsers");
    userList.innerHTML = "";
    arr.forEach(p => {
        // update = document.createElement('button');
        // add = document.createElement('button');
        // less = document.createElement('button');
        div = document.createElement('div');
        hfirstName = document.createElement('span');
        hlastName = document.createElement('span');
        hWeight = document.createElement('span');
        hfirstName.innerHTML = "firstName: " + p.getFirstName();
        hlastName.innerHTML = "name: " + p.getLastName();
        hWeight.innerHTML = "weight: " + p.getWeight();
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.padding = "20px";
        div.style.alignItems = "end";
        // add.innerHTML = "+";
        // less.innerHTML = "-";
        // add.style.width = "20px";
        // less.style.width = "20px";
        // update.innerHTML = "update";
        div.append(hfirstName, hlastName, hWeight);
        userList.append(div);
    });
}
