import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      console.log("No username found, redirecting to login");
      navigate('/login');
    }
  }, [navigate]);
  

  return children;
};

export default ProtectedRoute;
