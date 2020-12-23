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

function addLocalItems(items){
  const lists = document.createElement('li')
  const box = document.createElement('input')
  const newInputs = document.createElement('input')
  const [del,edit] = [document.createElement('button'),document.createElement('button')]
  const i = [document.createElement('i'),document.createElement('i')]

  box.type = "checkbox"
  del.type = "button"
  edit.type = "button"
  newInputs.type = "text"
  newInputs.disabled = true;


  box.className = 'done'
  newInputs.classList.add('newInputs')
  edit.className = 'editButton'
  i[0].className = "fa fa-trash"
  i[1].className = "fa fa-edit"

  newInputs.value = items

  del.appendChild(i[0])
  edit.appendChild(i[1])
  lists.appendChild(box)
  lists.appendChild(newInputs)
  lists.appendChild(del)
  lists.appendChild(edit)

  ul.appendChild(lists)

  box.addEventListener('change',function(){
    complete(this,lists)
  })

  edit.addEventListener('click',()=>{
    editTODOS(newInputs)
  })

  del.addEventListener('click',deleteItems)
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
    deleteFromLocal(item)
  }
}

function deleteFromLocal(item){
  let items;

  if (localStorage.getItem('todos')===null) {
    items = []
  }else{
    items = JSON.parse(localStorage.getItem('todos'))
  }

  const indexes = items.findIndex(i=>i===item.textContent)
  const delecion = items[indexes]

  if (delecion===item.textContent) {
    items.splice(indexes,1)
    localStorage.setItem('todos',JSON.stringify(items))
  }
}

function editTODOS(todos){
  todos.disabled = !todos.disabled
  todos.style.border = '1px solid'
  todos.style.padding = '12px'
}
