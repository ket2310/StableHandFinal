import React from 'react';
import HomePage from './HomePage'
import MyHeader from './MyHeader';
import Auth from '../utils/auth';
import '../styles/header.css';
import LoginForm from './LoginForm';

export default function MainContainer(props) {
    const currPg = props.currentPg;
   

    const renderNavigation = () => {
        if (currPg === "HomePage" && Auth.loggedIn()) {
            return (
                <HomePage />
            )
        }
        if (currPg === "Login") {
            return (
                <LoginForm />
            )
        }
        if (currPg === "Logout")
            Auth.logout();
    };

    const handlePageChange = (page) => props.setPage(page);


    return (
        <div>
            <MyHeader currentPage={props.currPg} handlePageChange={handlePageChange} />            
            <main className="container container-fluid mt-5">
                <header className="cd-main-header text-center flex flex-column flex-center">
                    <h1 className="text-xl">{ props.farmName}</h1><br />
                    <h2 className="text-xl">{ props.task}</h2>
                </header>
                <hr style={{ border: '3px solid rgb(6, 53, 35)', borderradius: '5px'}} />
                {renderNavigation()}
                 </main>
           
        </div>
    );
}


