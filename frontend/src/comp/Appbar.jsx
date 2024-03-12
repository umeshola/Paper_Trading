import { Link, useLocation } from "react-router-dom";

export default function Appbar() {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');

    };
    const isLoggedIn = localStorage.getItem('name');

    return (
          <div className="ml-24 mr-24">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="text-6xl font-thin">
                    <Link to="/">
                        <button className={location.pathname === "/" ? 'active hover-2' : 'hover-2'}>404</button>
                    </Link>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}>
                    {location.pathname !== "/balance" && (
                        <div className="mr-5 text-4xl">
                            <Link to="/balance">
                                <button className={location.pathname === "/balance" ? 'active hover-2' : 'hover-2'}>balance</button>
                            </Link>
                        </div>
                    )}
                    {location.pathname !== "/market" && (
                        <div className="mr-5 text-4xl">
                            <Link to="/market">
                                <button className={location.pathname === "/market" ? 'active hover-2' : 'hover-2'}>market</button>
                            </Link>
                        </div>
                    )}
                    {location.pathname !== "/portfolio" && (
                        <div className="mr-5 text-4xl">
                            <Link to="/portfolio">
                                <button className={location.pathname === "/portfolio" ? 'active hover-2' : 'hover-2'}>portfolio</button>
                            </Link>
                        </div>
                    )}
                    {isLoggedIn && (
                        <div className="mr-5 text-4xl">
                            <Link>
                                <div className="flex">
                                    <div className="pr-3">
                                        <span class="absolute flex h-10 w-10">
                                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
                                        </span>
                                        <div className=" relative w-10 h-10 p-1 rounded-full ring-2 ring-green-300 dark:ring-green-500  inline-flex items-center justify-center overflow-hidden bg-white-400 dark:bg-white-700 ">
                                            <span className=" text-red-400 dark:text-green-400">{isLoggedIn.at(0).toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <button onClick={handleLogout} className={location.pathname === "/balance" ? 'active hover-2' : 'hover-2'}>Logout</button>
                                </div>


                            </Link>
                        </div>
                    )}
                    {!isLoggedIn && location.pathname !== "/signup" && (
                        <div className="mr-5 text-4xl">
                            <Link to='/signup'>
                                <button className={location.pathname === "/signup" ? 'active hover-2' : 'hover-2'}>Signup</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
    );
}
