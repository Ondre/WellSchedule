var wells = [];
wells[0] = "Скважина№1";
wells[1] = "Скважина№2";
wells[2] = "Скважина№3"; 
wells[3] = "Скважина№4";
wells[4] = "Скважина№5";

var jobs = [];
jobs[0] = [];
jobs[0][0] = "Работа№1";
jobs[0][1] = "Работа№2";
jobs[0][2] = "Работа№3";
jobs[1] = [];
jobs[1][0] = "Работа№1";
jobs[1][1] = "Работа№2";
jobs[2] = [];
jobs[2][0] = "Работа№4";
jobs[2][1] = "Работа№2";
jobs[3] = [];
jobs[3][0] = "Работа№1";
jobs[4] = [];
jobs[4][1] = "Работа№2";

// todo: replace all spans with divs

var year = document.getElementById("year");
var month = document.getElementById("month");
var form = document.forms[0];
var table;

year.addEventListener("input", updateTable);
month.addEventListener("input", updateTable);

//выбираем модальное окно
modal = document.getElementById('myModal');
modalCloseSpan = document.getElementsByClassName("close")[0];

//Добавляем действие для кнопки из формы
document.forms[0].elements["okButton"].onclick = addJob;

// Добавление функции закрытия и очистки формы на крестик
modalCloseSpan.onclick = function() {
  clearForm();
};

function updateTable() {
  
  if (year.value !== "" && month.value !== "") {    
    
    table = document.getElementById("table");
    table.children[0].innerHTML = "";
    
    row1 = document.createElement("tr");
    col1 = document.createElement("th");
    col1.innerText = "Скважина";
    row1.appendChild(col1);
    
    // инициализация заголовков
    for (i = 1; i < 33; i++) {
      
      colDays = document.createElement("th");
      colDays.innerText = i;
      row1.appendChild(colDays);
      if (i===31) colDays.innerText = "Работы";
      if (i===32) colDays.innerText = "Добавить";
    }

    table.children[0].appendChild(row1);
    
    for (i = 0 ; i < wells.length ; i++) {
      
      rowWell = document.createElement("tr");
      colWell = document.createElement("td");
      colWell.innerText = wells[i];
      rowWell.appendChild(colWell);
      
      //инициализация всех ячеек
      for (j = 1; j < 33; j++) {
        
      var colDays = document.createElement("td");
      colDays.innerText = "";
      colDays.setAttribute("class", "droppable" + " " + i);
        
        //добавление работ и ячеек для них
        if (j === 31) {
          colDays.setAttribute("class", "droppable" + " " + i + " " + "stack");
          colDays.setAttribute("id", "jobs" + i);
            for (k = 0; k < jobs[i].length; k++) {
              if (jobs[i][k] !== undefined) {
                
                currJob = document.createElement("div");
                currJob.innerText = jobs[i][k];
                currJob.setAttribute("class", "draggable" + " " + i);
             
                colDays.appendChild(currJob);
              }
            }
        }
        
        
        // добавление кнопок
        if (j === 32) {
                inputButton = document.createElement("input");
          
                inputButton.type = "button";
                inputButton.setAttribute("class", "row " + i);
                inputButton.value = "+";
                inputButton.addEventListener("click", openAddJobWindow, false);
                colDays.style.width = "30px";             
                colDays.appendChild(inputButton);
          
              }
      rowWell.appendChild(colDays);
      if (i%2 !== 0) {
        rowWell.style.backgroundColor = "rgb(225,225,225)";
      }
    }
      table.children[0].appendChild(rowWell);
    }
  }
}

// строка, в которую добавить новую работу
var rowToAddJob;

// открыть окно для добавления работы
function openAddJobWindow(e) {
  rowToAddJob = e.target.getAttribute("class").split(" ")[1];
  modal.style.display = "block";
  form.elements["jobName"].focus();
}
  


// Добавить работу в массив и сразу в таблицу
function addJob() {
  // row пришел как строка. парсим в число
  row = Number.parseInt(rowToAddJob);
  targetCell = table.rows[row + 1].cells[31];
  
  jobName = form.elements["jobName"].value;
                
  currJob = document.createElement("div");
  currJob.setAttribute("class", "draggable " + row);
  currJob.innerText = jobName;
  
  // добавить в массив работу. хз зачем. потому что могу
  jobs[row].push(jobName);
             
  targetCell.appendChild(currJob);
  
  
  clearForm();
}

