console.log('client side javascript loaded')


const weatherFrom = document.querySelector('form');
const searchElem= document.querySelector('input')
const showError = document.querySelector('#error')
const table = document.querySelector('table')

weatherFrom.addEventListener('submit',(e)=>{
  table.textContent=''
  showError.textContent='Loading....'
  e.preventDefault();
  const location= searchElem.value;
  fetch(`/weather?address=${location}`).then((res)=>{
  res.json().then((data)=>{
    if(data.err) {
      showError.innerHTML= data.err
    }else {
      showError.textContent=''
      createTable(data);
    }
  })
})
})

function createTable(data){
 table.className="gridtable";
 const thead=document.createElement("thead");
 const tbody=document.createElement('tbody');
 const headRow=document.createElement('tr');
 for (let key in data) {
  let th=document.createElement('th');
  let text = document.createTextNode(key);
  th.appendChild(text);
  headRow.appendChild(th);
 }
 thead.appendChild(headRow);
 table.appendChild(thead);
 let tr=document.createElement('tr');
 for(let key in data){
   let td=document.createElement('td');
   td.appendChild(document.createTextNode(data[key]));
   tr.appendChild(td);
 }
 tbody.appendChild(tr);
 table.appendChild(tbody)
}
