const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe('addProduct', () => {
    it('Debe agregar un producto', () => {
        addProduct('Versace', 1100); 
        const products = getProducts(); 
        expect(products[products.length - 1]).toEqual({ 
            id: 0, 
            name: 'Versace',
            price: 1100 
        });
    });

    it('Debe arrojar un error si el nombre o el precio no están definidos', () => {
        expect(() => addProduct(null, 1100)).toThrow('El nombre y el precio deben ser definidos.');
        expect(() => addProduct('Versace', null)).toThrow('El nombre y el precio deben ser definidos.');
    });

    it('No se debe agregar dos veces', () => {
        addProduct('Versace', 1100);  
        expect(() => addProduct('Versace', 1100)).toThrow('Este producto ya ha sido agregado');
    });
});

describe('Eliminar producto', () => {
    it('Debe eliminar el producto con la identificación especificada', () => {
        addProduct('Versace', 1100);
        addProduct('Chanel', 1500);
        removeProduct(1);  
        const products = getProducts();
        expect(products.find(product => product.id === 1)).toBeUndefined();  
    });

    it('Debe arrojar un error si el producto no existe', () => {
        expect(() => removeProduct(11)).toThrow('Este producto no existe');
    });
});

describe('Obtener producto', () => {
    it('Debe encontrar el producto con la identificación específica', () => {
        addProduct('Versace', 1100);
        addProduct('Chanel', 1500);
        const product = getProduct(1);  
        expect(product).toEqual({
            id: 1,
            name: 'Versace',
            price: 1100
        });
    });

    it('Debe arrojar un error si el producto no existe', () => {
        expect(() => getProduct(11)).toThrow('Este producto no existe');
    });
});

describe('Actualizar producto', () => {
    it('Debe actualizar el producto con la identificación específica', () => {
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

    it('Debe arrojar un error si el producto no existe', () => {
        expect(() => updateProduct(3, 'Hermés', 3500)).toThrow('Este producto no existe');
    });

    it('Debe arrojar un error si el nombre o el precio no están definidos', () => {
        addProduct('Chanel', 1500);  
        expect(() => updateProduct(1, null, 1500)).toThrow('El nombre y el precio deben ser definidos.');
        expect(() => updateProduct(1, 'Chanel', null)).toThrow('El nombre y el precio deben ser definidos.');
    });
});