//спрятать и очистить форму
function clearForm() {
  modal.style.display = "none";
  form.elements[0].value = "";
  form.elements[1].value = "";
  form.elements[2].value = "";
  form.elements[3].value = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        clearForm(); 
    }
};


var dragObject = {};
var isMousePressed = false;
document.onmousedown = function(e) {

  if (e.which != 1) { //Проверка на клик левой кнопкой
    return; 
  }
  isMousePressed = true;
  
  
  elem = e.target.closest('.draggable');
  if (!elem) return; // не нашли, клик вне draggable-объекта

  // запомнить переносимый объект
  dragObject.elem = elem;

  // запомнить координаты, с которых начат перенос объекта
  dragObject.downX = e.pageX;
  dragObject.downY = e.pageY;
};


document.onmousemove = function(e) {
  if (!dragObject.elem) return; // элемент не зажат

  if ( !dragObject.avatar ) { // если перенос не начат...

    // посчитать дистанцию, на которую переместился курсор мыши
    moveX = e.pageX - dragObject.downX;
    moveY = e.pageY - dragObject.downY;
    if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
      return;
    }
 
    dragObject.avatar = createAvatar(e); // захватить элемент
    if (!dragObject.avatar) {
      dragObject = {}; // аватар создать не удалось, отмена переноса
      return; // возможно, нельзя захватить за эту часть элемента
    }
 
    // аватар создан успешно 
    // создать вспомогательные свойства shiftX/shiftY
    var coords = getCoords(dragObject.avatar);
    dragObject.shiftX = dragObject.downX - coords.left;
    dragObject.shiftY = dragObject.downY - coords.top;

    startDrag(e); // отобразить начало переноса
  }

  // отобразить перенос объекта при каждом движении мыши
  dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
  dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
  

  return false;
};

function getCoords(elem) { 
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function createAvatar(e) {
  // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
  var avatar = dragObject.elem; 
  var old = {
    parent: avatar.parentNode,
    nextSibling: avatar.nextSibling,
    position: avatar.position || '',
    left: avatar.left || '',
    top: avatar.top || '',
    zIndex: avatar.zIndex || ''
  };

  // функция для отмены переноса
  avatar.rollback = function() {
    this.insertBefore();
    this.setPrevPos();
  };  
  avatar.insertBefore = function() {
    old.parent.insertBefore(avatar, old.nextSibling);
  };  
  avatar.setPrevPos = function() {
    avatar.style.position = old.position;
    avatar.style.left = old.left; 
    avatar.style.top = old.top;
    avatar.style.zIndex = old.zIndex;
  };  
  return avatar;
} 


function startDrag(e) {
  avatar = dragObject.avatar;

  document.body.appendChild(avatar);
  avatar.style.zIndex = 9999; 
  avatar.style.position = 'absolute';
} 

document.onmouseup = function(e) {
  
  //если нет аватара, то нету и перетаскивания
  if ( !dragObject.avatar ) {dragObject = {}; return;}
  
  //если нет места для дропа или оно некорректно
  if (findDroppable(e) === null) {  avatar.rollback(); dragObject = {}; return;}

  //убрать аватарку туда, где та была изначально
  avatar.setPrevPos();

  //если верная линия и ячейка свободна, то роняем. иначе откатываем все на начало
    if (isCellFree(e) && checkLine(e))
      finishDrag(e);
    else dragObject.avatar.rollback();

  dragObject = {};
};

function checkLine(e){
  return dragObject.elem.getAttribute("class").split(" ")[1] === findDroppable(e).getAttribute("class").split(" ")[1];
}

function isCellFree(e) {
    return findDroppable(e).innerHTML === "" || findDroppable(e).getAttribute("class").split(" ")[2] === "stack";
}

function finishDrag(e){
  findDroppable(e).appendChild(dragObject.elem);
}

function findDroppable(event) {
  // спрячем переносимый элемент
  dragObject.avatar.hidden = true;

  // получить самый вложенный элемент под курсором мыши
  elem = document.elementFromPoint(event.clientX, event.clientY);

  // показать переносимый элемент обратно
  dragObject.avatar.hidden = false;

  if (elem === null) {
    // такое возможно, если курсор мыши "вылетел" за границу окна
    return null;
  }

  return elem.closest('.droppable');
}
