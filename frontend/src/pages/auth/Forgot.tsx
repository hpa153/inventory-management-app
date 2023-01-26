import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './auth.scss';
import Card from "../../components/card/Card";
import { forgotPassword, forgotPasswordProps } from '../../services/authService';

const Forgot = () => {
  const [email, setEmail] = useState<string>("");

  const forgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Missing field
    if (!email) {
      toast.error("Please enter your email!");
    }

    // Create new user
    const userData: forgotPasswordProps = {
      email,
    };

    forgotPassword(userData);
    setEmail("");
  };
  return (
    <div className={'container auth'}>
      <Card cardClass=''>
        <div className="form">
          <div className="--flex-center">
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input type="email" name="email" placeholder="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
            <button type="submit" className='--btn --btn-primary --btn-block'>Send Reset Email</button>
            <div className="links">
              <Link to="/login">Back To Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
};

export default Forgot;