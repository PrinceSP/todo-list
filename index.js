const ul = document.querySelector('ul')
const forms = document.querySelector('form')
const btnAdd =  document.querySelector('.adds')
const inputs = document.querySelector('.inputs')
const delBtn = document.querySelector('.deleteButton')

forms.addEventListener('submit',add)
document.addEventListener('DOMContentLoaded',getItemsLocal)
delBtn.addEventListener('click',deleteItems)

function add(e){
  e.preventDefault()
  if (inputs.value == '') {
    alert('input box must not be empty!')
    return false;
  }

  addLocalItems(inputs.value)
  saveItems(inputs.value)

  inputs.value = ''
}

function complete(e,text){
  if (e.checked==true) {
    text.style.textDecoration = 'line-through'
    text.style.background = '#eee'
    text.className = 'checked'
  } else{
    text.style.textDecoration = 'none'
    text.style.background = 'none'
    text.className = 'unchecked'
  }
}

function saveItems(item){
  let items;

  if (localStorage.getItem('todos')===null) {
    items = []
  }else{
    items = JSON.parse(localStorage.getItem('todos'))
  }
  items.push(item)
  localStorage.setItem('todos',JSON.stringify(items))
}

function getItemsLocal(){
  inputs.value = ''

  let items;

  if (localStorage.getItem('todos')===null) {
    items = []
  }else{
    items = JSON.parse(localStorage.getItem('todos'))
  }

  items.forEach(item=>{
    addLocalItems(item)
  })
}

function addLocalItems(items,values){
  const lists = document.createElement('li')
  const box = document.createElement('input')

  box.type = "checkbox"
  box.className = 'done'

  if (items!==null || items!== undefined || items!==0) {
    lists.appendChild(box)
    lists.append(items)
  } else {
    lists.append(values)
  }

  ul.appendChild(lists)

  box.addEventListener('change',function(){
    complete(this,lists)
  })
}

function deleteItems(){
  const lists = document.querySelectorAll('li')
  lists.forEach(item=>{
    if (item.classList.contains('checked')) {
      confirmDeletion(item)
    }
  })
}

function confirmDeletion(item){
  let conf = confirm('are u sure want to delete these items?')
  if (conf===true) {
    item.remove();
    localStorage.removeItem('todos')
  }
}
