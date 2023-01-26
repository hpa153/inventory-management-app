import { useState } from 'react';
import { MdPassword } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './auth.scss';
import Card from "../../components/card/Card";
import { resetPassword, resetPasswordProps } from '../../services/authService';

const initialState = { 
  password: "", 
  confirmedPassword: "", 
};

const Reset = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<resetPasswordProps>(initialState);
  const { password, confirmedPassword } = formData;
  const {resetToken} = useParams();

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const reset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Missing field
    if (!confirmedPassword || !password) {
      toast.error("Please fill in all required fields!");
    }

    // Password length
    if (password.length < 6) {
      toast.error("Password length is at least 6 characters!");
    }

    // Mismatching passwords
    if (confirmedPassword !== password) {
      toast.error("Passwords do not match!");
    }

    // Create new user
    const userData = {
      password,
      confirmedPassword,
    };

    try {
      const data = await resetPassword(userData, resetToken!);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {      
      if(error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className={'container auth'}>
      <Card cardClass=''>
        <div className="form">
          <div className="--flex-center">
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input type="password" name="password" placeholder="New Password" value={password} onChange={handleFormInput} required />
            <input type="password" name="confirmedPassword" placeholder="Confirm New Password" value={confirmedPassword} onChange={handleFormInput} required />
            <button type="submit" className='--btn --btn-primary --btn-block'>Reset Password</button>
            <div className="links">
              <Link to="/login">Back To Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
};

export default Reset;