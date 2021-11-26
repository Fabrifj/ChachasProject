const {product} = require('./config');

async function getAllProducts(){
    const snapshot = await product.get();
    const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return list;
}

async function createProduct(body){
    await product.add(body);
    return body;
}

async function deleteProduct(idproduct){
    var res = null;
    await product.doc(idproduct).delete().then((doc) => {
        res ="deleted"
    }).catch((error) => {
        res = "Error deleting product"
    });
    return res;
}

async function updateProduct(idproduct, body){
    var res = null
    await product.doc(idproduct).update(body).then(() => {
        res = body;
    }).catch((error) => {
        res = "Error updating product"
    });
    return res;
}

// get product by id
async function getProductById(idproduct){
    var res = null
    await product.doc(idproduct).get().then((doc) => {
        if (doc.exists) {
            res = { id: doc.id, ...doc.data() }
            console.log("Informacion de la compra:", doc.data());
          } else {
            respuesta = "La compra no existe";
            console.log("La compra no existe");
          }
    }).catch((error) => {
        res = "Error retrieving product"
    });
    return res;
}
// update inventory after sale
async function updateProductAfterSale(idproduct, quantity){
    var res = null
    var productToUpdate = await getProductById(idproduct)
    console.log(productToUpdate)
    productToUpdate.CantidadInventario = parseInt (productToUpdate.CantidadInventario, 10) - quantity
    await product.doc(idproduct).update(productToUpdate).then(() => {
        res = productToUpdate;
    }).catch((error) => {
        res = "Error updating product"
    });
    return res;
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    updateProductAfterSale
};