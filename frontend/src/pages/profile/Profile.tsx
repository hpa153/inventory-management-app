import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser';
import { useAppDispatch } from '../../redux/hooks/hooks';
import './Profile.scss';
import { SpinnerImg } from '../../components/loader/Loader';
import { getUser } from '../../services/authService';
import { SET_USER, SET_NAME, userProps } from '../../redux/features/auth/authSlice';
import Card from '../../components/card/Card';

const Profile = () => {
  useRedirectLoggedOutUser("/login");

  const [profile, setProfile] = useState<null | userProps>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    
    async function getUserData() {
      const data = await getUser();

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }

    getUserData();
  }, [dispatch]);

  return (
    <div className='profile --my2'>
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong! Please refresh page or try later.</p>
        ) : (
          <Card cardClass="card --flex-dir-column">
            <span className="profile-photo">
              <img src={profile?.avatar} alt="profile" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name:</b> {profile?.name}
              </p>
              <p>
                <b>Email:</b> {profile?.email}
              </p>
              <p>
                <b>Phone:</b> {profile?.phone}
              </p>
              <p>
                <b>Bio:</b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  )
};

export default Profile;
