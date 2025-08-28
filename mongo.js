//Se carga la libreria de mongoose que hace de puente entre Node.js y MongoDB
const mongoose = require('mongoose')
//process.argv = es un arreglo que guarda los argumentos pasados en la terminal npm mongo.js "pw"
if (process.argv.length<3) { //si es menor a 3 osea si falta un elemento imprime el mensaje 
    console.log('give password as argument') //de error 
    process.exit(1)//funcion que termina en proceso (0: exito sin errores 1: error general
} // 2: uso incorrecto del comando)
//los argumentos son 1: ruta a node, 2: ruta al archivo JS, 3: el primer argumento enviado (password)
const password = process.argv[2] //guarda el argumento enviado en password
//password fullstack123
//guarda en URL el uri de mongodb atlas (la cadena de conexion)
const url = 
    `mongodb+srv://fullstack:${password}@cluster0.cauhw6m.mongodb.net/NoteApp?retryWrites=true&w=majority&appName=Cluster0`
//significa que No sea estricto cuando acepta campos, ESTOS PUEDEN O NO EXISTIR, EN LAS QUERYS 
mongoose.set('strictQuery', false)
//abre la conexion entre la aplicacion node y atlas
mongoose.connect(url)
//un schema define la estructura de los documentos en una coleccion
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
//crea un modelo que conecta el codigo con una coleccion en mongodb
const Note = mongoose.model('Note', noteSchema)//Note sera un objeto JS que representa la 
//coleccion notes en mongodb (el 'Note' se transforma en minuscula y plural en MONGODB)
//crea un documento basado en el modelo Note
const note = new Note({
    content: 'Mongoose makes things easy',
    important: true,
})
//guarda el documento en la DB con el metodo asincrono save
note.save().then(result => { //cuando la promesa se resuelve significa el dato se se ha guardado
    console.log('note saved!')
    //el parametro de find es un objeto que expresa condiciones de busqueda y como ({}) esta vacio 
    //devuelve todas los documentos 
    Note.find({}).then(result => { //Solo importantes Note.find({ important: true }).then(result =>
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()//cierra la conexion con la base de datos
    })
})

