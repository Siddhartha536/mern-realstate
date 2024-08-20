import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
export default function Oauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log("could not sign with google");
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:cursor-pointer w-full"
      >
        continue with google
      </button>
    </div>
  );
}
