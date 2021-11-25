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
    await product.doc(idproduct).delete().then(() => {
        res = "product deleted";
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

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
};