

document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');
    const clearCartButton = document.getElementById('clear-cart');
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const cartElement = document.getElementById('cart');
    const cartCountElement = document.getElementById('cart-count');
    let cartCount = 0;

    // Cập nhật giỏ hàng
    function updateCart() {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $<span class="item-price">${item.price.toFixed(2)}</span> <button class="remove-item" data-index="${index}">Xóa</button>`;
            cartItems.appendChild(li);
        });

        // Thêm sự kiện xóa sản phẩm
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1);
                cartCount--;
                updateCart();
            });
        });

        updateTotalPrice();
        cartCountElement.textContent = cart.length;
    }

    // Cập nhật tổng giá tiền
    function updateTotalPrice() {
        let total = 0;
        cartItems.querySelectorAll('li').forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
            total += price;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    // Thêm sản phẩm vào giỏ hàng
    function addItemToCart(name, price) {
        cart.push({ name, price });
        cartCount++;
        updateCart();
    }

    // Hiển thị/ẩn giỏ hàng
    cartIcon.addEventListener('click', function(event) {
        event.preventDefault();
        cartElement.classList.toggle('show');
    });

    // Thêm sản phẩm vào giỏ hàng khi nhấn vào biểu tượng giỏ hàng
    document.querySelectorAll('.fa-shopping-cart').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const product = this.closest('.slide');
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('.new-price').innerText.replace('$', ''));
            addItemToCart(productName, productPrice);
        });
    });

    // Xóa toàn bộ giỏ hàng
    clearCartButton.addEventListener('click', function() {
        cart.length = 0;
        cartCount = 0;
        updateCart();
    });

    // Hiển thị thông báo thanh toán
    checkoutButton.addEventListener('click', function() {
        const totalAmount = totalPriceElement.textContent;
        document.getElementById('checkout-total').textContent = totalAmount;
        document.getElementById('checkout-notification').classList.add('show');
    });

    // Đóng thông báo thanh toán
    document.getElementById('close-notification').addEventListener('click', function() {
        document.getElementById('checkout-notification').classList.remove('show');
    });
});

