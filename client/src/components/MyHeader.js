import React from "react";
import '../styles/header.css'
import Auth from '../utils/auth';

function MyHeader({ currentPage, handlePageChange }) {
    return (
        <div className="flex-column justify-space-around">
            <header className="myHeader display-flex justify-space-between align-center p-2">
                <h1 > Stable Hand</h1>
                <nav>

                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a href="#homepage" onClick={() => handlePageChange('HomePage')}
                                // This is a conditional (ternary) operator that checks to see if the current page is "About Me"
                                // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
                                className={currentPage === 'HomePage' ? 'nav-link active' : 'nav-link'}
                            >Home
                            </a>
                        </li>&nbsp;  &nbsp;
                        
                        <li><a href="#dashboard" onClick={() => handlePageChange('Dashboard')}
                                className={currentPage === 'Dashboard' ? 'nav-link active' : 'nav-link'}
                            >Dashboard</a></li> &nbsp;  &nbsp;

                        {Auth.loggedIn() ? (
                            <li><a href="#login" onClick={() => handlePageChange('Logout')}
                                className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                            >Logout</a></li>
                        ):(
                            <li><a href="#login" onClick={() => handlePageChange('Login')}
                            className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                        >Login</a></li>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default MyHeader;
