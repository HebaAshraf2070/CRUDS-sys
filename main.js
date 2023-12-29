var Title = document.getElementById('prodtitle');
var price = document.getElementById('proprice');
var taxes = document.getElementById('protaxes');
var discount = document.getElementById('prodisc');
var total = document.getElementById('prototal');
var prodnum = document.getElementById('pronumber');
var category = document.getElementById('procateg');
var submit = document.getElementById('submitBtn');
var deleteBtn = document.getElementById('deleteall');
var updates = document.getElementById('update1Btn');
// console.log(Title, price, taxes, discount, total, prodnum, category, submit)


// get total

function geTotal() {
    if (price.value != null) {
        let result = (+price.value + ((+taxes.value / 100) * +price.value)) - ((+discount.value / 100) * +price.value);

        total.innerHTML = result;

    } else {
        total.innerHTML = "";
    }
}

// create product

var prodlist = [];


if (localStorage.getItem('newProd') != null) {
    prodlist = JSON.parse(localStorage.getItem('newProd'));
    addToTable();

}
// else {
//     prodlist = [];
// }



submit.onclick = function getdata() {
    var product = {
        Title: Title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        prodnum: prodnum.value,
        category: category.value,
    }

    // prodlist.push(product);


    // add multiproducts
    if (Title.value == "" || category.value == "" || price.value == "") {
        Swal.fire("You Should Enter Product Name, Category & Price!");

    } else if (prodnum.value > 200) {
        Swal.fire("The Product Number should not exceed 200!");
    }

    else {
        if (product.prodnum > 1) {
            for (var i = 0; i < product.prodnum; i++) {
                prodlist.push(product)
            }
        } else {
            prodlist.push(product)
        }

        localStorage.setItem('newProd', JSON.stringify(prodlist));
        addToTable();
        clearForm();

    }
}

// submit.onclick = function getdata() {
//     var product = {
//         Title: Title.value,
//         price: price.value,
//         taxes: taxes.value,
//         discount: discount.value,
//         total: total.innerHTML,
//         prodnum: prodnum.value,
//         category: category.value,
//     }

//     // Clear the existing products in the array if any
//     prodlist.length = 0;

//     // add multiproducts
//     if (product.prodnum > 1) {
//         for (var i = 0; i < product.prodnum; i++) {
//             // Create a new object for each iteration
//             var newProduct = {
//                 Title: product.Title,
//                 price: product.price,
//                 taxes: product.taxes,
//                 discount: product.discount,
//                 total: product.total,
//                 prodnum: product.prodnum,
//                 category: product.category,
//             };
//             prodlist.push(newProduct);
//         }
//     } else {
//         // If prodnum is not greater than 1, add the single product
//         prodlist.push(product);
//     }

//     // Add the products to local storage and update the table
//     localStorage.setItem('newProd', JSON.stringify(prodlist));
//     addToTable();
//     clearForm();
// }




// add to table

function addToTable() {
    bag = "";
    for (var i = 0; i < prodlist.length; i++) {
        bag +=
            `
                                         <tr>
                                            <th scope="row">${i + 1}</th>
                                            <td>${prodlist[i].Title}</td>
                                            <td>${prodlist[i].category}</td>
                                            <td>${prodlist[i].price}</td>
                                            <td>${prodlist[i].taxes}</td>
                                            <td>${prodlist[i].discount}</td>
                                            <td>${prodlist[i].total}</td>
                                            <td><button onclick="preUpdate(${i})" class="btn btn-info text-white " id="upBtn">update</button></td>
                                            <td><button onclick="deleteProd(${i})" class="btn text-white " id="delBtn"
                                                    style="background-color:  #fd10ba;">delete</button></td>
                                        </tr>
            `
    }
    document.getElementById('tbody').innerHTML = bag;
    if (prodlist.length > 1) {
        deleteBtn.classList.remove('d-none')
    } else {
        deleteBtn.classList.add('d-none')
    }
}
// delete all
deleteBtn.onclick = function deleteAll() {
    localStorage.clear();
    prodlist.splice(0);
    addToTable();

}
// clear forminput

function clearForm() {
    Title.value = "";
    price.value = "";
    taxes.value = "";
    discount.value = "";
    total.innerHTML = "";
    prodnum.value = "";
    category.value = "";
}

// delete product

function deleteProd(i) {
    prodlist.splice(i, 1);
    localStorage.setItem('newProd', JSON.stringify(prodlist));
    addToTable();

}


// uppdate product

function preUpdate(index) {
    itemIndex = index;
    Title.value = prodlist[index].Title;
    price.value = prodlist[index].price;
    taxes.value = prodlist[index].taxes;
    discount.value = prodlist[index].discount;
    category.value = prodlist[index].category;
    // total.innerHTML = prodlist[index].total;
    geTotal()
    prodnum.classList.add('d-none');
    submit.classList.add('d-none')
    updates.classList.remove('d-none');


}
function update() {

    var newItem = {
        Title: Title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,

    }

    prodlist.splice(itemIndex, 1, newItem);
    localStorage.setItem('newProd', JSON.stringify(prodlist));
    addToTable();
    clearForm();
    submit.classList.remove('d-none');
    updates.classList.add('d-none');
    prodnum.classList.remove('d-none');


}
// search

function search(value) {
    bag = "";
    for (var i = 0; i < prodlist.length; i++) {
        if (prodlist[i].Title.toLowerCase().includes(value.toLowerCase())
            ||
            prodlist[i].category.toLowerCase().includes(value.toLowerCase())) {
            bag +=
                `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${prodlist[i].Title}</td>
                <td>${prodlist[i].category}</td>
                <td>${prodlist[i].price}</td>
                <td>${prodlist[i].taxes}</td>
                <td>${prodlist[i].discount}</td>
                <td>${prodlist[i].total}</td>
                <td><button onclick="preUpdate(${i})" class="btn btn-info text-white " id="upBtn">update</button></td>
                <td><button onclick="deleteProd(${i})" class="btn text-white " id="delBtn"
                        style="background-color:  #fd10ba;">delete</button></td>
            </tr>

                `
        }
    }

    document.getElementById('tbody').innerHTML = bag;
}




