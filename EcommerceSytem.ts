// Abriana Johnson
// Purpose: Full E-Commerce using TypeScript

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

// CartItem class
class CartItem {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotal(): number {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart class
class ShoppingCart {
    private items: CartItem[] = [];

    addItem(product: Product, quantity: number): void {
        if (!product.inStock) {
            console.log(`${product.name} is out of stock.`);
            return;
        }

        const existingItem = this.items.find(
            item => item.product.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new CartItem(product, quantity));
        }

        console.log(`${product.name} added to cart.`);
    }

    removeItem(productId: number): void {
        this.items = this.items.filter(
            item => item.product.id !== productId
        );
        console.log(`Item removed from cart.`);
    }

    viewCart(): void {
        if (this.items.length === 0) {
            console.log("Your cart is empty.");
            return;
        }

        console.log("\n--- Shopping Cart ---");
        this.items.forEach(item => {
            console.log(
                `${item.product.name} x${item.quantity} - $${item.getTotal()}`
            );
        });

        console.log(`Total: $${this.getTotal()}`);
    }

    getTotal(): number {
        return this.items.reduce(
            (total, item) => total + item.getTotal(),
            0
        );
    }

    checkout(): void {
        if (this.items.length === 0) {
            console.log("Cannot checkout. Cart is empty.");
            return;
        }

        console.log("\n--- Checkout ---");
        this.viewCart();
        console.log("Order confirmed! Thank you for your purchase.");

        // Clear cart after checkout
        this.items = [];
    }
}

// Store class (handles product browsing)
class Store {
    private products: Product[];

    constructor(products: Product[]) {
        this.products = products;
    }

    displayProducts(): void {
        console.log("\n--- Available Products ---");
        this.products.forEach(product => {
            console.log(
                `${product.id}: ${product.name} - $${product.price} ${
                    product.inStock ? "(In Stock)" : "(Out of Stock)"
                }`
            );
        });
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }
}

// Product Data
const productList: Product[] = [
    { id: 1, name: "Laptop", price: 999.99, inStock: true },
    { id: 2, name: "Headphones", price: 199.99, inStock: true },
    { id: 3, name: "Mouse", price: 49.99, inStock: true },
    { id: 4, name: "Keyboard", price: 89.99, inStock: false }
];

// Initialize store and cart
const store = new Store(productList);
const cart = new ShoppingCart();

// Simulated user interaction (TESTING FLOW)

// 1. Browse products
store.displayProducts();

// 2. Add items to cart
const item1 = store.getProductById(1);
const item2 = store.getProductById(2);
const item3 = store.getProductById(4); // out of stock test

if (item1) cart.addItem(item1, 1);
if (item2) cart.addItem(item2, 2);
if (item3) cart.addItem(item3, 1);

// 3. View cart
cart.viewCart();

// 4. Remove an item
cart.removeItem(2);

// 5. View updated cart
cart.viewCart();

// 6. Checkout
cart.checkout();

// 7. Verify cart is empty
cart.viewCart();
