import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)

  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  // form submit handler
  const onSubmitHandler = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
      toast.success('Login Successful.')
    }

    // Get form type from URL
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type')
    if (type === 'login') {
      setState('Login')
    } else if (type === 'signup') {
      setState('Sign Up')
    }
  }, [token])

  return (
    <div className='motion-preset-expand'>
      <form
        onSubmit={onSubmitHandler}
        className='min-h-[60vh] flex items-center'
      >
       <div className='flex flex-col gap-6 m-auto items-start p-8 md:p-10 w-[90vw] sm:w-96 border rounded-xl bg-white text-zinc-600 text-sm shadow-lg mt-10'>
  {/* form title */}
  <div className='flex flex-col items-stretch gap-1 w-full text-center'>
    <p className='text-2xl font-semibold text-purple-800'>
      {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
    </p>
    <p className='text-purple-600'>
      {state === 'Sign Up'
        ? 'Sign up to book an appointment.'
        : 'Log in to get started.'}
    </p>
  </div>

  {/* form input area */}
  <div className='flex flex-col gap-4 w-full items-stretch font-medium text-purple-700'>
    {/* show on create account */}
    {state === 'Sign Up' && (
      <div className='w-full'>
        <p>Name</p>
        <input
          className='border border-purple-200 rounded-lg font-normal text-purple-900 tracking-wide w-full p-3 mt-1 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 focus:outline-none transition-all'
          type='text'
          onChange={e => setName(e.target.value)}
          value={name}
          required
        />
      </div>
    )}
    <div className='w-full'>
      <p>Email Id</p>
      <input
        className='border border-purple-200 rounded-lg font-normal text-purple-900 tracking-wide w-full p-3 mt-1 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 focus:outline-none transition-all'
        type='email'
        onChange={e => setEmail(e.target.value)}
        value={email}
        required
      />
    </div>
    <div className='w-full'>
      <p>{state === 'Sign Up' ? 'Create Password' : 'Your Password'}</p>
      <input
        className='border border-purple-200 rounded-lg font-normal text-purple-900 tracking-wide w-full p-3 mt-1 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 focus:outline-none transition-all'
        type='password'
        onChange={e => setPassword(e.target.value)}
        value={password}
        required
      />
    </div>
  </div>

  <div className='flex flex-col gap-4 w-full items-stretch text-center'>
    {/* submit form */}
    <div className='flex w-full items-center justify-center'>
      <button
        type='submit'
        className={`flex items-center justify-center gap-4 bg-purple-600 hover:bg-purple-700 text-white w-full h-12 rounded-lg text-base font-medium ${
          loading
            ? 'cursor-not-allowed opacity-80'
            : 'hover:shadow-md active:scale-[98%] transition-all duration-150 ease-in-out'
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className='flex items-center justify-center'>
            <Loader size={25} className='animate-spin' />
          </div>
        ) : (
          <span className='select-none'>
            {state === 'Sign Up' ? 'Sign Up' : 'Log In'}
          </span>
        )}
      </button>
    </div>
    {/* toggle between forms */}
    {state === 'Sign Up' ? (
      <p className='text-purple-600'>
        Already have an Account? &nbsp;
        <span
          onClick={() => setState('Login')}
          className='text-purple-800 font-medium hover:underline cursor-pointer transition-all'
        >
          Login Here
        </span>
      </p>
    ) : (
      <p className='text-purple-600'>
        Don't have an Account? &nbsp;
        <span
          onClick={() => setState('Sign Up')}
          className='text-purple-800 font-medium hover:underline cursor-pointer transition-all'
        >
          Click Here
        </span>
      </p>
    )}
  </div>
</div>
      </form>
    </div>
  )
}

export default Login
