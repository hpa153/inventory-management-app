import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../../index.scss';
import { logoutUser } from '../../services/authService';
import { set_login, set_name, selectName } from '../../redux/features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(set_login(false));
    await dispatch(set_name(""));
    navigate("/login");
  }

  return (
    <div className='--pad header'>
      <div className="--flex-between">
        <h3>
          <span className='--fw-thin'>Welcome,&nbsp;</span>
          <span className='--color-danger'>{name}</span>
        </h3>
        <button className="--btn --btn-danger" onClick={logout}>Logout</button>
      </div>
      <hr />
    </div>
  )
};

export default Header;