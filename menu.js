const style = document.createElement("style");
style.innerHTML = `
body { font-family: Arial, sans-serif; margin: 0; padding: 0; font-size: 14px; }
.container { max-width: 1200px; margin: 20px auto; padding: 0 20px; }
.menu { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 15px; }
.menu-column { width: 30%; padding: 10px; background-color: #000; border: 1px solid #ddd; border-radius: 8px; font-size: 13px; }
.menu-column h2 { text-align: center; color: #fff; font-size: 16px; }
.menu-column .price { color: #007BFF; font-weight: bold; font-size: 14px; }
button { color: blue; border: none; padding: 8px; cursor: pointer; border-radius: 5px; font-size: 14px; }
.cart { margin-top: 20px; padding: 10px; background-color: #f4e2cc; border: 1px solid #ddd; border-radius: 8px; }
.cart-item { display: flex; justify-content: space-between; }
.cart-total { font-weight: bold; }
/* Responsive Design */
@media (max-width: 1024px) {
    .menu-column { width: 45%; } /* On tablets, two items per row */
}

@media (max-width: 768px) {
    .menu-column { width: 100%; } /* On mobile, one item per row */
    .container { padding: 0 10px; }
    body { font-size: 12px; } /* Slightly smaller text */
    button { padding: 6px; font-size: 12px; }
}
`;

document.head.appendChild(style);

console.log('Menu.js script is executing'); // Additional log for debugging
// Cart array to hold items

let cart = [];

console.log('Page Loaded'); // Log when the page is loaded
console.log('Menu.js script is executing'); // Additional log for debugging

// Function to display the menu
const menuItems = [
    {
        name: "Gold Service",
        price: 55.00,
        quantity: 0,
        minOrder: 50,
        menu: "Fried Rice, Jollof Rice, Moi-Moi, Boiled Rice, Pounded Yam, Eba, Amala, Beans, Porridge & Stew, Iyan, Vegetable Stew, Egusi Stew, Garnished Chicken, Garnished Beef, Garnished Fish, Puff-Puff, Chin-Chin, Meat Pie, Spring Rolls, Noodles, Lasagna, Pepper Soup, Assorted Soups, Ayamase, Ofada Stew, Gbegiri & Ewadu, Fried Plantain, Dodo & Gizzard, Meat on Skewers (Beef, Chicken or Gizzard)",
        starters: "Puff-puff, Spring roll, Chicken wings, Prawns",
        staffing: "x4 with Chafing Dishes & Fuels, Serving Spoons, Set Up & Serve (Excluding Transport charges)"
    },
    {
        name: "Silver Service",
        price: 42.50,
        quantity: 0,
        minOrder: 50,
        menu: "Jollof Rice, Fried Rice, Stir Fry Noodles, Pottage, Iyan & Vegetable Stew, Beef in Pepper Garnishing, Chicken in Pepper Garnishing, Fried Chicken, Fried Fish, Beans and Stew, Salad, Moi-Moi, Plantain",
        starters: "Puff-puff, Spring roll, Chicken wings",
        staffing: "x2 with Chafing Dishes, Fuels, Serving Spoons, Set Up & Serve (Excluding Transport charges)"
    },
    {
        name: "Bronze Service",
        price: 37.50,
        quantity: 0,
        minOrder: 50,
        menu: "Jollof Rice, Fried Rice, Stir Fry Noodles, Garnished Beef in Stew, Garnished Chicken in Stew, Iyan & Vegetable Stew, Fried Chicken, Salad, Plantain",
        starters: "Puff-puff, Spring roll, Chicken wings",
        staffing: "x2 with Chafing Dishes, Fuels, Serving Spoons, Set Up & Serve (Excluding Delivery charges)"
    },
    {
        name: "Children Party",
        price: 40.00,
        quantity: 0,
        minOrder: 30,
        menu: "Mini Burgers, Hot Dogs, Chicken Nuggets, Fries, Pizza Slices, Cupcakes, Juice Boxes",
        starters: "Fruit Skewers, Mini Sausages, Popcorn",
        staffing: "x2 with Disposable Plates & Cutlery, Set Up & Serve"
    },
    {
        name: "Breakfast 1",
        price: 25.00,
        quantity: 0,
        minOrder: 20,
        menu: "Pancakes, Scrambled Eggs, Bacon, Sausages, Toast, Baked Beans, Tea & Coffee",
        starters: "Fruit Salad, Yogurt Parfaits",
        staffing: "x1 with Chafing Dishes, Set Up & Serve"
    },
    {
        name: "Breakfast 2",
        price: 25.00,
        quantity: 0,
        minOrder: 20,
        menu: "Oatmeal, Waffles, Omelets, Hash Browns, Fresh Juice, Herbal Tea",
        starters: "Granola Bars, Smoothie Bowls",
        staffing: "x1 with Chafing Dishes, Set Up & Serve"
    },
    {
        name: "Caribbean Food",
        price: 40.00,
        quantity: 0,
        minOrder: 40,
        menu: "Jerk Chicken, Rice & Peas, Fried Plantains, Curried Goat, Callaloo, Roti, Saltfish & Ackee",
        starters: "Fried Dumplings, Patties",
        staffing: "x3 with Chafing Dishes, Fuels, Serving Spoons, Set Up & Serve"
    },
    {
        name: "Finger Foods and Cooler/Pot/Tray Service",
        price: 40.00,
        quantity: 0,
        minOrder: 40,
        menu: "Meat Pies, Spring Rolls, Chicken Wings, Puff-Puff, Mini Sandwiches, BBQ Skewers",
        starters: "Assorted Dips, Cheese Platter",
        staffing: "Self-service packaging, Trays & Pots Provided"
    },
    {
        name: "Extra Breakfast Menu",
        price: 25.00,
        quantity: 0,
        minOrder: 20,
        menu: "Oatmeal, Waffles, Omelets, Hash Browns, Fresh Juice, Herbal Tea",
        starters: "Granola Bars, Smoothie Bowls",
        staffing: "x1 with Chafing Dishes, Set Up & Serve"
    }
];

