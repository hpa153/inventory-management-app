import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppSelector } from '../../../redux/hooks/hooks';
import { userProps, selectUser } from '../../../redux/features/auth/authSlice';
import { SpinnerImg } from '../../../components/loader/Loader';
import '../Profile.scss';
import Card from '../../../components/card/Card';
import { updateProfile } from '../../../services/authService';
import UpdatePassword from '../../../components/updatePassword/UpdatePassword';

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(selectUser);
  const [profile, setProfile] = useState<userProps>({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    avatar: user?.avatar,
  });
  const [userImage, setUserImage] = useState<null | File>(null);

  // Redirect user on refresh page
  const { email } = user;

  useEffect(() => {
    if(!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      setUserImage(e.target.files[0]);
    }
  };

  const saveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      // Handle image upload
      let imgUrl = "";
      if(userImage && (
        userImage.type === "image/jpeg" 
        || userImage.type === "image/jpg" 
        || userImage.type === "image/png" 
      )) {
        const image = new FormData();
        image.append("file", userImage);
        image.append("cloud_name", "dgd8cqkph");
        image.append("upload_preset", "sojda3t4");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dgd8cqkph/image/upload",
          {
            method: "post",
            body: image
          }
        );
        
        const imgData = await response.json();
        imgUrl = imgData.url.toString();
      }

      // Save profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        avatar: userImage ? imgUrl : profile.avatar,
      };
      console.log(formData);
      
      const data = await updateProfile(formData);
      console.log(data);
      toast.success("Profile successfully updated!");
      navigate("/profile");
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <Card cardClass="card --flex-dir-column">
        <span className="profile-photo">
          <img src={user?.avatar} alt="profile" />
        </span>
        <form className='--form-control --m' onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input type="text" name="name" value={profile?.name} onChange={handleFormInput} />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed!</code>
            </p>
            <p>
              <label>Phone:</label>
              <input type="text" name="phone" value={profile?.phone} onChange={handleFormInput} />
            </p>
            <p>
              <label>Bio:</label><br />
              <textarea name="bio" value={profile?.bio} onChange={handleFormInput} cols={30} rows={10} ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="avatar" onChange={handleImageChange} />
            </p>
            <div>
              <button type='submit' className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <UpdatePassword />
    </div>
  )
};

export default EditProfile;