import React, { useEffect, useState } from "react";
import "./NewArtwork.css"; // Ensure this path is correct for your CSS file
import backgroundImage from "../../assets/images/Signupbackground2.png";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";

const NewArtwork = () => {
  const [categories, setCategories] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/category/getCategories"
        );
        setCategories(responseData.category);
      } catch (e) {}
    };
    req();
  }, [sendRequest]);

  console.log(categories);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    height: "",
    width: "",
    year: "",
  });
  const [formData2, setFormData2] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    height: "",
    width: "",
    year: "",
  });
  const [formData3, setFormData3] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    height: "",
    width: "",
    year: "",
  });

  useEffect(() => {
    const handleUnload = (event) => {
      // Clear localStorage
      localStorage.removeItem("userData");
      event.returnValue = ""; // Chrome requires returnValue to be set
    };
    // Add event listener for leaving/closing the page
    window.addEventListener("beforeunload", handleUnload);
    // Cleanup the event listener when component unmounts
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange2 = (event) => {
    setFormData2({
      ...formData2,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange3 = (event) => {
    setFormData3({
      ...formData3,
      [event.target.name]: event.target.value,
    });
  };

  // const saveData = () => {
  //   localStorage.setItem("newArtworkData", JSON.stringify(formData));
  // };
  const [step, setStep] = useState(1);

  const saveData = () => {
    if (step === 1) {
      localStorage.setItem("newArtworkData1", JSON.stringify(formData));
    } else if (step === 2) {
      localStorage.setItem("newArtworkData2", JSON.stringify(formData2));
    } else {
      localStorage.setItem("newArtworkData3", JSON.stringify(formData3));
    }
  };
  const nextStep = () => {
    saveData();
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFormData({
          ...formData,
          image: e.target.result,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && categories && (
        <div className="art-form-background-wrapper">
          <div
            className="art-form-background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
          <div className="art-signin-form-container">
            <div className="art-signin-header">Add Artwork</div>

            {step === 1 && (
              <div className="art-signin-step">
                {/* Step 1: Artwork Details */}
                <p style={{ color: "black" }}>Title</p>
                <input
                  className="newArtworkInputs"
                  type="text"
                  placeholder="Artwork Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <p style={{ color: "black" }}>Price</p>
                <input
                  type="text"
                  className="newArtworkInputs"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                />
                <p style={{ color: "black" }}>Categorie</p>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p style={{ color: "black" }}>Description</p>
                <textarea
                  name="description"
                  placeholder="Describe the artwork"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                <label className="image-uploader">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <div className="image-uploader-content">
                    <span className="image-uploader-icon">+</span>
                    <span className="image-uploader-text">Main Image</span>
                  </div>
                </label>

                <div className="art-signin-button-container">
                  <button
                    className="art-signin-button art-signin-next"
                    onClick={nextStep}
                  >
                    Next 1/3
                    <img
                      src="elements/arrow_without--.svg"
                      className="arrow"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="art-signin-step">
                {/* Step 2: Artwork Dimensions & Pricing */}
                <p style={{ color: "black" }}>Title</p>
                <input
                  type="text"
                  className="newArtworkInputs"
                  placeholder="Artwork Title"
                  name="title"
                  value={formData2.title}
                  onChange={handleChange2}
                />
                <p style={{ color: "black" }}>Price</p>
                <input
                  type="text"
                  className="newArtworkInputs"
                  name="price"
                  placeholder="Price"
                  value={formData2.price}
                  onChange={handleChange2}
                />
                <p style={{ color: "black" }}>Categorie</p>
                <select
                  name="category"
                  value={formData2.category}
                  onChange={handleChange2}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="art-dimension-group">
                  <div className="art-dimension-input">
                    <label htmlFor="height" className="art-dimension-label">
                      Height
                    </label>
                    <input
                      type="number"
                      id="height"
                      className="art-dimension newArtworkInputs"
                      placeholder="4 m"
                      name="height"
                      value={formData2.height}
                      onChange={handleChange2}
                    />
                  </div>

                  <div className="art-dimension-input">
                    <label htmlFor="width" className="art-dimension-label">
                      Width
                    </label>
                    <input
                      type="number"
                      id="width"
                      className="art-dimension newArtworkInputs"
                      placeholder="3 m"
                      name="width"
                      value={formData2.width}
                      onChange={handleChange2}
                    />
                  </div>
                  <div className="art-dimension-input">
                    <label htmlFor="year" className="art-dimension-label">
                      Year
                    </label>
                    <input
                      type="number"
                      id="year"
                      className="art-dimension newArtworkInputs"
                      placeholder="2024"
                      name="year"
                      value={formData2.year}
                      onChange={handleChange2}
                    />
                  </div>
                </div>
                <p style={{ color: "black" }}>Description</p>
                <textarea
                  name="description"
                  placeholder="Describe the artwork"
                  value={formData2.description}
                  onChange={handleChange2}
                ></textarea>

                <label className="image-uploader">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <div className="image-uploader-content">
                    <span className="image-uploader-icon">+</span>
                    <span className="image-uploader-text">Main Image</span>
                  </div>
                </label>
                <div className="art-signin-button-container">
                  <button
                    className="art-signin-button art-signin-prev"
                    onClick={prevStep}
                  >
                    <img
                      src="elements/reverse_arrow.svg"
                      className="arrow_inverse"
                      alt=""
                    />
                    Previous
                  </button>
                  <button
                    className="art-signin-button art-signin-next"
                    onClick={nextStep}
                  >
                    Next 2/3
                    <img
                      src="elements/arrow_without--.svg"
                      className="arrow"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="art-signin-step">
                {/* Step 3: Create Your Account */}
                <p style={{ color: "black" }}>Title</p>
                <input
                  className="newArtworkInputs"
                  type="text"
                  placeholder="Artwork Title"
                  name="title"
                  value={formData3.title}
                  onClick={handleChange3}
                />
                <p style={{ color: "black" }}>Price</p>
                <input
                  type="text"
                  className="newArtworkInputs"
                  placeholder="Price"
                />
                <p style={{ color: "black" }}>Categorie</p>
                <select>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p style={{ color: "black" }}>Description</p>
                <textarea placeholder="Describe the artwork"></textarea>
                <label className="image-uploader">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <div className="image-uploader-content">
                    <span className="image-uploader-icon">+</span>
                    <span className="image-uploader-text">Main Image</span>
                  </div>
                </label>
                <div className="art-signin-button-container">
                  <button
                    className="art-signin-button art-signin-prev"
                    onClick={prevStep}
                  >
                    <img
                      src="elements/reverse_arrow.svg"
                      className="arrow_inverse"
                      alt=""
                    />
                    Previous
                  </button>
                  <button
                    className="art-signin-button art-signin-create"
                    onClick={
                      // sendDataHandler();
                      () => {
                        navigate("/socialMedia");
                      }
                    }
                  >
                    Create Your Account 3/3
                    <img
                      src="elements/arrow_without--.svg"
                      className="arrow"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewArtwork;
