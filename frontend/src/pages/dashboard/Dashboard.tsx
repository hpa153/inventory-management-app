
import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser';

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  return (
    <div>Dashboard</div>
  )
};

export default Dashboard;