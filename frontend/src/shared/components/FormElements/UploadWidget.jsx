import React, { useEffect, useRef, useState } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null); // State to store the URL

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "duvougrqx",
        uploadPreset: "ufkishd8",
      },
      (error, result) => {
        if (result.event === "success") {
          // Check if the upload was successful
          console.log("Uploaded file info:", result.info);
          setUploadedFileUrl(result.info.url); // Set the URL in state
        }
      }
    );
  }, []);

  const handleSendToBackend = async () => {
    if (uploadedFileUrl) {
      console.log("this is th img url :", uploadedFileUrl);
    } else {
      console.log("No file uploaded yet.");
    }
  };

  return (
    <div>
      <h1>UploadWidget</h1>
      <button className="signupBtn" onClick={() => widgetRef.current.open()}>
        Upload
      </button>
      {!uploadedFileUrl && (
        <button className="sendBtn" style={{marginTop:'10px'}} onClick={handleSendToBackend}>
          Console Log URL 
        </button>
      )}
      {uploadedFileUrl && <p>Uploaded Image URL: {uploadedFileUrl}</p>}
    </div>
  );
};

export default UploadWidget;
