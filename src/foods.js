const SearchFoods = document.querySelector('#SearchFoods');
const search = document.querySelector('#search');
let container = "";
let array;

showDetails = (p) => {
    console.log(p);
    container.innerHTML = "";
    let table = '';
    if (hebrew) {
        table += `
        <tr>
            <th><button type="submit" onclick="creatTable()">לחזרה לעמוד הקודם</button><th>
            <th>protein: ${p.protein}</th>
        </tr>`
    }
    else {
        table += `
        <tr>
            <th><button type="submit" onclick="creatTable()">לחזרה לעמוד הקודם</button><th>
            <th>protein: ${p.protein_g}</th>
        </tr>`
    }
    container = document.querySelector('.usersTable');
    container.innerHTML += table;
}

const creatTable = () => {
    container.innerHTML = "";
    console.log(array);
    if (array == [])
        alert("not exist!");
    else {
        array.forEach((product) => {
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            if (hebrew)
                h2.innerHTML = product.shmmitzrach;
            else
                h2.innerHTML = product.name;
            div.append(h2);
            const btn = document.createElement('button');
            btn.innerHTML = "ערכים תזונתיים";
            btn.addEventListener("click", () => showDetails(product));
            div.append(btn);
            container.append(div);
        });
    }
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '071fae810amshb706a2052da6b94p190cadjsnf53c140ff392',
        'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
    }
};

const contains_heb = (str) => {
    return (/[\u0590-\u05FF]/).test(str);
}

let hebrew = false;
SearchFoods.onsubmit = (e) => {
    hebrew = false;
    e.preventDefault();
    console.log(search.value);
    if (search.value != "") {
        if (contains_heb(search.value)) {
            hebrew = true;
            const req = fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${search.value}`)
            req.then(response => response.json())
                .then(response => {
                    console.log(response);
                    array = "";
                    array = response.result.records;
                    creatTable();
                }
                ).catch(err => console.error(err));
        }
        else {
            const req = fetch(`https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${search.value}`, options)
            req
                .then(response => response.json())
                .then(response => {
                    console.log(response.items);
                    array = "";
                    array = response.items;
                    creatTable();
                }
                ).catch(err => console.error(err));
        }
    } else {
        array = "";
        container.innerHTML = "";
        alert("enter again!");
    }
}



     // const req = fetch(`https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${search.value}`, options)
        // req
        //     .then(response => response.json())
        //     .then(response => console.log(response.items[0]))
        //     //.then(response => document.getElementById('showNutritionalValues').innerHTML=JSON.stringify(response.items[0]))



// https://chomp.p.rapidapi.com/request.php?ingredient=${q.value}



// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '071fae810amshb706a2052da6b94p190cadjsnf53c140ff392',
//         'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
//     }
// };
// function getNutritionalValues(){
//     const food = document.getElementById('nutritionalValues').value;
//     fetch(`https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${food}`, options)
//     .then(response => response.json())
//     .then(response => console.log(response.items[0]))
//     //.then(response => document.getElementById('showNutritionalValues').innerHTML=JSON.stringify(response.items[0]))
//     .catch(err => console.error(err));
// }


    // const btnBack = document.createElement("button");
    // btnBack.innerHTML = "אחורה";
    // btnBack.addEventListener("click", () => creatTable());

        // container.append(btnBack);