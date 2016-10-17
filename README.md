# Práctica 2. Sistemas y Tecnologías Web

## Creación de un Paquete NPM

El objetivo de esta práctica es crear un package NodeJS y publicarlo en npm, cuya finalidad será la creación de una estructura inicial 
que permita al usuario desplegar un gitbook rápidamente.

- Ejecutable 'gitbook-start'
- Plantilla con la estructura inicial del libro
- Pasar argumentos por línea de comandos
- Publicar paquete en npm


### Pasos a seguir: 

- Para instalar este módulo o paquete debemos ejecutar el siguiente comando de forma global:
    
    ```
        $ npm install -g gitbook-start-josue-nayra
    ```

- Construir el libro mediante el comando siguiente: 
    
    ```
        $ gitbook-start [options] -d 
    ```
    Opciones posibles:
        
        -d <directorio en el que se desplegará el libro>
        
        --autor <autor del libro>
        
        --name  <nombre del libro>
        
        --url <url del repositorio en github>
    
    ***En la opción "--url" es obligatorio introducir la url del repositorio en el que se desea desplegar el libro, ya que esta opción NO se rellena por defecto.***

   Una vez ejecutado, se creará el correspondiente directorio cuyo contenido será una estructura inicial a partir de la cual podemos configurar nuestro gitbook.

- A continuación, se deberá colocar en el directorio creado e instalar todas las dependencias necesarias:

    ```bash 
        $ npm install
    ```

- Después de realizar modificaciones en su libro, el usuario deberá actualizar el repositorio en Github y ejecutar el despliegue(publicar en la rama gh-pages): 
    1.-
        ```
        gulp push
        ```
    2.-
        ```
        gulp deploy
        ```

### Tareas del gulp para el usuario
    
 - Instalar recursos: Tarea que le permite al usuario instalar dependencias y plugins necesarios.
 ```
    gulp instalar_recursos
 ```
 
 - Push: Actualización del repositorio en Github. En el caso de que sea el push inicial, se ejecutará un git init y se añadirá un repositorio "origin" remoto tomando como url la dispuesta en el package.json
   ```
    gulp push
   ```
 
 - Deploy: Comprende la instalación de los recursos necesarios para el despliegue del gitbook, actualización de repositorio, despliegue del mismo en gh-pages. 
  ```
    gulp deploy
  ```
  
 - Default: Tarea por defecto que al ejecutarse llama a la tarea deploy descrita previamente.
  ```
    gulp
  ```

### Enlaces

- [Campus virtual](https://campusvirtual.ull.es/1617/course/view.php?id=1175)

- [Descripción de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicanm.html)

- [Publicación del paquete en npm](https://www.npmjs.com/package/gitbook-start-josue-nayra)

- [Repositorio en Github.com](https://github.com/ULL-ESIT-SYTW-1617/creacion-de-paquetes-y-modulos-en-nodejs-josue-nayra)



### Referencias

- [Tutorial para publicar paquetes nodejs](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/nodejspackages.html)

- [Gulp](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/gulp/)

- [Uso de templates](https://www.npmjs.com/package/ejs)

- [Fyle System de Nodejs para el manejo de archivos](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/fs.html)

- [Construyendo package.json](https://docs.npmjs.com/files/package.json)



### Integrantes

- Josué Toledo Castro
    [Github personal](www.github.com/JosueTC94)
- María Nayra Rodríguez Pérez
    [Github personal](www.github.com/alu0100406122)