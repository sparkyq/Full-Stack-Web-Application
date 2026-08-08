import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/products.css";

function Products({ addToCart }) {

  const [products, setProducts] =
    useState([]);

  const [selectedProduct,
    setSelectedProduct] =
    useState(null);

  useEffect(() => {

    API.get("products/")
      .then((response) => {
        setProducts(response.data);
      });

  }, []);

  return (
    <div className="products-page">

      <h1>Product Catalog</h1>

      <div className="products-grid">

        {products.map(product => (

          <div
            key={product.id}
            className="product-card"
            onClick={() =>
              setSelectedProduct(product)
            }
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>{product.price}₴</p>

          </div>

        ))}

      </div>

      {selectedProduct && (

        <div className="product-modal">

          <div className="product-details">

            <button
              className="close-btn"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ✖
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <h2>
              {selectedProduct.name}
            </h2>

            <p>
              {selectedProduct.description}
            </p>

            <h3>
            ₴{selectedProduct.price}
            </h3>

            <p>
              Stock:
              {" "}
              {selectedProduct.stock}
            </p>

            <button
              className="add-btn"
              onClick={() =>
                addToCart(selectedProduct)
              }
            >
              Add To Cart
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;