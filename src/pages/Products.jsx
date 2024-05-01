import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { BsFillGridFill } from "react-icons/bs";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGrid, setGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();


  async function getData(
    url = `https://strapi-store-server.onrender.com/api/products?page=${currentPage}`
  ) {
    try {
      const res = await fetch(url);
      const responseData = await res.json();
      setFeatured(responseData.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://strapi-store-server.onrender.com/api/products", {
      method: "GET",
    })
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

  const searchRef = useRef();
  const [cotegory, setCategory] = useState();
  const [price, setPrice] = useState(100000);
  function hanldeClick(e) {
    e.preventDefault();
    let name = searchRef.current.value;

    fetch(
      `https://strapi-store-server.onrender.com/api/products?search=${name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data);
      });

    fetch(
      `https://strapi-store-server.onrender.com/api/products?search=&category=${cotegory}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      `https://strapi-store-server.onrender.com/api/products?price=${price}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function hanldeClear() {
    (searchRef.current.value = null), (cotegory.current.value = "all");
  }

 

  useEffect(() => {
    getData();

    if (location.search) {
      setCurrentPage(location.search.substring(6));
    }
  }, [currentPage]);

  function handlePagination(num) {
    navigate(`/products?page=${num}`);
    setCurrentPage(num);
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
      navigate(`/products?page=${currentPage - 1}`);
    }else {
      setCurrentPage(1)
      navigate(`/products?page=1`);
    }
  }

  function handleNext() {
    if (currentPage < 3) {
      setCurrentPage((currentPage) => currentPage + 1);
      navigate(`/products?page=${Number(currentPage) + 1}`);
    } else {
      setCurrentPage(3)
      navigate(`/products?page=3`);
    }
  }

  return (
    <div className="w-4/5 mx-auto mt-20">
      <div className="filter p-4 bg-primary-content rounded-md">
        <div className="filter-top flex justify-between gap-3">
          <div className="field flex flex-col gap-1 w-1/4">
            <label htmlFor="search" className="cursor-pointer">
              Serarch Products
            </label>
            <input
              type="search"
              id="search"
              className="input input-bordered w-full max-w-xs input-sm"
              ref={searchRef}
            />
          </div>
          <div className="field flex flex-col gap-1 w-1/4">
            <label className="cursor-pointer">Select Category</label>
            <select
              className="select select-bordered w-full max-w-xs select-sm"
              value={cotegory}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option disabled selected>
                all
              </option>
              <option value="tables">Tables</option>
              <option value="chairs">Chairs</option>
              <option value="chairs">Kids</option>
              <option value="chairs">Sofas</option>
              <option value="beds">Beds</option>
            </select>
          </div>
          <div className="field flex flex-col gap-1 w-1/4">
            <label className="cursor-pointer">Select Company</label>
            <select className="select select-bordered w-full max-w-xs select-sm">
              <option disabled selected>
                all
              </option>
              <option value="modenza">Modenza</option>
              <option value="luxora">Luxora</option>
              <option value="artifex">Artifex</option>
              <option value="comfora">Comfora</option>
              <option value="hommestead">Hommestead</option>
            </select>
          </div>
          <div className="field flex flex-col gap-1 w-1/4">
            <label className="cursor-pointer">Sort By</label>
            <select className="select select-bordered w-full max-w-xs select-sm">
              <option disabled selected>
                a-z
              </option>
              <option value="">z-a</option>
              <option value="">high</option>
              <option value="">low</option>
            </select>
          </div>
        </div>
        <div className="filter-bottom mt-8 flex justify-between gap-3 items-center">
          <div className="rageee w-1/4">
            <div className="range-title flex justify-between items-canter mb-1">
              <p>Select Price</p>
              <p>${price / 100}</p>
            </div>
            <div className="range-field">
              <input
                type="range"
                min={0}
                max="100000"
                onChange={(e) => setPrice(e.target.value)}
                className="range range-primary"
              />
            </div>

            <div className="range-max-min flex justify-between items-canter mb-1">
              <span className="font-bold">0</span>
              <span className="font-bold">Max : $1,000.00</span>
            </div>
          </div>
          <div className="check w-1/4 ">
            <div className="form-control ">
              <label className="label cursor-pointer flex flex-col gap-1 ">
                <span className="label-text">Free shipping</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
          </div>
          <div className="buttons w-2/4 flex justify-between gap-3">
            <button className="btn btn-primary w-2/4" onClick={hanldeClick}>
              SEARCH
            </button>
            <button className="btn btn-secondary w-2/4" onClick={hanldeClear}>
              RESET
            </button>
          </div>
        </div>
      </div>
      <div className="card-header  flex justify-between mt-12 mb-5">
        <h2 className=" font-medium text-md ">{featured.length} products</h2>
        <div className="icons flex items-center gap-3">
          <span
            onClick={() => {
              setGrid(true);
            }}
            className="cursor-pointer flex justify-center items-center"
            style={
              isGrid
                ? {
                    color: "aliceblue",
                    backgroundColor: "dodgerblue",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                  }
                : {}
            }
          >
            <BsFillGridFill className="text-xl cursor-pointer" />
          </span>
          <span
            onClick={() => {
              setGrid(false);
            }}
            className="cursor-pointer flex justify-center items-center"
            style={
              !isGrid
                ? {
                    color: "aliceblue",
                    backgroundColor: "dodgerblue",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                  }
                : {}
            }
          >
            <FiMenu className="text-xl cursor-pointer" />
          </span>
        </div>
      </div>

      <hr className="mb-16 " />
      <div
        className={`featured-wrapper flex flex-wrap justify-between mt-4 gap-4 mb-20 ${isGrid ? 'flex-row' : 'flex-col'}`}
      >
        {loading && (
          <span className="loading loading-ring loading-lg block mx-auto mt-20"></span>
        )}
        {!loading &&
          featured.length > 0 &&
          featured.map((el, index) => {
            return <Card key={index} data={el} isgrid={isGrid}></Card>;
          })}
      </div>
      
      <div className="pagination mb-20 flex justify-end">
          <div className="join">
            <button className="join-item btn" onClick={handlePrev}>PREV</button>
            <button className={`join-item btn ${currentPage == 1 ? "btn-active" : ""} `} onClick={() => {handlePagination(1)}}>1</button>
            <button className={`join-item btn ${currentPage == 2 ? "btn-active" : ""} `} onClick={() => {handlePagination(2)}}>2</button>
            <button className={`join-item btn ${currentPage == 3 ? "btn-active" : ""} `} onClick={() => {handlePagination(3)}}>3</button>
            <button className={`join-item btn`} onClick={handleNext}>NEXT</button>
          </div>
        </div>
    </div>
  );
}

export default Products;
