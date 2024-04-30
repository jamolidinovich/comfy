import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../App';

function Details() {
  const [data, setData] = useState({});
  const [selectedColor, setSelectedColor] = useState('');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const theme = useContext(ThemeContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetch(
        `https://strapi-store-server.onrender.com/api/products/${params.id}`
      )
        .then((res) => res.json())
        .then((d) => {
          console.log(18, d);
          if (!d.data) {
            navigate('/');
          }
          setData(d);
          setSelectedColor(d.data.attributes.colors[0]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div
      className={`w-4/5 mx-auto py-20 ${
        theme.theme == 'dark' ? 'text-white' : 'text-black'
      }`}
    >
      {
        loading && <span className="loading loading-ring loading-lg block mx-auto mt-60"></span>
      }

      {!loading && (
        <>
          <div className='text-sm breadcrumbs'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/products'>Products</Link>
              </li>
            </ul>
          </div>

          <div className='detail flex gap-20 items-start'>
            {data?.data?.id && (
              <>
                <div className='card-img mt-6 w-1/2'>
                  <img
                    className='rounded-3xl h-[500px] object-cover w-full'
                    src={data.data.attributes.image}
                    alt=''
                  />
                </div>

                <div className='card-info w-1/2'>
                  <p className='text-3xl mb-5 capitalize font-bold mt-2'>
                    {data.data.attributes.title}
                  </p>
                  <p className='text-neutral-content text-xl mb-2'>
                    {data.data.attributes.company}
                  </p>
                  <p className='text-xl mb-3'>
                    ${data.data.attributes.price / 100}
                  </p>

                  <p className='mt-6 leading-8'>
                    {data.data.attributes.description}
                  </p>

                  <div className='form'>
                    {/* colors */}
                    <label htmlFor='' className='text-lg mt-8 block'>
                      Colors
                    </label>
                    <div className='colors flex items-center gap-2 mt-3'>
                      {data.data.attributes.colors.length > 0 &&
                        data.data.attributes.colors.map((color, index) => {
                          return (
                            <span
                              style={{
                                backgroundColor: color,
                                border:
                                  color == selectedColor
                                    ? '1px solid black'
                                    : 'none',
                              }}
                              key={index}
                              className={`w-5 h-5 rounded-full block cursor-pointer`}
                              onClick={() => {
                                setSelectedColor(color);
                              }}
                            ></span>
                          );
                        })}
                    </div>

                    {/* amount */}
                    <div className='flex flex-col mt-7 gap-2'>
                      <label htmlFor='select'>Amount</label>
                      <select
                        className='select select-bordered w-full max-w-xs'
                        id='select'
                        value={count}
                        onChange={(e) => {
                          setCount(e.target.value);
                        }}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>

                    <button className='btn btn-active btn-primary mt-8 uppercase'>
                      Add to bag
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
