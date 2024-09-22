const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe('addProduct', () => {
    it('You must add a product', () => {
        addProduct('Versace', 1100); 
        const products = getProducts(); 
        expect(products[products.length - 1]).toEqual({ 
            id: 0, 
            name: 'Versace',
            price: 1100 
        });
    });

    it('Should throw an error if name or price is not defined', () => {
        expect(() => addProduct(null, 1100)).toThrow('El nombre y el precio deben ser definidos.');
        expect(() => addProduct('Versace', null)).toThrow('El nombre y el precio deben ser definidos.');
    });

    it('Should not be added twice', () => {
        addProduct('Versace', 1100);  
        expect(() => addProduct('Versace', 1100)).toThrow('Este producto ya ha sido agregado');
    });
});

describe('Delete product', () => {
    it('You must delete the product with the specified ID', () => {
        addProduct('Versace', 1100);
        addProduct('Chanel', 1500);
        removeProduct(1);  
        const products = getProducts();
        expect(products.find(product => product.id === 1)).toBeUndefined();  
    });

    it('Should throw an error if the product does not exist', () => {
        expect(() => removeProduct(11)).toThrow('Este producto no existe');
    });
});

describe('Get product', () => {
    it('You must find the product with the specific ID', () => {
        addProduct('Versace', 1100);
        addProduct('Chanel', 1500);
        const product = getProduct(1);  
        expect(product).toEqual({
            id: 1,
            name: 'Versace',
            price: 1100
        });
    });

    it('Should throw an error if the product does not exist', () => {
        expect(() => getProduct(11)).toThrow('Este producto no existe');
    });
});

describe('Update product', () => {
    it('You must update the product with the specific ID', () => {
        addProduct('Versace', 1100);
        addProduct('Chanel', 1500);
        updateProduct(1, 'Hermés', 3500);  
        const products = getProducts();
        expect(products.find(product => product.id === 1)).toEqual({
            id: 1,
            name: 'Hermés',
            price: 3500
        });
    });

    it('Should throw an error if the product does not exist', () => {
        expect(() => updateProduct(3, 'Hermés', 3500)).toThrow('Este producto no existe');
    });

    it('Should throw an error if name or price is not defined', () => {
        addProduct('Chanel', 1500);  
        expect(() => updateProduct(1, null, 1500)).toThrow('The name and price must be defined.');
        expect(() => updateProduct(1, 'Chanel', null)).toThrow('The name and price must be defined.');
    });
});