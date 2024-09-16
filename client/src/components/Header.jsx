import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              {/* <span className="text-slate-700">Sid--</span> */}
              <span className="text-slate-700">RealState</span>
            </h1>
          </Link>

          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>
          <ul className="flex gap-4 ">
            <li className="text-slate-700 hidden sm:inline hover:cursor-pointer ">
              <a href="/" className="hover:text-blue-500">
                Home
              </a>
            </li>
            <li className="text-slate-700 hidden sm:inline hover:cursor-pointer">
              <a href="/about" className="hover:text-blue-500">
                About
              </a>
            </li>
            {/* <Link to="/signin">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.photo}
                  alt="profile"
                />
              ) : (
                <li className="text-slate-700 hover:cursor-pointer hover:text-blue-500">
                  Sign In
                </li>
              )}
            </Link> */}
            {currentUser ? (
              <Link to="/profile">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.photo}
                  alt="profile"
                />
              </Link>
            ) : (
              <Link to="/signin">
                <li className="text-slate-700 hover:cursor-pointer hover:text-blue-500">
                  Sign In
                </li>
              </Link>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}
