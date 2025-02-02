import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, token }) => {
    console.log("Current token in PrivateRoute:", token); 
  return token ? children : <Navigate to="/loginReg" />;
};

export default PrivateRoute;
