import { useNavigate } from "react-router-dom";
import "./main.css";
import { useState } from "react";
function Card(props) {
  const { image, title, price } = props.data.attributes;
  const { id } = props.data;
  const [isGrid, setGrid] = useState(true);
  // const { isGrid } = props;
  const navigate = useNavigate();

  function handleRedirect() {
    navigate(`/product/${id}`);
  }

  return (
    <div
      onClick={handleRedirect}
      className={`card ${
        isGrid ? "w-[349px]" : "w-full flex-row"
      } bg-base-100 shadow-xl cursor-pointer transition duration-300 hover:shadow-2xl`}
    >
      <figure className="px-5 pt-5">
        <img
          src={image}
          alt="Shoes"
          className={`rounded-xl object-cover ${
            isGrid ? "h-64" : "h-44 mb-5 w-44"
          } w-full`}
        />
      </figure>

      <div
        className={`card-body items-center  text-center ${
          isGrid ? "flex-col" : "flex-row justify-between mb-32 "
        }`}
      >
        <h2
          className={`card-title capitalize ${isGrid ? "text-2xl" : "text-xl"}`}
        >
          {title}
        </h2>
        <p
          className={`text-lg ${
            isGrid ? "text-primary" : "tex-black full font-bold"
          }`}
        >
          ${price / 100}
        </p>
      </div>
    </div>
  );
}

export default Card;
