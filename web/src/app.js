// Constantes y variables
// Example Pages
// Establece un array con las páginas de ejemplo del cliente, estableciendo el path, y el nombre corto y largo de la página
var pages = [
  { link: '/',     short: 'Home', long: 'Home'  },
  { link: '/html', short: 'HTML', long: 'HTML Link' },
  { link: '/css',  short: 'CSS',  long: 'CSS Link' },
  { link: '/php',  short: 'PHP',  long: 'PHP Link' },
  { link: '/javascript', short: 'Javascript', long: 'Javascript Link' }
];
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
// Todas las paginas posibles que contiene la carpeta views.
const choices = ['index', 'html', 'css', 'php', 'javascript'];



// Establece las vistas (por defecto, 'views') donde estaran las plantillas al directorio ./views
app.set('views', path.join(__dirname, 'views'));

// Utiliza, como directorio publico estatico (es decir, contiene ficheros inmutables y publicos, como .css), la carpeta ./public
app.use(express.static(path.join(__dirname, 'public')));
app.locals.pretty = true;

// Handlebars Configuration. Configura con los detalles necesarios el handlebars.
// Establece el motor de las vistas como hbs (handlebars)
app.set('view engine', 'hbs');
app.set('view options', { layout: 'partials' });

// Es necesario el .engine despues del exphbs
app.engine('.hbs', exphbs.engine({
  layoutsDir   : 'views/partials/',
  partialsDir  : 'views/partials/',
  defaultLayout: 'layout',
  extname      : '.hbs'
}));


// Router
// Establece a que pagina se debe redirigir segun el path que pongamos en la url.

// Si ponemos / (root):
app.get('/', function(req, res) {
  // Renderiza la página index, pasandole las paginas anteriores como objeto de contexto (similar a un parametro), para poder utilizarlo
  // dentro de la pagina.
	res.render('index', { pages: pages, layout: false  });
	console.log("choice page is index");
});

// Si ponemos /:page, donde page es una de las paginas posibles como index, javascript, php...:
app.get('/:page', function(req, res) {
  // Guardamos en una variable el parametro de entrada del request; En este caso, es el parametro page (lo podemos ver en el metodo
  // .get, donde pasamos el string /:page, indicando asi que page es un parametro y no una palabra literal).
  let page = req.params.page;
  
  // Comprobamos que la pagina a la que quiere acceder el usuario este en la carpeta views, comprobando el array de paginas guardado
  // anteriormente.
  if (choices.includes(page)) {
    // Si lo esta, cargamos esa pagina, pasando como objeto de contexto el array pages.
    res.render(page, { pages: pages, layout: false });
    console.log("choice page is " + page);
  } else {
    // si no esta, mostramos 404 PAGE NOT FOUND.
    res.send('404: Page not Found', 404);
  }
});

// Runeamos el script.
app.listen(PORT);
console.log('Express started on port 3000');



// var WebSocketServer = require('websocket').server;
// var http = require('http');
// var userArray = [];
// var id = 0;

// const userCnctn = {
// 	id:'',
// 	connection:''
// }

// function UserCnctn(id, connection) {
//     this.id = id;
// 	this.connection = connection;
// }

// var server = http.createServer(function(request, response) {
// });

// server.listen(8080, function() {});

// wsServer = new WebSocketServer ({ httpServer:server});

// wsServer.on ('request', function(request) {
// 	var connection = request.accept(null, request.origin);
// 	userArray.push(new UserCnctn(id, connection));
// 	connection.send(JSON.stringify({
// 		id:id++,
// 		type:'initID'
// 	}))
// 	connection.on('message', function(message) {
// 		if (message.type == 'utf8') {
// 			userMsg = userArray.find(user => user.connection == connection);
// 			userArray.map(user => user.connection.send(JSON.stringify({
// 				idUserMsg:userMsg.id,
// 				msgContent:message.utf8Data,
// 				type:'msg'
// 			})));	
// 		}
// 	});
// 	connection.on('close', function() {});
// });