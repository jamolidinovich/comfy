import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import hero1 from "../assets/hero1-deae5a1f.webp";
import hero2 from "../assets/hero2-2271e3ad.webp";
import hero3 from "../assets/hero3-a83f0357.webp";
import hero4 from "../assets/hero4-4b9de90e.webp";
import Card from "../components/Card";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    fetch("https://strapi-store-server.onrender.com/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-4/5 mx-auto mt-20">
      <main className="main flex items-center justify-between">
        <div className="info w-[496px]">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl text-[hsl(214, 30%, 32%)] mb-8">
            We are changing the way people shop
          </h1>
          <p className="text-lg leading-8 mb-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link
            to="/products"
            className={`btn btn-${
              theme.theme == "light" ? "primary" : "secondary"
            } uppercase`}
          >
            our products
          </Link>
        </div>

        <div className="slider w-[464px]">
          <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item">
              <img
                src={hero1}
                className="rounded-box object-cover"
                width={320}
                height={416}
              />
            </div>
            <div className="carousel-item">
              <img
                src={hero2}
                className="rounded-box object-cover"
                width={320}
                height={416}
              />
            </div>
            <div className="carousel-item">
              <img
                src={hero3}
                className="rounded-box object-cover"
                width={320}
                height={416}
              />
            </div>
            <div className="carousel-item">
              <img
                src={hero4}
                className="rounded-box object-cover"
                width={320}
                height={416}
              />
            </div>
          </div>
        </div>
      </main>

      <div className="featured mt-20 text-3xl text-info-content">
        <h2 className="mb-4">Featured Products</h2>
        <hr />

        <div className="featured flex justify-between mt-4 gap-4 mb-20">
          {loading && (
            <span className="loading loading-ring loading-lg block mx-auto mt-20"></span>
          )}
          {!loading &&
            featured.length > 0 &&
            featured.map((el, index) => {
              return <Card key={index} data={el}></Card>;
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
