const SearchFoods = document.querySelector('#SearchFoods');
const search = document.querySelector('#search');
const container = document.querySelector('.usersTable');

let array;

showDetails = (p) => {
    console.log(p);
    container.innerHTML = "";
    // const btnBack = document.createElement("button");
    // btnBack.innerHTML = "אחורה";
    // btnBack.addEventListener("click", () => creatTable());
    let table = '';
    table += `
        <tr>
            <th><button type="submit" onclick="creatTable()">לחזרה לעמוד הקודם</button><th>
            <th>protein: ${p.protein}</th>
        </tr>`
    // container.append(btnBack);
    container.innerHTML += table;
}

const creatTable = () => {
    // container.innerHTML = "";
    console.log(array);
    //let table = '';
    array.forEach((product) => {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.innerHTML = product.shmmitzrach;
        div.append(h2);
        const btn = document.createElement('button');
        btn.innerHTML = "ערכים תזונתיים";
        btn.addEventListener("click", () => showDetails(product));
        div.append(btn);
        container.append(div);
    });
    // container = document.querySelector('.usersTable');
    // container.innerHTML += table;
}

SearchFoods.onsubmit = (e) => {
    e.preventDefault();
    console.log(search.value);
    const req = fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${search.value}`)
    req.then(response => response.json())
        .then(response => {
            console.log(response);
            array = "";
            array = response.result.records;
            creatTable();
        }
        )
        .catch(err => console.error(err));
}

// https://chomp.p.rapidapi.com/request.php?ingredient=${q.value}
