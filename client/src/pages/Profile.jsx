import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSucess, setUpdateSucess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  console.log(filePercentage);
  console.log(formData);
  console.log(file);
  console.log(filePercentage);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This useEffect hook will run when the currentUser changes
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = async (file) => {
    setFileUploadError(false);
    setFilePercentage(0);

    // Create a storage reference from our storage service and save the file to the storage bucket with a unique name
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, photo: downloadURL }));
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  // Function to set the form data when the input fields change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Function to submit the form data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      dispatch(updateUserSuccess(formData));
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSucess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // Function to sign out the user
  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout", {
        method: "GET",
      });
      if (res.status !== 200) {
        throw new Error("Signout failed");
      }
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      console.log(data);
      dispatch(signOutUserSuccess());
    } catch (e) {
      console.log(e);
    }

    // Redirect to the sign-in page
    navigate("/signup");
  };

  // Function to delete the user account
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

      // Clear the entire local storage
      localStorage.clear();
      navigate("/signup");
      const deleteCookie = (name) => {
        document.cookie = `${name}`;
      };

      // Delete the access_token cookie
      deleteCookie("access_token");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  // Function to show a listing
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/listing/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3l font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photo || currentUser.photo}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p>
          {fileUploadError ? (
            <span className="text-red-700">
              Error: Image upload <failed>image must be less than 2 mb</failed>
            </span>
          ) : filePercentage && filePercentage < 100 ? (
            <span className="text-blue-700">Uploading {filePercentage}%</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 "
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 "
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}>
        Create Listing
        </Link>
      </form>
      <div className=" flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-blue-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSucess ? "User account is Updated successfully" : ""}
      </p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}