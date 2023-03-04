//UI Ewallet
document.querySelector('#ewallet-form').addEventListener('submit', function(e){
    e.preventDefault();
    // console.log(e)
    // console.log("submited")
    const type = document.querySelector('.add__type').value;    
    // console.log(type);

    const dec = document.querySelector('.add__description').value;
    // console.log(dec);

    const val = document.querySelector('.add__value').value;
    // console.log(val);
    
    if(dec && val ) {
        addItems(type,dec,val);
        resetForm();
    }
});
showItems();
function showItems(){
    let items = getItemsfromLS();
    let collections = document.querySelector('.collection');
    
    for(let item of items){
        let addValue = `
<div class="item">
<div class="item-description-time">
  <div class="item-description">
    <p>${item.dec}</p>
  </div>
  <div class="item-time">
    <p>${item.time}</p>
  </div>
</div>
<div class="item-amount ${item.type ==='+' ? "income-amount":"expense-amount"}">
  <p>${item.type}$${sep(item.val)}</p>
</div>
</div>
`;
    collections.insertAdjacentHTML('afterbegin',addValue);
    }

};



function addItems(type,dec,val){
    
    const time = addTime();
    const addValue = `
<div class="item">
<div class="item-description-time">
  <div class="item-description">
    <p>${dec}</p>
  </div>
  <div class="item-time">
    <p>${time}</p>
  </div>
</div>
<div class="item-amount ${type ==='+' ? "income-amount":"expense-amount"}">
  <p>${type}$${sep(val)}</p>
</div>
</div>
`;
// console.log(addValue);
const collections = document.querySelector('.collection');
collections.insertAdjacentHTML('afterbegin',addValue);

    addItemsToLs(dec,time,type,val);
    showExpense();
    showIncome();
    showTotalBal();
}


function resetForm(){
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}
function getItemsfromLS(){
    let items = localStorage.getItem('items');

    items = (items) ? JSON.parse(items):[];
    // if(items){
    //     items = JSON.parse(items);
    // } else {
    //     items=[];
    // }
    return items;
}
function addItemsToLs(dec,time,type,val){
   let items = getItemsfromLS();
    items.push({
        dec,
        time,
        type,
        val
    });
    localStorage.setItem('items', JSON.stringify(items));
   

}
//==============calculation===========

showTotalBal();
function showTotalBal(){
    let items = getItemsfromLS();
    let balance = 0;
    for(let item of items){
        if(item.type === '+') {
            balance+= parseInt(item.val);
        } else {
            balance-= parseInt(item.val)
        }
    }
    document.querySelector('.balance__amount p').innerText
     = `$${sep(balance)}`;

    //  if(balance > 0) {
    //     document.querySelector('.green').className = "green";
    //  } else {
    //     document.querySelector('.green').className = "red";
    //  }
   document.querySelector('header').className = (balance >= 0 ? "green":"red");
}

showIncome();
function showIncome(){
    let items = getItemsfromLS();
    // let totalIncome = 0;
    // for(let item of items){
    //     if(item.type === "+") {
    //         totalIncome+= parseInt(item.val);
    //     }
    // }
    let totalIncome = items.filter((item) =>item.type === '+'
    ).reduce((income1,item)=>income1 += parseInt(item.val),0);

    console.log(totalIncome);
    document.querySelector('.income__amount p').innerText = `$${sep(totalIncome)}`;
    
}

showExpense(); 
function showExpense(){
    let items = getItemsfromLS();
    // let TotalExpenses = 0;
    // for(let item of items){
    //     if(item.type === "-") {
    //         TotalExpenses+= parseInt(item.val)
    //     }
    // }
    let TotalExpenses = items.filter((item) => item.type === '-').reduce((exponse,item)=> exponse + parseInt(item.val),0)

  document.querySelector('.expense__amount').innerText = `$${sep(TotalExpenses)}`;
}

//utility========================

function addTime(){
    const now = new Date().toLocaleTimeString('en-us',{
        month : 'short',
        day : 'numeric',
        hour : "2-digit",
        minute : "2-digit"
    });
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    const formattedTime = `${date[1]} ${date[0]},${time}`

    return formattedTime;
}


function sep(amount){
    amount = parseInt(amount);

    return amount.toLocaleString();
}
