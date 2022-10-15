import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Link to='/'>Register</Link>
            <Link to='/login'>Login</Link>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;