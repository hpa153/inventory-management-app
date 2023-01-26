import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";


const ShowOnLogin = ({children}: {children: JSX.Element}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if(isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};

const ShowOnLogout = ({children}: {children: JSX.Element}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if(!isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};

export {
  ShowOnLogin,
  ShowOnLogout,
}