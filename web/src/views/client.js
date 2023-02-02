// const inpText = document.getElementById('inpText');
// const submit = document.getElementById('submit');
// const container = document.getElementById('container');
// var userID;
// var socket = new WebSocket('ws://127.0.0.1:8080');

// socket.onopen = function () {
//     console.log('Socket has been opened');
// }

// socket.addEventListener('close', function(e) {
//     console.log('Socket has been closed: ', e);
// })

// socket.onmessage = message => {
//     msgJSON = JSON.parse(message.data);
//     if (msgJSON.type == 'initID') {
//         userID = msgJSON.id;
//     } else if (msgJSON.type == 'msg') {
//         let newP = document.createElement('p');
//         newP.innerHTML = msgJSON.msgContent;
//         newP.classList.add((parseInt(msgJSON.idUserMsg) == userID) ? 'own-msg' : 'other-msg');
//         container.append(newP);
//     }
// }

// socket.onerror = error => console.log('Error: ', error);

// submit.addEventListener('click', function () {
//     socket.send(inpText.value);
// })



const content = document.getElementById('content');
const postContent = document.getElementById('postContent');
var file = "index.txt"
printFileContent();

function printFileContent(){
    for (let i = 0; i < 10; i++) {
        fetch (file)
        .then(fileContent => fileContent.text())
        .then(text => postContent.innerHTML += text);
    }
    
}   

content.addEventListener('scroll', function(){
    let scrollTop = content.scrollTop;//posicio del scroll a la pantalla
    let docHeight = content.clientHeight;//llargada de la pantalla total, vol dir fent srcoll(dinamica), va canvian, ja que el scroll cada vegada és més gran
    let winHeight = postContent.clientHeight;//llargada de la pantalla sense fer scroll(fixa)
    let scrollPercent = (scrollTop) / (winHeight - docHeight);
    let scrollPercentRounded = Math.round(scrollPercent*100);

    if(scrollPercentRounded >= 90){
        printFileContent();
    }
});
