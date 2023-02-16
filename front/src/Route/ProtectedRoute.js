import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function ProtectedRoute({ element: Element, ...rest }) {
    const navigate = useNavigate();

    const { isAuthenticated, loading } = useSelector((state) => state.user)
    return (
        <>
            {!loading && (<Route {...rest} render={(props) => {
                if (!isAuthenticated) {
                    return navigate('/login');
                }
                return <Element {...props} />;
            }} />
            )}
        </>
    )
}

export default ProtectedRoute