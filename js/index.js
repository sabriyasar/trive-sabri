var form = `<div>
<div class="services_account_list">Account List</div>
<form action="" id="form1" novalidate>
<div class="form-group">
   <input type="text" class="form-control" id="name" autocomple="off" placeholder="Name" required>
   <small class="error-msg"></small>
</div>
<div class="form-group">
   <input type="text" class="form-control" id="surname" autocomple="off" placeholder="Surname" required>
   <small class="error-msg"></small>
</div>
<div class="form-group">
   <input type="email" class="form-control" id="email" autocomple="off" placeholder="Email" required>
   <small class="error-msg"></small>
</div>
<div class="form-group">
   <input type="tel" class="form-control" id="phone" autocomple="off" placeholder="Phone" required>
   <small class="error-msg"></small>
</div>
   <button class="services_button_addlist" type="submit" onclick="AddList()">Add List</button>
   </form>
</div>`


function table() {
    let table = 
    `<table class="table">
    <thead>
       <tr>
          <th scope="col" class="col-1">#</th>
          <th scope="col" class="col-2">Name</th>
          <th scope="col" class="col-3">Surname</th>
          <th scope="col" class="col-4">Email</th>
          <th scope="col" class="col-5">Phone</th>
       </tr>
    </thead>
    <table>`;

    for (let i = 0; i < details.length; i++) {
        table = table + `<tr>
        <td class="col-1">${i+1}</td>
        <td class="col-2">${details[i].name}</td>
        <td class="col-3">${details[i].surname}</td>
        <td class="col-4">${details[i].email}</td>
        <td class="col-5">${details[i].phone}</td>
        <td class="col-6"><button class="addformlist_button" type="button" onclick="deleteData(${i})">Sil</button></td>
        </tr>`
    };
    table = table + `</tbody>
    </table>`;
    document.getElementById("table").innerHTML = table;
}
document.getElementById("form").innerHTML = form;
details = [];
getData();
table();
function getData(){
    let Data = localStorage.getItem("details")
    if (Data) {
        details = JSON.parse(Data);
    } else {
        setData();
    };
};

function setData() {
    localStorage.setItem("details", JSON.stringify(details));
}

function AddList(){
    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
  if (name.value.trim() !== '' && surname.value.trim() !== '' && email.value.trim() !== '' && email.value.includes('@') && phone.value.trim() !== '') {
    let data = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value
    };
    details.push(data)
    setData();

    console.log(data)
    table();
 }
}

const form1 = document.getElementById('form1');

form1.addEventListener('submit', function(e) {
    e.preventDefault();
    [...this.elements].forEach(formElement => {
        if (!formElement.checkValidity()) {

            if (!formElement.nextElementSibling?.className !== 'error-msg') {
                const error = document.createElement('small')
                error.className = 'error-msg'
                error.innerText = formElement.validationMessage
                formElement.insertAdjacentElement('afterend', error)
            } 
        } else {
            if(formElement.nextElementSibling?.className === 'error-msg') {
                formElement.nextElementSibling.remove()
            }
        }
    })
});

function deleteData(index) {
    details.splice(index, 1)
    setData();
    table();
    // console.log('delete work')
    console.log(index)
}