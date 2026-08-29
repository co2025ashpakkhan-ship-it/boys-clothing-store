const products = [

    {
        id: 1,
        name: "Essential Oversized Tee",
        category: "T-Shirts",
        price: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
        tag: "BESTSELLER"
    },

    {
        id: 2,
        name: "Classic Oxford Shirt",
        category: "Shirts",
        price: 1299,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
        tag: "NEW"
    },

    {
        id: 3,
        name: "Relaxed Blue Jeans",
        category: "Jeans",
        price: 1799,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80",
        tag: "POPULAR"
    },

    {
        id: 4,
        name: "Minimal Bomber Jacket",
        category: "Jackets",
        price: 2299,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
        tag: "NEW"
    },

    {
        id: 5,
        name: "Heavyweight Black Tee",
        category: "T-Shirts",
        price: 899,
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80",
        tag: ""
    },

    {
        id: 6,
        name: "Linen Casual Shirt",
        category: "Shirts",
        price: 1499,
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80",
        tag: ""
    },

    {
        id: 7,
        name: "Straight Fit Denim",
        category: "Jeans",
        price: 1899,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
        tag: ""
    },

    {
        id: 8,
        name: "Utility Overshirt",
        category: "Jackets",
        price: 1999,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80",
        tag: ""
    }

];


let cart = JSON.parse(
    localStorage.getItem("urbanboyCart")
) || [];


let currentCategory = "All";


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = products) {

    const container =
        document.getElementById("products");


    if (list.length === 0) {

        container.innerHTML = `
            <div class="no-products">
                No products found.
            </div>
        `;

        return;
    }


    container.innerHTML = list.map(product => {

        return `

            <div class="product">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    ${
                        product.tag
                            ? `<span class="badge">${product.tag}</span>`
                            : ""
                    }

                </div>


                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="category">
                        ${product.category}
                    </p>


                    <div class="product-bottom">

                        <span class="price">
                            ₹${product.price.toLocaleString("en-IN")}
                        </span>


                        <button
                            class="add-btn"
                            onclick="addToCart(${product.id})">

                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>

        `;

    }).join("");

}


/* ================= FILTER ================= */

function filterCategory(category) {

    currentCategory = category;


    let filtered;


    if (category === "All") {

        filtered = products;

    } else {

        filtered = products.filter(
            product =>
                product.category === category
        );

    }


    displayProducts(filtered);


    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= SEARCH ================= */

function showSearch() {

    document
        .getElementById("searchBox")
        .classList.toggle("show");

}


function searchProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search) ||

                product.category
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                currentCategory === "All" ||
                product.category === currentCategory;


            return matchesSearch &&
                   matchesCategory;

        });


    displayProducts(filtered);

}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    showToast("Added to cart 🛒");

}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "urbanboyCart",
        JSON.stringify(cart)
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;


    displayCart();

}


/* ================= DISPLAY CART ================= */

function displayCart() {

    const container =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        container.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;


        document.getElementById(
            "cartTotal"
        ).textContent = "₹0";


        return;
    }


    let total = 0;


    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );


            if (!product) return "";


            const itemTotal =
                product.price *
                item.quantity;


            total += itemTotal;


            return `

                <div class="cart-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >


                    <div class="cart-item-info">

                        <h4>
                            ${product.name}
                        </h4>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>


                        <div class="qty">

                            <button
                                onclick="changeQuantity(${product.id}, -1)">
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${product.id}, 1)">
                                +
                            </button>

                        </div>


                        <button
                            class="remove"
                            onclick="removeFromCart(${product.id})">

                            Remove

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    document.getElementById(
        "cartTotal"
    ).textContent =
        "₹" + total.toLocaleString("en-IN");

}


/* ================= QUANTITY ================= */

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    updateCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("open");


    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("open");


    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty!"
        );

        return;
    }


    document
        .getElementById("paymentModal")
        .style.display = "flex";

}


/* ================= CLOSE PAYMENT ================= */

function closePayment() {

    document
        .getElementById("paymentModal")
        .style.display = "none";

}


/* ================= PAYMENT DONE ================= */

function paymentDone() {

    showToast(
        "Payment confirmation received! ✅"
    );


    setTimeout(() => {

        closePayment();

    }, 1500);

}


/* ================= NEWSLETTER ================= */

function subscribe(event) {

    event.preventDefault();


    showToast(
        "Thanks for joining UrbanBoy!"
    );


    event.target.reset();

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


/* ================= INITIALIZE ================= */

displayProducts();

updateCart();