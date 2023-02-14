// Constantes y variables
const content = document.getElementById('content');
const postContent = document.getElementById('postContent');
var file = "scripts/index.txt"
// Ejecutamos la función para mostrar 10 veces el contenido al cargar la página
printFileContent();

// Función para mostrar el contenido del fichero file 10 veces 
function printFileContent(){
    for (let i = 0; i < 10; i++) {
        fetch (file)
        .then(fileContent => fileContent.text())
        .then(text => postContent.innerHTML += text);
    }
    
}   

// Event listener para mostrar más contenido a medida que vas haciendo scroll (>=90%)
content.addEventListener('scroll', function(){
    // Posición del scroll del elemento, nº de píxeles que ha sido desplazado hacia arriba
    let contentScrollTop = content.scrollTop;
    let contentHeight = content.clientHeight;
    let postContentHeight = postContent.clientHeight;
    // Porcentaje del scroll en pantalla redondeado
    let scrollPercent = (contentScrollTop) / (postContentHeight - contentHeight);

    let scrollPercentRounded = Math.round(scrollPercent * 100);
    // Si el porcentaje es mayor que 90, imprime otra vez las 10 filas; Así siempre hay contenido que ver
    console.log(contentScrollTop, contentHeight, postContentHeight, scrollPercentRounded)
    if(scrollPercentRounded >= 90){
        printFileContent();
    }
});
