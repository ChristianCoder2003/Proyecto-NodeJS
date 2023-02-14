// Constantes y variables
// Objeto data, que pasaremos como objeto de contexto a las diferentes páginas para renderizar el navbar.
// Establece un objeto data con un array de las páginas de ejemplo del cliente, estableciendo el path, el nombre, y el logo rellenado y sin relleno,
// y currentPage, que representa la url de la página actual, donde está el usuario
var data = {
  pages: [
    { link: '/', name: 'Home', logo: 'home-outline', logo_selected: 'home'},
    { link: '/inbox', name: 'Mensajes', logo: 'chatbubble-outline', logo_selected: 'chatbubble'},
    { link: '/profile', name: 'Perfil', logo: 'person-outline', logo_selected: 'person'},
    { link: '/notifications', name: 'Notificaciones', logo: 'notifications-outline', logo_selected: 'notifications'}
  ],
  currentPage: ''
};
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = 3000;

// Todas las paginas posibles que contiene la carpeta views.
const choices = ['index', 'inbox', 'profile', 'notifications'];

// Establece las vistas (por defecto, 'views') donde estaran las plantillas al directorio ./views
app.set('views', path.join(__dirname, 'views'));

// Utiliza, como directorio publico estatico (es decir, contiene ficheros inmutables y publicos, como .css), la carpeta ./public
app.use(express.static(path.join(__dirname, 'public')));
app.locals.pretty = true;

// Handlebars Configuration. Configura con los detalles necesarios el handlebars.
// Establece el motor de las vistas como hbs (handlebars)
app.set('view engine', 'hbs');

// Es necesario el .engine despues del exphbs, ya que configuramos el motor con un callback, añadiendo configuraciones propias al
// propio motor.
app.engine('.hbs', exphbs.engine({
  // Extensión de los archivos que vamos a utilizar como vistas (ya que pueden ser, por ejemplo, .hbs o .handlebars)
  extname: 'hbs', 
  
  // Layout por defecto. El layout es la vista que comparte la estructura de todas las páginas, llamando a múltiples partials para
  // tener una estructura compartida por todas las vistas y evitar duplicar ficheros y código.
  defaultLayout: 'main',
  
  // Configuramos el path del directorio de layouts 
  layoutsDir: __dirname + '/views/layouts/',
  
  // Configuramos el path del directorio de partials. Un partial es un bloque que se repite en múltiples vistas. La diferencia entre partial
  // y layout es que el partial es únicamente un bloque (por ejemplo, navbar, footer...), mientras que el layout recoge todos los bloques que
  // hay en común en distintas vistas para hacer una sola estructura sin repetir código en los múltiples ficheros (puesto que navbar, footer... 
  // se repiten en todos los ficheros, creamos un layout que contenga estas dos estructuras, y basamos las vistas en ese layout). 
  partialsDir: __dirname + '/views/partials/',
  
  // Definimos helpers (funciones) para poder utilizarlas en el .hbs
  helpers: {
    // Helper isEqual, para comparar dos variables como condicional
    isEqual: function(a, b, options) {if(a === b) {return options.fn(this)} else {return options.inverse(this)}}
  }
}));

// Router
// Establece a que pagina se debe redirigir segun el path que pongamos en la url.
// Si ponemos / (root):
app.get('/', function(req, res) {
  // Guardamos en el atributo currentPage de data la url actual, requerida por el usuario
  data.currentPage = req.url;
  
  // Renderiza la página index, pasandole el objeto data (con el array de paginas y la pagina actual) como objeto de contexto 
  // (similar a un parametro), para poder utilizarlo dentro de la pagina.
	res.render('index', { data: data});
});

// Si ponemos /:page, donde page es una de las paginas posibles como index, javascript, php...:
app.get('/:page', function(req, res) {
  // Guardamos en una variable el parametro de entrada del request; En este caso, es el parametro page (lo podemos ver en el metodo
  // .get, donde pasamos el string /:page, indicando asi que page es un parametro y no una palabra literal).
  let page = req.params.page;

  // Guardamos en el atributo currentPage de data la url actual, requerida por el usuario
  data.currentPage = req.url;

  // Comprobamos que la pagina a la que quiere acceder el usuario este en la carpeta views, comprobando el array de paginas guardado
  // anteriormente.
  if (choices.includes(page)) {
    // Si lo esta, cargamos esa pagina, pasando como objeto de contexto el array pages.
    res.render(page, { data: data});
  } else {
    // Si no esta, mostramos 404 PAGE NOT FOUND.
    res.status(404).render('404', {layout: false});
  }
});

// Runeamos el script.
app.listen(PORT);
console.log('Express started on port 3000');