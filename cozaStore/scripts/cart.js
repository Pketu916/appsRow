// Quantity Control
document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector(".qty-input");
        let qty = parseInt(input.value);

        if (btn.classList.contains("plus")) qty++;
        if (btn.classList.contains("minus") && qty > 1) qty--;

        input.value = qty;
        updateCartTotals();
    });
});

// Manual Quantity Change
document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", () => {
        if (input.value < 1) input.value = 1;
        updateCartTotals();
    });
});

// Coupon Apply
document.getElementById("applyCoupon").addEventListener("click", () => {
    const code = document.getElementById("couponCode").value.trim();
    if (code) {
        alert(`Coupon "${code}" applied! `);
    }
});

// Update Cart Button
document.getElementById("updateCart").addEventListener("click", () => {
    updateCartTotals();
});

// Shipping Calculate Button
document.getElementById("updateTotals").addEventListener("click", () => {
    // Basic validation example
    const country = document.getElementById("countrySelect").value;
    if (country === "Select a country...") {
        alert("Please select a country");
        return;
    }
    updateCartTotals();
});

// Checkout Button
document.getElementById("checkoutBtn").addEventListener("click", () => {
    window.location.href = "checkout.html";
});

// Total Calculation
function updateCartTotals() {
    let subtotal = 0;
    document.querySelectorAll(".item-total").forEach(totalCell => {
        const price = parseFloat(totalCell.parentElement.children[1].innerText.replace('$', ''));
        const qty = parseInt(totalCell.parentElement.querySelector(".qty-input").value);
        const total = price * qty;
        totalCell.innerText = `$${total.toFixed(2)}`;
        subtotal += total;
    });

    document.getElementById("cartSubtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("cartTotal").innerText = `$${subtotal.toFixed(2)}`;
}
