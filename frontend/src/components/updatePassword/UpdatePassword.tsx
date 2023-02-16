import { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import './UpdatePassword.scss';
import { updatePassword, passwordUpdateProps } from '../../services/authService';
import Card from "../card/Card";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState<passwordUpdateProps>({
    oldPassword: "",
    password: "",
    confirmedPassword: "",
  });

  const { oldPassword, password, confirmedPassword } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      return toast.error("New passwords do not match");
    }

    const formData = {
      oldPassword,
      password,
      confirmedPassword,
    };

    const data = await updatePassword(formData);
    toast.success(data);
    navigate("/profile");
  };

  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
        <h3>Update Password</h3>
        <form onSubmit={changePassword} className="--form-control">
          <input
            type="password"
            placeholder="Old Password"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="New Password"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            name="confirmedPassword"
            value={confirmedPassword}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  )
};

export default UpdatePassword;