// Function to display the menu
function displayMenu() {
    const menuContainer = document.getElementById("menuList");
    console.log('Menu container element:', menuContainer); // Log menu container element

    if (!menuContainer) {
        console.error('Menu container not found');
        return; // Exit if the menu container does not exist
    }

    menuItems.forEach(item => {
        const menuDiv = document.createElement("div");
        menuDiv.classList.add("menu-column");
        menuDiv.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>Price:</strong> <span class="price">£${item.price} per head</span></p>
           <p><strong>Minimum Order:</strong> ${item.minOrder} People</p>
            <p><strong>Menu:</strong> ${item.menu}</p>
            <p><strong>Starters:</strong> ${item.starters}</p>
            <p><strong>Staffing:</strong> ${item.staffing}</p>
            <button 
            <input type="number" id="quantity-${item.name}" min="${item.minOrder}" value="1" />
            <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>

        `;
        menuContainer.appendChild(menuDiv);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('DOMContentLoaded event triggered'); // Log to confirm DOMContentLoaded execution

    displayMenu(); // Call the function to display the menu
    console.log('Menu displayed successfully'); // Log success message
});

// Function to add items to the cart
function addToCart(item) {
    const cartCountElement = document.getElementById("cartCount");
    const cartContainer = document.getElementById("cartList");

    if (!cartContainer) {
        console.error('Cart container not found');
        return; // Exit if the cart container does not exist
    }

    const quantityInput = document.getElementById(`quantity-${item.name}`);
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1; // Get quantity from input or default to 1
    console.log(`Adding ${quantity} of ${item.name} to cart.`); // Log quantity being added

    console.log(`Adding ${quantity} of ${item.name} to cart.`); // Log quantity being added

    console.log(`Adding ${quantity} of ${item.name} to cart.`); // Log quantity being added

    console.log(`Adding ${quantity} of ${item.name} to cart.`); // Log quantity being added


    // Remove the minimum order alert


    const existingItem = cart.find(cartItem => cartItem.name === item.name); // Check if item already in cart
    cartCountElement.innerText = cart.length; // Update cart count


    if (existingItem) {
        existingItem.quantity += quantity; // Increase quantity if item already in cart
    } else {
        cart.push({ ...item, quantity }); // Add new item to cart with specified quantity



    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already in cart
    } else {
        cart.push({ ...item, quantity: 1 }); // Add new item to cart
    }
    cartCountElement.innerText = cart.length; // Update cart count
    toggleCartDisplay(); // Show cart display when an item is added
    updateCartDisplay();
}

    console.log('Cart updated:', cart); // Log the current state of the cart
    cartCountElement.innerText = cart.length; // Update cart count

    console.log('Current cart count:', cart.length); // Log the current count of items in the cart

    toggleCartDisplay(); // Show cart display when an item is added

    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById("cartList");
    cartContainer.innerHTML = ""; // Clear previous cart items
    let total = 0;

    cart.forEach(cartItem => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML = `
            <span>${cartItem.name} (x${cartItem.quantity}) - £${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
            <button onclick='removeFromCart("${cartItem.name}")'>Remove</button>
        `;
        cartContainer.appendChild(cartDiv);
        total += cartItem.price * cartItem.quantity; // Calculate total
    });

    const totalDiv = document.createElement("div"); // Create total display
    totalDiv.classList.add("cart-total");
    totalDiv.innerHTML = `Total: £${total.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);

    // Add checkout button
    const checkoutButton = document.createElement("button"); // Create checkout button
    checkoutButton.innerText = "Checkout";
    checkoutButton.onclick = checkout; // Add checkout functionality
    cartContainer.appendChild(checkoutButton);
}

// Function to remove items from the cart
function removeFromCart(itemName) {
    cart = cart.filter(cartItem => cartItem.name !== itemName);
    console.log('Cart after removal:', cart); // Log the current state of the cart
    console.log('Current cart count after removal:', cart.length); // Log the current count of items in the cart

    updateCartDisplay();
}

function toggleCartDisplay() {
    const cartContainer = document.getElementById("cartList");
    cartContainer.style.display = cartContainer.style.display === "none" ? "block" : "none"; // Toggle cart visibility
    updateCartDisplay(); // Update cart display when toggled
}

// Function to handle checkout
async function checkout() {
    const itemsToCheckout = cart.map(cartItem => ({
        name: cartItem.name,
        amount: Math.round(cartItem.price * cartItem.quantity * 100), // Amount in pence
        quantity: cartItem.quantity
    }));

    try {
        const response = await fetch("http://localhost:5000/create-checkout-session", {
            body: JSON.stringify({
                items: itemsToCheckout,
                currency: "GBP"
            })
        });

        const data = await response.json();

        if (response.ok && data.url) {
            alert("Redirecting to payment...");
            window.location.href = data.url; // Redirect to Stripe Checkout
        } else {
            alert("Error creating payment session");
            console.error(data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};  