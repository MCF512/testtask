"use strict"

let body = document.querySelector('body');
let table = document.createElement('table')

//добавляем первую строку таблицы
let firstTr = document.createElement('tr');
firstTr.classList.add('first')

firstTr.innerHTML = `
    <th>Имя <button class="name__sort">sort</button></th>
    <th>Фамилия <button class="surname__sort">sort</button></th>
    <th>Описание <button class="about__sort">sort</button></th>
    <th>Цвет глаз <button class="color__sort">sort</button></th>
    `
table.appendChild(firstTr)
body.appendChild(table)

//кнопки для сортировки
let nameSort = document.querySelector('.name__sort');
let surnameSort = document.querySelector('.surname__sort');
let aboutSort = document.querySelector('.about__sort');
let colorSort = document.querySelector('.color__sort');

//получаем JSON
let DATA;

function getFile(fileName) {

  let request = new XMLHttpRequest();

  request.open('GET', fileName);

  request.onloadend = function () {

    parse(request.responseText);
  }

  request.send();
}

getFile('js/test.json'); //путь к файлу

function parse(obj) {

  DATA = JSON.parse(obj);

  //добавляем строки в таблицу
  function appendToTable() {
    DATA.forEach(element => {
      let tr = document.createElement('tr');
      tr.classList.add('info')

      tr.innerHTML = `
    <td name="name">${element.name.firstName}</td>
    <td name="surname">${element.name.lastName}</td>
    <td name="about">${element.about.slice(0, 150)}...</td>
    <td name="color">${element.eyeColor}</td>
    `
      table.appendChild(tr)
    });
  }

  appendToTable()

  function removeFromTable() {
    table.innerHTML = '';
    table.appendChild(firstTr)
  }

  function JsonSort(json, key) {
    for (let j = 1, jl = json.length; j < jl; j++) {
      let temp = json[j],
        val = temp[key],
        i = j - 1;
      while (i >= 0 && json[i][key] > val) {
        json[i + 1] = json[i];
        i = i - 1;
      }
      json[i + 1] = temp;

    }
    return json;
  }

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  nameSort.addEventListener('click', () => {
    JsonSort(DATA.name, 'firstName');
    // sortByKey(DATA[name], 'firstName')
    removeFromTable();
    appendToTable();
  });
  surnameSort.addEventListener('click', () => {
    JsonSort(DATA.name, 'lastName');
    removeFromTable();
    appendToTable();
  });
  aboutSort.addEventListener('click', () => {
    JsonSort(DATA, 'about');
    removeFromTable();
    appendToTable();
  });
  colorSort.addEventListener('click', () => {
    JsonSort(DATA, 'eyeColor');
    removeFromTable();
    appendToTable();
  });

  let changeDiv = document.createElement('div');
  let editForm = document.createElement('form');

  changeDiv.appendChild(editForm);
  body.appendChild(changeDiv);

  let trs = document.querySelectorAll('tr')

  for (let i = 0; i < trs.length; i++) {
    trs[i].addEventListener('click', function () {
      let inputName = document.createElement('input');
      let inputSurname = document.createElement('input');
      let inputAbout = document.createElement('textarea');
      let inputColor = document.createElement('input');
      let submit = document.createElement('button')

      // console.log(trs[i])
      editForm.innerHTML = ''

      inputName.value = trs[i].querySelector("td[name='name']").textContent;
      inputSurname.value = trs[i].querySelector("td[name='surname']").textContent;
      inputAbout.value = trs[i].querySelector("td[name='about']").textContent;
      inputColor.value = trs[i].querySelector("td[name='color']").textContent;
      submit.innerHTML = 'Сохранить'

      // this.innerHTML = '';
      editForm.appendChild(inputName);
      editForm.appendChild(inputSurname);
      editForm.appendChild(inputAbout);
      editForm.appendChild(inputColor);
      editForm.appendChild(submit);

      submit.addEventListener('click', function (event) {
        event.preventDefault()
        let inputs = document.querySelectorAll('input');
        let textarea = document.querySelector('textarea');

        trs[i].querySelector("td[name='about']").innerHTML = textarea.value

        for (let j = 0; j < inputs.length; j++) {
          trs[i].querySelector("td[name='name']").innerHTML = inputs[0].value
          trs[i].querySelector("td[name='surname']").innerHTML = inputs[1].value
          trs[i].querySelector("td[name='color']").innerHTML = inputs[2].value
        }
      })


      // let td = this;
      // inputName.addEventListener('blur', function () {
      //   td.innerHTML = this.value;
      //   td.addEventListener('click', func);
      // });
      // inputSurname.addEventListener('blur', function () {
      //   td.innerHTML = this.value;
      //   td.addEventListener('click', func);
      // });
      // inputAbout.addEventListener('blur', function () {
      //   td.innerHTML = this.value;
      //   td.addEventListener('click', func);
      // });
      // inputColor.addEventListener('blur', function () {
      //   td.innerHTML = this.value;
      //   td.addEventListener('click', func);
      // });

      // this.removeEventListener('click', func);
    });
  }
}

