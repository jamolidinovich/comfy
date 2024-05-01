import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function Details() {
  const params = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [selectedColor, setSelectedColor] = useState('')
  const [count, setCount] = useState(1)
  const [cartSave, setCartSave] = useState([])

  const notify = () => toast('Item added to Cart ✔️ ')

  useEffect(() => {
    if (Number(params.id)) {
      fetch(`https://strapi-store-server.onrender.com/api/products/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setData(data.data)
          setSelectedColor(data.data.attributes.colors[0])
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      navigate('/')
    }
    const savedData = localStorage.getItem('saveData')
    if (savedData) {
      setCartSave(JSON.parse(savedData))
    }
  }, [])

  function handleSave(data) {
    const savedData = {
      amount: count,
      cartID: Date.now(),
      company: data.company,
      image: data.image,
      price: data.price,
      productColor: selectedColor,
      productID: params.id,
      title: data.title
    }
    const newData = [...cartSave, savedData]
    setCartSave(newData)
    localStorage.setItem('saveData', JSON.stringify(newData))
    notify()
  }

  return (
    <div className="w-3/5 m-auto">
      <div className="text-sm breadcrumbs py-20">
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/products'}>Products</Link></li>
        </ul>
      </div>
      <div>
        {
          data?.id && <>
            <div className="flex gap-16">
              <div className="w-96">
                <img className="w-96 h-96 object-cover rounded-lg lg:w-full" src={data.attributes.image} alt="" />
              </div>
              <div className="w-[512px]">
                <h2 className="capitalize text-3xl font-bold">{data.attributes.title}</h2>
                <h3 className="text-xl text-neutral-content font-bold mt-2">{data.attributes.company}</h3>
                <h3 class="mt-3 text-xl">$ {data.attributes.price / 100}</h3>
                <p className="mt-6 leading-8">{data.attributes.description}</p>
                <div className="form  mt-3">
                  <p className="font-bold block my-3">Colors</p>
                  <div className="flex items-center gap-2">
                    {
                      data.attributes.colors.map((color, index) => {
                        return (
                          <span style={{
                            backgroundColor: color,
                            border: color === selectedColor ? '1px solid black' : 'none'
                          }} className="w-5 h-5 rounded-full block cursor-pointer" onClick={() => setSelectedColor(color)}></span>
                        )
                      })
                    }
                  </div>

                </div>
                <div className="flex flex-col mt-7 gap-3">
                  <label htmlFor="select">Amount</label>
                  <select name="select" id="select"
                    className="select select-bordered w-full max-w-xs"
                    value={count}
                    onChange={(e) => {
                      setCount(e.target.value)
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button onClick={() => { handleSave(data.attributes) }} className="btn btn-primary mt-8 mb-20 uppercase ">ADD TO BAG</button>
                <Toaster />
              </div>
            </div>
          </>
        }
      </div>

    </div>
  )
}

export default Details