
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let category = document.getElementById("category")
let updateBtn = document.getElementById("update")
let deleteBtn = document.getElementById("delete")
let create = document.getElementById("create")
let searchByTitle = document.getElementById('search-title')
let searchByCategory = document.getElementById('search-category')
let search = document.getElementById('search')
let total = document.getElementById('total')
let count = document.getElementById('count')
let deleteAllDiv = document.getElementById('delete-all')
let popup = document.querySelector('.popup')
let okBtn = document.getElementById('ok')
let mood = 'create';
let temp;
// console.log(title,price,taxes,ads,discount,category,updateBtn,deleteBtn,cerateBtn,searchByTitle,searchByCategory,search,total)

// get total 
function getTotal() {
    // check if price have value
    if (price.value != '') {
        let sum = ((+price.value + +taxes.value + +ads.value) - +discount.value);
        total.innerHTML = sum;
        total.style.background = '#25df0e'
        total.style.color = '#1D2D44'
    } else {
        total.innerHTML = '';
        total.style.background = '#df310e'
        total.style.color = '#fff'
    }
}

// create product
let dataProducts
// check if local storage have products if yas get this product and set it in dataProducts
if (localStorage.products != null) {
    dataProducts = JSON.parse(localStorage.products);
} else {
    dataProducts = [];
}

create.onclick = function () {
    // to reset total style
    // get data from inputs and save it in obj product
    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value || 0,
        ads: ads.value || 0,
        discount: discount.value || 0,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    // push product to dataProducts
    // first i will check value of count  and check mood of program
    if (title.value != '' && price.value != '' && category.value != '' && count.value < 101) {
        if (mood === 'create') {
            if (count.value > 1) {
                // Create a number of products equal to  count value
                for (let i = 0; i < count.value; i++) {
                    dataProducts.push(product)
                }
            } else {
                // if count value < 1 / 0 or negative value just create one product
                dataProducts.push(product)
            }
        } else {
            dataProducts[temp] = product;
            mood = 'create';
            create.innerHTML = 'Create';
            count.style.display = 'block';
        }
        // clear inputs 
        clearData()
    } else {
        popup.style.display = 'flex'
        okBtn.onclick = () => {
            popup.style.display = 'none'
        }
    }
    // save  to localstorage
    // push dataProducts after add product to localstorage
    localStorage.products = JSON.stringify(dataProducts)

    // show data 
    showData()
}

// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
// read
function showData() {
    let product = '';
    for (let i = 0; i < dataProducts.length; i++) {
        // git product and add it to this var not +=
        product += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProducts[i].title}</td>
            <td>${dataProducts[i].price}</td>
            <td>${dataProducts[i].taxes}</td>
            <td>${dataProducts[i].ads}</td>
            <td>${dataProducts[i].discount}</td>
            <td>${dataProducts[i].total}</td>
            <td>${dataProducts[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    // set all data in product var to tbody 
    document.getElementById('tbody').innerHTML = product;
    if (dataProducts.length > 0) {
        deleteAllDiv.innerHTML = `<button onclick = "deleteAll()"> Delete All (${dataProducts.length})</button>`
    } else {
        deleteAllDiv.innerHTML = ''
    }
    getTotal()
}
// i call function her for showing data all time 
showData()


// delete
// this function will add in all button html when click on the btn 
function deleteProduct(i) {
    dataProducts.splice(i, 1);
    localStorage.products = JSON.stringify(dataProducts);
    showData()
}
// delete all
function deleteAll() {
    dataProducts.splice(0)
    localStorage.clear()
    showData()
}
// update

function updateData(i) {
    title.value = dataProducts[i].title;
    price.value = dataProducts[i].price;
    taxes.value = dataProducts[i].taxes;
    ads.value = dataProducts[i].ads;
    category.value = dataProducts[i].category;
    getTotal();
    create.innerHTML = 'Update';
    count.style.display = 'none';
    scroll({
        top: 0,
        behavior: "smooth",
    });
    mood = 'update'
    temp = i;
}
// search

function searchData(mood) {
    let value = search.value.toLowerCase();
    let product = '';
    if (mood == 'search-title') {
        for (let i = 0; i < dataProducts.length; i++) {
            if (dataProducts[i].title.includes(value)) {
                product +=
                    `<tr>
                    <td>${i+1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        }
    } else {
        for (let i = 0; i < dataProducts.length; i++) {
            if (dataProducts[i].category.includes(value)) {
                product +=
                    `<tr>
                    <td>${i+1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }
    // set all data in product var to tbody 
    document.getElementById('tbody').innerHTML = product;
}
// clean data
