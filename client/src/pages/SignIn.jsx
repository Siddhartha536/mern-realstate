import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLaptopHouse } from "react-icons/fa";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setLoading(true); // Start the loading state
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.sucess == false) {
        setError(data.message), setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      console.log(data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
