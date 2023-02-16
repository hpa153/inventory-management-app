import { useState } from 'react';
import { TiUserAddOutline } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import './auth.scss';
import Card from "../../components/card/Card";
import { registerUser, userRegistrationProps, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  name: "", 
  email: "",  
  password: "", 
  confirmedPassword: "", 
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<userRegistrationProps>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { name, email, password, confirmedPassword } = formData;

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate input:
    // Missing field
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields!");
    }

    // Email
    if(!validateEmail(email)) {
      toast.error("Please enter a valid email!");
    }
  
    // Password length
    if (password.length < 6) {
      toast.error("Password length is at least 6 characters!");
    }
  
    if (password !== confirmedPassword) {
      toast.error("Passwords do not match!");
    }

    // Create new user
    const userData = {
      name,
      email,
      password,
      confirmedPassword
    };

    setIsLoading(true);

    try {
      const data = await registerUser(userData);
      await dispatch(SET_NAME(data.name));
      await dispatch(SET_LOGIN(true)); 
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
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input type="text" name="name" placeholder="Name" value={name} onChange={handleFormInput} required />
            <input type="email" name="email" placeholder="Email" value={email} onChange={handleFormInput} required />
            <input type="password" name="password" placeholder="Password" value={password} onChange={handleFormInput} required />
            <input type="password" name="confirmedPassword" placeholder="Confirm Password" value={confirmedPassword} onChange={handleFormInput} required />
            <button type="submit" className='--btn --btn-primary --btn-block'>Register</button>
          </form>
          <span className="register">
            <p>Already have an account?&nbsp;</p>
            <Link to="/login">Login here</Link>
          </span>
        </div>
      </Card>
    </div>
  )
};

export default Register;