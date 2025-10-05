// Lấy div products
const productsContainer = document.getElementById("products");

// Gọi API JSON
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    const products = data.products;

    products.forEach(product => {
      // Tạo card sản phẩm
      const card = document.createElement("div");
      card.classList.add("product-card");

      // Rating hiển thị bằng sao
      const ratingStars = "★".repeat(Math.round(product.rating)) +
        "☆".repeat(5 - Math.round(product.rating));

      // Nếu có giảm giá thì hiện giá cũ
      const discountPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3 class="product-title">${product.title}</h3>
        <div class="rating">${ratingStars}</div>
        <p>
          <span class="product-price">$${product.price}</span>
        </p>
        <button class="btn">ADD TO CART</button>
      `;

      productsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Lỗi khi fetch dữ liệu:", error);
  });

//${product.discountPercentage > 0 ? `<span class="old-price">$${product.price}</span>` : ""}
//      <span class="product-price">$${discountPrice}</span>