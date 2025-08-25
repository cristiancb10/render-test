//WEB Y EXPRESS Y CORS

const cors = require('cors')
const express = require('express') //Se importa express, siendo que esta vez es una funcion
const app = express() //que se usa para crear una aplicacion express almacenada en app

app.use(cors())//SE INSTALA NPM INSTALL CORS
app.use(express.static('dist')) //Para hacer que Express muestre contenido estático, la página 
// index.html y el JavaScript, etc., necesitamos un middleware integrado de Express
app.use(express.json()) //activa el json parser que lee el cuerpo (body) de las peticiones http
//que viene en formato json y convertirlo en un objeto javascript
/*MIDDLEWARE
const requestLogger = (request, response, next) => { //las funciones de middleware deben 
    console.log('Method:', request.method) //utilizarse antes de las rutas SI SE QUIERE 
    console.log('Path:', request.path) //que sean ejecutadas por los controladores de la ruta
    console.log('Body:', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)*/

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]
//se establece una ruta que define un controlador de eventos para manejar solicitudes http get
//a la raiz de la aplicacion '/'  
app.get('/',(request, response) => {
    response.send('<h1>Hello world!</h1>')
})
//otra ruta que define un controlador de eventos para las solicitudes http get realizadas a la
//ruta notes de la aplicacion
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)//params es un objeto que contiene los parametros de la ruta 
    const note = notes.find(note => note.id === id)//definido en el endpoint /:id que sera un string
    if(note) {
        response.json(note)
    } else {
        response.status(404).end() //status() establece el estado http de la respuesta
    }                              //end() finaliza el proceso de respuesta
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.end(204).end() //204 no content
})

const generateId = () => {
    const maxId = notes.length > 0 // ... es un spread operator este toma ese aray y lo expande
        ? Math.max(...notes.map(note => note.id)) //en una lista de valores, porque math.max no
        : 0  //acepta arrays sino una lista de argumentos separados (por comas)
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content) { //si algun valor es nulo o esta vacio
        return response.status(400).json({
            error: 'content missing'
        })

    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)
//    console.log(request.headers)
    response.json(note)
})
//MIDDLEWARE se agrega despues de las rutas cuando solo son llamadas sin ningun controlador
//de ruta se encarga de la solicitud HTTP
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//SERVIDOR WEB SIMPLE

/*const http = require('http')

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

const App = http.createServer((request, response) => {
    response.writeHead(200, { "content-type": 'application/json' })
    response.end(JSON.stringify(notes))
})

const PORT = 3001
App.listen(PORT)
console.log(`Server running on port ${PORT}`)*/

//modulo: conjunto de funciones o componentes que estan integrados directamente con node
//Se importa un modulo nativo http de node que permita crear un servidor web
//require('http') carga el modulo y los asigna a la variable http
/*const http = require('http') 
//http.createServer: crea un servidor http que escucha peticiones
//esta funcion => recibe como argumento un callback (osea una funcion) que se ejecuta cada vez
//que el servidor recibe una solicitud request 
//Argumemto request: objeto que representa la peticion que hizo el cliente (postman) (contien info)
//Argumento response: objeto quese usa para enviar la respuesta devuelta al cliente
const App = http.createServer((request, response) => {
//dentro del callback se envian los encabezados (estado 200 ok y objeto con encabezados http que 
//determina que contenido se enviara en texto plano) 
    response.writeHead(200, { "content-type": 'text/plain' })
//finaliza la respuesta con un mensaje
    response.end('Hello world')
})

const PORT = 3001
//El servidor (App) comienza a escuchar las solicitudes que lleguen a ese puerto PORT
App.listen(PORT)
console.log(`Server running on port ${PORT}`) //se imprime un mensaje de confirmacion*/