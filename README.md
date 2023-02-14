# Proyecto-NodeJS
Proyecto NodeJS con Dockers

-- Aquí esta el codigo --

### Funcionamiento

Este proyecto funciona con un backend de NodeJS, utilizando la librería Express.js para el manejo de ficheros. Además, se utiliza un framework de frontend para
renderizar distintas vistas, montando una estructura de directorios organizando código de tal forma que evitamos duplicación de código en los distintos ficheros.
También utiliza layouts, partials y views para renderizar diferentes bloques de código de forma dinámica.

### Modos de ejecución

1. Descarga el zip, extráelo y guarda la carpeta donde la tengas localizada

2. Cuando la tengas guardada, tienes dos opciones:

 - Vía terminal en IDE (Principalmente VS Code):
    3. Abre el proyecto en VS Code, abre una terminal (Cntrl + ñ) y ejecuta "nodemon web/src/app.js" o "npm run start.dev". 
    
    4. Abre una ventana en el navegador y escribe "localhost:3000.
    
    Para usar el programa en VS Code deberás instalar primero NodeJS, y ejecutar en la terminal "npm install". Después, podrás ejecutar el programa de esa forma.

 - Vía dockers:
    3. Abre Docker Desktop.
    
    4. Abre una terminal (CMD o PowerShell) y accede a la ruta de la carpeta con cd.

    5. Ejecuta el comando "docker compose up".

    6. En el navegador, accede a "localhost:3000".

