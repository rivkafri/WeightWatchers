const SearchFoods = document.querySelector('#SearchFoods');
const search = document.querySelector('#search');
const AllFoods = document.querySelector('#AllFoods');
let container = "";
let array = [];

showDetails = (p) => {
    console.log(p);
    AllFoods.innerHTML = "";
    container.innerHTML = "";
    let protein = '';
    if (hebrew)
        protein = p.protein;
    else
        protein = p.protein_g;
    let table = '';
    table += `
        <tr>
            <th><button type="submit" onclick="creatTable()">לחזרה לעמוד הקודם</button><th>
            <th>protein: ${protein}</th>
        </tr>`
    container = document.querySelector('#ProductsTable');
    container.innerHTML += table;
}

const creatTable = () => {
    container.innerHTML = "";
    console.log(array);
    if (array === [])
        alert('not exist!');
    else {
        array.forEach((product) => {
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            if (hebrew)
                h2.innerHTML = product.shmmitzrach;
            else
                h2.innerHTML = product.name;
            const btn = document.createElement('button');
            btn.innerHTML = "ערכים תזונתיים";
            btn.addEventListener("click", () => showDetails(product));
            div.append(h2, btn);
            AllFoods.append(div);
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
    AllFoods.innerHTML = "";
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
                    array = [];
                    // array = response.result.records;
                    array.push(response.result.records[0]);
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
                    array = [];
                    array = response.items;
                    creatTable();
                }
                ).catch(err => console.error(err));
        }
    } else {
        array = [];
        container.innerHTML = "";
        alert('enter again!');
    }
}