import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(filePercentage);
  console.log(formData);
  console.log(file);
  console.log(filePercentage);
  const fileRef = useRef();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = async (file) => {
    setFileUploadError(false);
    setFilePercentage(0);

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
          setFormData({ ...formData, photo: downloadURL });
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3l font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          className="border p-3 "
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 "
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 "
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
          Update
        </button>
      </form>
      <div className=" flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-blue-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
