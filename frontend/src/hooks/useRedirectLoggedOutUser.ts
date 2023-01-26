import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getLoginStatus } from '../services/authService';
import { set_login } from '../redux/features/auth/authSlice';

const useRedirectLoggedOutUser = (path: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(set_login(isLoggedIn));

      if(!isLoggedIn) {
        toast.info("Session expired. please login to continue!");
        navigate(path);
      }
    }

    redirectLoggedOutUser();
  }, [dispatch, navigate, path])
}

export default useRedirectLoggedOutUser;
