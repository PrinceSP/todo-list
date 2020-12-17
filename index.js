const ul = document.querySelector('ul')
const forms = document.querySelector('form')
const btnAdd =  document.querySelector('.adds')
const inputs = document.querySelector('.inputs')

forms.addEventListener('submit',add)

function add(e){
  e.preventDefault()
  const lists = document.createElement('li')
  const box = document.createElement('input')

  box.type = "checkbox"
  box.className = 'done'

  if (inputs.value == '') {
    alert('input box must not be empty!')
    return false;
  }

  lists.appendChild(box)
  lists.append(inputs.value)

  ul.appendChild(lists)

  inputs.value = ''

  box.addEventListener('change',function(){
    complete(this,lists)
  })
}

function complete(e,text){
  if (e.checked==true) {
    text.style.textDecoration = 'line-through'
    e.value = 'checked'
  } else{
    text.style.textDecoration = 'none'
    e.value = 'unchecked'
  }
}
