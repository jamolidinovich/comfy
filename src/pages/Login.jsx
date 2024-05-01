import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setBtnDisabled(true);
    const logInHome = JSON.parse(localStorage.getItem("user"));
    if (logInHome) {
      if (logInHome.email === email && logInHome.password === password) {
        localStorage.setItem('logged', JSON.stringify(true));
        navigate("/");
      } else {
        alert("Wrong Email or Password");
      }
    } else {
      alert("Please, you need to sign up");
      navigate("/register");
    }

    setBtnDisabled(false);
  }

  function handleTransition() {
    navigate('/')
  }

  return (
    <div className='card w-96 m-auto mt-20  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
      <h2 className='text-center text-3xl font-bold'>LOGIN</h2>
      <form>
        <div className="mb-6 flex flex-col">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input input  mt-2 input-bordered undefined" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-6 flex flex-col">
          <label htmlFor="password" className="form-label">Your Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input input  mt-2 input-bordered undefined" id="password" />
        </div> 
        <div className='text-center mb-3'>
          <button disabled={btnDisabled} onClick={handleSave} className='btn btn-info text-white btn-block'>{btnDisabled ? "Loading..." : "LOGIN"}</button>
        </div>
        <div className="text-center mb-3">
        <button className='btn btn-primary text-white btn-block' onClick={handleTransition}>GUEST USER</button>
        </div>
        <div className='flex items-center justify-center gap-4'>
              <p>Not a member yet? </p>
              <Link to='/register' className='text-info hover:underline'>Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;