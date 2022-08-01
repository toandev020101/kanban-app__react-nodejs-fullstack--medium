import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';
import authUtils from '../utils/authUtils';
import { setUser } from '../redux/features/userSlice';

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        // save user
        dispatch(setUser(user));
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return (
    <>
      {loading ? (
        <Loading fullHeight />
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default AppLayout;
