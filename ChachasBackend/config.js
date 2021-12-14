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
const product = db.collection("Producto");
const ingredient = db.collection("Ingrediente");
const subsidiary = db.collection("Sucursal");
const order = db.collection("Pedido");
const employee = db.collection("Empleado");
const purchase = db.collection("Compra");
const merma = db.collection("Merma");


module.exports = { firebase,product,order,ingredient,subsidiary,menu,employee,purchase,merma};