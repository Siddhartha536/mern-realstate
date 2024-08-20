import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import Oauth from "../components/Oauth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // Below is the code for the redux store without using usestate
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.sucess == false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      console.log(data);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 hover:cursor-pointer"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <Oauth />
      </form>
      <div className=" flex gap-2 mt-5">
        <p>
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-700">
            Sign Up
          </a>
        </p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
