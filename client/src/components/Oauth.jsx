import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function Oauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    // Simple check for web view
    const userAgent = navigator.userAgent.toLowerCase();
    setIsWebView(
      userAgent.includes('fb') || 
      userAgent.includes('instagram') || 
      userAgent.includes('twitter') ||
      userAgent.includes('linkedin')
    );
  }, []);

  const handleGoogleClick = async () => {
    if (isWebView) {
      alert("Please open this page in your default browser to use Google Sign-In.");
      return;
    }

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
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:cursor-pointer w-full"
      >
        {isWebView ? "Open in Browser to Continue with Google" : "Continue with Google"}
      </button>
      {isWebView && (
        <p className="mt-2 text-sm text-gray-600">
          For security reasons, please open this page in your default browser to use Google Sign-In.
        </p>
      )}
    </div>
  );
}