import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

function Home({ addToCart }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <section className="hero">
        <div>
          <h1>Modern E-Commerce Platform</h1>

          <p>
            Information system with analytics
            for small business.
          </p>
        </div>
      </section>

      <section className="products-section">
        <h2>Popular Products</h2>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;