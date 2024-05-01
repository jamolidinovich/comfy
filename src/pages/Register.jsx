import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const username = useRef('');
  const email = useRef('');
  const password = useRef('');
  const [btnDisabled, setBtnDisabled] = useState(false);


  useEffect(() => {
    const firstLoggedIn = JSON.parse(localStorage.getItem("logged"))
    if (!firstLoggedIn) {
      localStorage.setItem("logged", JSON.stringify(true));
      window.location.reload();
    }
  }, []);

  function handleSave(e) {
    e.preventDefault();
    const enteredUsername = username.current.value.trim();
    const enterdEmail = email.current.value.trim();
    const enteredPassword = password.current.value.trim();
    if (enteredUsername === '' || enterdEmail === '' || enteredPassword === '') {
      alert('Please fill in all the blanks!');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(enterdEmail)) {
      alert('Please enter a valid email address!');
      return;
    }
    const user = {
      name: enteredUsername,
      email: enterdEmail,
      password: enteredPassword
    };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/login');

    setBtnDisabled(false);
  }

  return (
        <div className='card w-96 m-auto mt-20 p-8 bg-base-100 shadow-lg flex flex-col gap-y-8'>
          <h2 className='text-center text-3xl font-bold'>Register</h2>
          <form>
            <div className="mb-6 flex flex-col">
              <label htmlFor="name" className="label-text capitalize">Username</label>
              <input ref={username} type="text" className="input input  mt-2 input-bordered undefined" id="name"  />
            </div>

            <div className="mb-6 flex flex-col">
              <label htmlFor="email" className="label-text capitalize">Email</label>
              <input ref={email} type="email" className="input input  mt-2 input-bordered undefined" id="email" aria-describedby="emailHelp"  />
            </div>

            <div className="mb-6 flex flex-col">
              <label htmlFor="password" className="label-text capitalize">Password</label>
              <input ref={password} type="password" className="input input  mt-2 input-bordered undefined" id="password" />
            </div>

            <div className='text-center mb-3'>
              <button disabled={btnDisabled} onClick={handleSave} className="btn btn-info btn-block text-white">{btnDisabled ? 'loading...' : 'REGISTER'}</button>
            </div>

            <div className='text-center flex items-center gap-4 text-center justify-center mt-2'>
              <p>Already a member?</p>
              <Link to='/login' className='text-info hover:underline'>Login</Link>
            </div>
          </form>
        </div>
  );
}

export default Register;