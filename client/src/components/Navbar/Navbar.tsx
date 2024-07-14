import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

import Navbrand from "./Navbrand/Navbrand";
import NavlinkList from "./NavlinkList/NavlinkList";
import Hamburger from "./Hamburger/Hamburger";
import UserMenu from "./UserMenu/UserMenu";
import Navprofile from "./Navprofile/Navprofile";
import LoginButton from "./LoginButton/LoginButton";

export default function Navbar() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNavlinks, setShowNavlinks] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = Boolean(localStorage.getItem("loggedIn")) || false

    const toggleNavlinks = () => {
        setShowNavlinks(!showNavlinks);
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const gotoLoginPage = () => {
        navigate("/login", { replace: true });
    };

    return (
        <nav className="navbar relative z-20">
            <div className="navitems bg-slate-100">
                <Navbrand />
                <NavlinkList biggerScreen={true} />

                <div className="navprofile-n-ham">
                    {isLoggedIn ? ( 
                        <Navprofile toggleUserMenu={toggleUserMenu} />
                    ) : (
                        <LoginButton gotoLoginPage={gotoLoginPage}/>
                    )}

                    {showUserMenu && (
                        <UserMenu closeSelf={toggleUserMenu}/>
                    )}

                    <Hamburger toggleNavlinks={toggleNavlinks}/>
                </div>
            </div>

            {showNavlinks && (
                <NavlinkList biggerScreen={false} />
            )}
        </nav>
    );
}
