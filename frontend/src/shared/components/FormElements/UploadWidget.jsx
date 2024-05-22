import React, { useEffect, useRef, useState } from "react";

import "./NewArtwork.css";

const UploadWidget = (props) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  // const [uploadedFileUrl, setUploadedFileUrl] = useState(""); // State to store the URL

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "duvougrqx",
        uploadPreset: "ufkishd8",
        multiple: false,
      },
      (error, result) => {
        if (result.event === "success") {
          // Check if the upload was successful
          // console.log("Uploaded file info:", result.info);
          // setUploadedFileUrl(result.info.url); // Set the URL in state
          props.onUploadSuccess(result.info.url);
        }
      }
    );
  }, []);



  return (
    <div>
      {/* <h1>UploadWidget</h1> */}
        <button
          onClick={() => {
            widgetRef.current.open();
          }}
          style={{ display: "none" }}
        />
      {/* {uploadedFileUrl && <p>Uploaded Image URL: {uploadedFileUrl}</p>} */}
    </div>
  );
};

export default UploadWidget;
