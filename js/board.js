//Modal
window.onload = function() {
    let modal = document.querySelector(".modal");
    let trigger = document.querySelector(".trigger");
    let createBoard = document.querySelector(".createBoard");

    let mainBoard=document.querySelector(".mainBoard");// modal for Boards name
    let triggerBoard = document.querySelector(".triggerBoard");// My Boards button

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }
    function toggleBoardModal() {
        mainBoard.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
        else if(event.target === mainBoard)
        {
            toggleBoardModal();
        }
    }

    trigger.addEventListener("click", toggleModal);
   
    createBoard.addEventListener("click", toggleModal);

    triggerBoard.addEventListener("click",toggleBoardModal);
    window.addEventListener("click", windowOnClick);
    myBoards();
}



function createBoard() {
    var boardName = document.getElementById("name").value;

    var listName = {
        length: 0,
    };
    localStorage.setItem(boardName, JSON.stringify(listName));
    var board = localStorage.getItem(boardName);
}

function myFunction() {
    var param = event.currentTarget.text;
    window.location = 'file:///C:/Users/LabUser28/Desktop/New-Trello-master/main.html?Board-Name=' + param;
}

function myBoards() {
    for (var i = 0; i < localStorage.length - 1; i++) {
        let boardName = document.createElement("a");
        boardName.onclick = myFunction;
        boardName.classList.add("modalBoardName");
        var text = document.createTextNode(localStorage.key(i));
        boardName.appendChild(text);
        document.querySelector(".modalBoard").appendChild(boardName);

    }
}
 