const content = document.getElementById('content');
const postContent = document.getElementById('postContent');
var file = "scripts/index.txt"
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
