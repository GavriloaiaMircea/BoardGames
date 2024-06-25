import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from ".."

export function RequireAuth({ children }) {
  const { user } = useAuthContext();
  const { pathname } = useLocation()

  // navigate('/login', { state: { from: pathname }});
  if(!user) {
    return <Navigate to="/login" state={ {from: pathname} } />
  }

  return children;
}
