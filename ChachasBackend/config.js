const firebase = require('firebase')
const firestore = require('firebase/firestore')

// Configuracion Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBaYLt0HTHh6KMWc0bgXLwlkEcLhgr2dCM",
    authDomain: "chachas-95493.firebaseapp.com",
    projectId: "chachas-95493",
    storageBucket: "chachas-95493.appspot.com",
    messagingSenderId: "968365837839",
    appId: "1:968365837839:web:73d090ad4b9d7544f29d7a"
  };


// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
// Acceder a Firestore
const db = firebase.firestore();

// Obtener las colecciones necesarias
const menu = db.collection("Menu");
const producto = db.collection("Producto");
const ingrediente = db.collection("Ingrediente");
const sucursal = db.collection("Sucursal");
const pedido = db.collection("Pedido");


module.exports = { firebase,producto,pedido,ingrediente,sucursal,menu};