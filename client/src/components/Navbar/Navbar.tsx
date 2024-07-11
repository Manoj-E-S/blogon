import "./Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <div className="navitems bg-slate-100">
                <div className="navlogo">
                    <h1>Blogon</h1>
                </div>
                <div className="navlinks">
                    <ul className="navlinks-ul">
                        <li className="navlink">
                            <a href="#" className="" aria-current="page">
                                <h4>Home</h4>
                            </a>
                        </li>
                        <li className="navlink">
                            <a href="#" className="">
                                <h4>Blogs</h4>
                            </a>
                        </li>
                        <li className="navlink">
                            <a href="#" className="">
                                <h4>Get in Touch</h4>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="navprofile-n-ham">
                    <button className="openUserMenu">
                        <img
                            src="/profile/sample_profile_image.jpeg"
                            alt=""
                            className="profileImage"
                        />
                    </button>
                    <div className="userMenu shadow-2xl">
                        <div className="userProfile">
                            <p className="username">
                                <h5>John Doe</h5>
                            </p>
                            <p className="useremail">
                                john@doe.com
                            </p>
                        </div>
                        <ul className="userlinks">
                            <li className="userlink bg-slate-100">
                                <a href=""><p>Profile</p></a>
                            </li>
                            <li className="userlink bg-slate-100">
                                <a href=""><p>Logout</p></a>
                            </li>
                        </ul>
                    </div>
                    <button className="ham">
                        <svg
                            className="w-8 h-8"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
