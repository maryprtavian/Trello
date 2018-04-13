class Create {
    constructor(elName, identification, count, parent) {
        this.el = document.createElement(elName);
     this.el.classList.add(identification);
        this.id = identification + count;
        this.el.id = this.id;
        document.getElementById(parent).appendChild(this.el);
    }
    input(type) {
        this.el.type = type;
    }
    button(event, func, text) {
        this.el.setAttribute(event, func);
        var textBtn = document.createTextNode(text);
        this.el.appendChild(textBtn);
    }
    span(textSpan) {
        this.el.appendChild(document.createTextNode(textSpan));

    
    }
}

window.onload = getParam;
var boardName;

function getParam() {
    let url = "" + window.location;
    var index = url.indexOf('=') + 1;
    if (index !== -1) {
        boardName = url.slice(index)
        read();
       document.getElementById('h1').innerHTML=boardName;
    }
}

function read() {
    let obj = JSON.parse(localStorage.getItem(boardName));
    let length = obj['length'];
   
    for (let i = 1; i <= length; i++) {
        let newArray=obj['addList'+i];
        openCreateBox();
        for (let j = 0; j < obj['addList' + i].length; j++) {
            let task = new Create("SPAN", 'list-text', '', "addList" + i);
            let tick=new Create('img','tick','',  'addList' + i);
            task.span(obj['addList' + i][j].inputText); 

            if(obj['addList' + i][j].condition===true){
            tick.el.classList='tick1';
            }
            else{
                tick.el.classList='tick';
            }
            tick.el.addEventListener('click',x);
            function x(){
                tick.el.classList.toggle('tick1')// poxum e tick-i classy
                if( obj['addList' + i][j].condition===false) {
                    obj['addList' + i][j].condition=true;
                 }
                else {
                    obj['addList' + i][j].condition=false;
                }
                 localStorage.setItem(boardName, JSON.stringify(obj));
              }
          
        }
        
    }
   
}

var count = 0;

function openCreateBox() {
    var id = "board";
    count++;
    //addList
    var list = new Create("DIV", "addList", count, id);
    id = list.id;
    var input = new Create("INPUT", 'addInput', count, id);
    input.input('text');

    var saveBtn = new Create("BUTTON", 'btnList', count, id);
    saveBtn.button("onclick", "save(id)", 'save');

    var delBtn = new Create("BUTTON", 'btnDelete', count, id);
    delBtn.button("onclick", "deleteList(id)", 'x');

}
function deleteList(id){

    let deleteList = document.getElementById(id); // vercnume delBtn-i id
    let list=deleteList.parentNode; // gtnum enq list-y

    deleteList.parentNode.parentNode.removeChild(list); // DOM-ic jnjum en list-y

    //from local storage
    var obj = JSON.parse(localStorage.getItem(boardName)); //lokal storage-ic vercnum enq objecty
    let idNum = list.id.replace(/[^0-9]/g, ''); // stanum em addList1... list id-i tivy;
     delete obj[list.id]; // jnjum enq  listy objecti mijic
     
    ////  Poxum enq addList-i tivy mihatov pakasacnum enq/////////// 
    renameProp =  (
        oldProp,
        newProp,
    { [oldProp]: old,
     ...others 
      }) => ({
        [newProp]: old,
        ...others
    })          

    for(let i=idNum; i<obj.length; i++){
        idNum++;
        obj=renameProp('addList'+idNum, 'addList'+i, obj); 
       
      }
     
    obj.length-=1;
    localStorage.setItem(boardName, JSON.stringify(obj));
}

function save(id) {
 
    let inputObj={};
    let idNum = id.replace(/[^0-9]/g, '');
    let inputTextId = "addInput" + idNum;
    inputObj.inputText = document.getElementById(inputTextId).value;
    if(inputObj.inputText!==''){
    inputObj.condition=false;
    let addListId = 'addList' + idNum;
    let task = new Create("span",'list-text' , '', addListId);
    let tick=new Create("img",'tick','',addListId);
    //  let garbage=new Create('image','garbage','', addListId)  avelacnum e garbage-i nkar

    task.span(inputObj.inputText);
    //  garbage.button('onclick','deleteTask(id)'); // buton a vra dnum a onclick ev deletTask atributy 


    //set in localStorage
    let obj = JSON.parse(localStorage.getItem(boardName));
    if (obj.hasOwnProperty(addListId)) {
        var newArray = obj[addListId];
        newArray.push(inputObj);
        obj[addListId] = newArray;
        localStorage.setItem(boardName, JSON.stringify(obj));
    } else {
        obj[addListId] = [inputObj];
        obj['length'] += 1;
        localStorage.setItem(boardName, JSON.stringify(obj));
    }
   

    
    tick.el.addEventListener('click',x);
    function x(){
        let objNew= JSON.parse(localStorage.getItem(boardName));
        let index=newArray.indexOf(inputObj)
        tick.el.classList.toggle('tick1')// poxum e tick-i classy
        if( inputObj.condition===false) {
           inputObj.condition=true;
         }
        else {
       inputObj.condition=false;
        }
        objNew[addListId].splice(index, 1, inputObj);
         localStorage.setItem(boardName, JSON.stringify(objNew));
      }
     
}

}
// function deleteTask(id){

//    garbageImage.addEventListener("click", function deleteTask(){
//        let listElement = document.getElementById(garbageImage.parentElement.id);
//        console.log(id.parentNode)
//        listElement.parentNode.removeChild(listElement);
  
//       //  from local storage
//         var obj = JSON.parse(localStorage.getItem("board1"));
//         let listId = document.getElementById(addListId).id;
//         let item = garbageImage.parentNode.innerText;
//         let index = obj[listId].indexOf(item);
//         obj[listId].splice(index, 1);
//         localStorage.setItem("board1", JSON.stringify(obj));
//         obj = JSON.parse(localStorage.getItem('board1'));
//    });

// }




// function dragAndDrop(classTask,classList){

//     function allowDrop(ev) {
//         ev.preventDefault();
//     }
    
//     function drag(ev) {
//         ev.dataTransfer.setData("text", ev.target.id);
//     }
   
//     function drop(ev) {
//         ev.preventDefault();
//         var data = ev.dataTransfer.getData("text");
//         ev.target.appendChild(document.getElementById(data));
//     }
//   [].forEach.call(classTask, function(col) {
//     col.setAttribute('draggable','true');
//     col.setAttribute('ondragstart',"drag(event)");
//  });
//   [].forEach.call(classList, function(col) {
//     col.setAttribute('ondragover','allowDrop(event)');
//     col.setAttribute('ondrop',"drop(event)");
   
//   });
// }

