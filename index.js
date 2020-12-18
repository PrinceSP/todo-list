const ul = document.querySelector('ul')
const forms = document.querySelector('form')
const btnAdd =  document.querySelector('.adds')
const inputs = document.querySelector('.inputs')

forms.addEventListener('submit',add)
document.addEventListener('DOMContentLoaded',getItemsLocal)

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
    e.value = 'checked'
  } else{
    text.style.textDecoration = 'none'
    text.style.background = 'none'

    e.value = 'unchecked'
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

  items.map(item=>{
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
