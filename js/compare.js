let allProducts = [];

// Load dữ liệu từ JSON
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
  })
  .catch(err => console.error("Error loading products:", err));

// Hàm tìm sản phẩm theo ID hoặc tên
function findProduct(query) {
  query = query.toLowerCase();
  return allProducts.find(
    p => p.id.toString() === query || p.title.toLowerCase().includes(query)
  );
}

// Hàm so sánh 2 sản phẩm
function compareProducts() {
  const query1 = document.getElementById("product1").value.trim();
  const query2 = document.getElementById("product2").value.trim();

  const product1 = findProduct(query1);
  const product2 = findProduct(query2);

  if (!product1 || !product2) {
    alert("Không tìm thấy 1 hoặc cả 2 sản phẩm. Hãy kiểm tra lại!");
    return;
  }

  // Tạo bảng so sánh
  let table = `
    <table>
      <tr>
        <th>Feature</th>
        <th>${product1.title}</th>
        <th>${product2.title}</th>
      </tr>
      <tr>
        <td>Image</td>
        <td><img src="${product1.thumbnail}" alt="${product1.title}" width="120"></td>
        <td><img src="${product2.thumbnail}" alt="${product2.title}" width="120"></td>
      </tr>
      <tr>
        <td>Price</td>
        <td>$${product1.price}</td>
        <td>$${product2.price}</td>
      </tr>
      <tr>
        <td>Rating</td>
        <td>${product1.rating} ⭐</td>
        <td>${product2.rating} ⭐</td>
      </tr>
      <tr>
        <td>Material</td>
        <td>${product1.material}</td>
        <td>${product2.material}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>${product1.description}</td>
        <td>${product2.description}</td>
      </tr>
      <tr>
        <td>Origin</td>
        <td>${product1.origin}</td>
        <td>${product2.origin}</td>
      </tr>
    </table>
  `;

  document.getElementById("comparison").innerHTML = table;
}
