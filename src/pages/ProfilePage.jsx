import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  if (!ready) {
    return 'Loading ...';
  }
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  const logout = async () => {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})
          <button className='primary max-w-sm mt-2' onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};
export default ProfilePage;
