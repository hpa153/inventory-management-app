import { useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import './auth.scss';
import Card from "../../components/card/Card";
import { loginUser, userLoginProps } from '../../services/authService';
import { set_login, set_name } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  email: "",  
  password: "", 
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<userLoginProps>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { email, password } = formData;
  

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Missing field
    if (!email || !password) {
      toast.error("Please fill in all required fields!");
    }

    // Create new user
    const userData = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await loginUser(userData);
      await dispatch(set_name(data.name));
      await dispatch(set_login(true)); 
      navigate("/dashboard");
    } catch (error) {      
      if(error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={'container auth'}>
      {isLoading && <Loader />}
      <Card cardClass=''>
        <div className="form">
          <div className="--flex-center">
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input type="email" name="email" placeholder="Email" value={email} onChange={handleFormInput} required />
            <input type="password" name="password" placeholder="Password" value={password} onChange={handleFormInput} required />
            <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>
          </form>
          <Link to="/forgot-password">Forgot Password</Link>
          <span className="register">
            <p>Don't have an account, yet?&nbsp;</p>
            <Link to="/register">Register here</Link>
          </span>
        </div>
      </Card>
    </div>
  )
};

export default Login;
