import React, { useEffect, useState } from "react";
import "./NewArtwork.css"; // Ensure this path is correct for your CSS file
import backgroundImage from "../../assets/images/Signupbackground2.png";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const newArtwork = () => {
  const [categories, setCategories] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttp();
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

  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // Call the passed in function with the selected file
      onImageSelected(event.target.files[0]);
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
                <input type="text" placeholder="Artwork Title" />
                <p style={{ color: "black" }}>Price</p>
                <input type="text" placeholder="Price" />
                <p style={{ color: "black" }}>Categorie</p>
                <select>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
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
                    className="art-signin-button art-signin-next"
                    onClick={nextStep}
                  >
                    Next 1/3
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="art-signin-step">
                {/* Step 2: Artwork Dimensions & Pricing */}
                <p style={{ color: "black" }}>Title</p>
                <input type="text" placeholder="Artwork Title" />
                <p style={{ color: "black" }}>Price</p>
                <input type="text" placeholder="Price" />
                <p style={{ color: "black" }}>Categorie</p>
                <select>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
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
                      className="art-dimension"
                      placeholder="4 m"
                    />
                  </div>

                  <div className="art-dimension-input">
                    <label htmlFor="width" className="art-dimension-label">
                      Width
                    </label>
                    <input
                      type="number"
                      id="width"
                      className="art-dimension"
                      placeholder="3 m"
                    />
                  </div>

                  <div className="art-dimension-input">
                    <label htmlFor="year" className="art-dimension-label">
                      Year
                    </label>
                    <input
                      type="number"
                      id="year"
                      className="art-dimension"
                      placeholder="2024"
                    />
                  </div>
                </div>
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
                    Previous
                  </button>
                  <button
                    className="art-signin-button art-signin-next"
                    onClick={nextStep}
                  >
                    Next 2/3
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="art-signin-step">
                {/* Step 3: Create Your Account */}
                <p style={{ color: "black" }}>Title</p>
                <input type="text" placeholder="Artwork Title" />
                <p style={{ color: "black" }}>Price</p>
                <input type="text" placeholder="Price" />
                <p style={{ color: "black" }}>Categorie</p>
                <select>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
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
                    Previous
                  </button>
                  <button
                    className="art-signin-button art-signin-create"
                    onClick={() => alert("Form Submitted!")}
                  >
                    Create Your Account 3/3
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

export default newArtwork;
