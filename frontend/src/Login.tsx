import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = '/api/users/';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function resetAllFields() {
    setEmail('');
    setPassword('');
  }

  async function handleLogin(e: any) {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please add your credentials');
    } else {
      try {
        const userData = {
          email: email,
          password: password,
        };
        const response = await axios.post(API_URL + 'login', userData);

        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          toast.success('Welcome back!');
          resetAllFields();
          navigate('/');
        }
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <h1>Login User</h1>

      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </form>

      <Link to='/' className='back-home-link'>
        <TiArrowBackOutline className='icons' />
        <span>Go Back</span>
      </Link>
    </>
  );
}
