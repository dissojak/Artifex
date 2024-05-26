import React, { useEffect, useState } from "react";
import "./AddMuseumAdmin.css";
import { useCreateMuseumMutation } from "../../slices/museumsSlice";
import { toast } from "react-toastify";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import UploadWidget from "../../shared/components/FormElements/UploadWidget";

const AddMuseumAdmin = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [categories, setCategories] = useState([]);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberMaxArtists, setNumberMaxArtists] = useState("");
  const [numberMaxClients, setNumberMaxClients] = useState("");
  const [priceClient, setPriceClient] = useState("");
  const [priceArtist, setPriceArtist] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [isExclusive, setIsExclusive] = useState(false);
  const [idCategory, setIdCategory] = useState("");
  const [img, setImg] = useState("");

  // Validation state
  const [errors, setErrors] = useState({});

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

  const saveDataImg = (url) => {
    setImg(url);
  };

  const validate = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!description.trim()) errors.description = "Description is required";
    else if (description.length > 150)
      errors.description = "Description must be at most 150 characters long";
    if (!numberMaxArtists || numberMaxArtists < 5)
      errors.numberMaxArtists = "Invalid number of maximum artists";
    if (!numberMaxClients || numberMaxClients < 5)
      errors.numberMaxClients = "Invalid number of maximum clients";
    if (!priceClient || isNaN(priceClient))
      errors.priceClient = "Price for clients must be numeric";
    if (!priceArtist || isNaN(priceArtist))
      errors.priceArtist = "Price for artists must be numeric";
    if (!dateStart) errors.dateStart = "Invalid start date";
    if (!dateEnd) errors.dateEnd = "Invalid end date";
    if (!idCategory) errors.idCategory = "Invalid category ID";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [create] = useCreateMuseumMutation();
  const createHandler = async () => {
    if (!validate()) {
      console.log("here");
      return;}

    try {
      const res = await create({
        title,
        description,
        museumImage: img,
        numberMaxArtists,
        numberMaxClients,
        priceClient,
        priceArtist,
        dateStart,
        dateEnd,
        isExclusive,
        idCategory,
      }).unwrap();
      console.log(res)
      toast.success("Museum created successfully");
      // Reset form after successful creation
      setTitle("");
      setDescription("");
      setNumberMaxArtists("");
      setNumberMaxClients("");
      setPriceClient("");
      setPriceArtist("");
      setDateStart("");
      setDateEnd("");
      setIsExclusive(false);
      setIdCategory("");
      setImg("");
      props.UpdateStatus();
      props.onClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && categories.length > 0 && (
        <>
          <div className="add-museum-container">
            <div className="add-museum-form-section">
              <h2 style={{ margin: "30px 0", marginTop: "24px" }}>
                Add Museum
              </h2>
              <div className="add-museum-form-group">
                <label>Title</label>
                <input
                  placeholder="e.g. Jazz Movement: Fizz [Shark of the Ocean]"
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.length <= 16) {
                        setTitle(e.target.value);
                    }
                }}
                />
                {errors.title && <p className="error-message">{errors.title}</p>}
              </div>
              <div className="add-museum-form-group-row">
                <div className="add-museum-form-group">
                  <label>Client Price</label>
                  <input
                    placeholder="1000 DT"
                    value={priceClient}
                    onChange={(e) => setPriceClient(e.target.value)}
                  />
                  {errors.priceClient && <p className="error-message">{errors.priceClient}</p>}
                </div>
                <div className="add-museum-form-group">
                  <label>Artist Price</label>
                  <input
                    placeholder="1000 DT"
                    value={priceArtist}
                    onChange={(e) => setPriceArtist(e.target.value)}
                  />
                  {errors.priceArtist && <p className="error-message">{errors.priceArtist}</p>}
                </div>
              </div>
              <div className="add-museum-form-group-row">
                <div className="add-museum-form-group">
                  <label>Client Places</label>
                  <input
                    placeholder="150"
                    value={numberMaxClients}
                    onChange={(e) => setNumberMaxClients(e.target.value)}
                  />
                  {errors.numberMaxClients && <p className="error-message">{errors.numberMaxClients}</p>}
                </div>
                <div className="add-museum-form-group">
                  <label>Artist Places</label>
                  <input
                    placeholder="30"
                    value={numberMaxArtists}
                    onChange={(e) => setNumberMaxArtists(e.target.value)}
                  />
                  {errors.numberMaxArtists && <p className="error-message">{errors.numberMaxArtists}</p>}
                </div>
              </div>
              <div className="add-museum-form-group">
                <label>Description</label>
                <textarea
                  placeholder="Optional, max 150 symbols"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && <p className="error-message">{errors.description}</p>}
              </div>
            </div>
            <div className="sidebar">
              <div className="post-button-container-AddMuseumAdmin" onClick={createHandler}>
                <button
                  className="post-button-AddMuseumAdmin"
                >
                  Post
                </button>
              </div>
              <div className="add-museum-form-group">
                <label>Categories</label>
                <select
                  name="category"
                  value={idCategory}
                  onChange={(e) => setIdCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.idCategory && <p className="error-message">{errors.idCategory}</p>}
              </div>
              <div className="add-museum-form-group-row">
                <div className="add-museum-form-group">
                  <label>Date Start</label>
                  <input
                    placeholder="2024-04-13"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                  />
                  {errors.dateStart && <p className="error-message">{errors.numberMaxClients}</p>}
                </div>
                <div className="add-museum-form-group">
                  <label>Date End</label>
                  <input
                    placeholder="2024-04-26"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                  />
                  {errors.dateEnd && <p className="error-message">{errors.numberMaxArtists}</p>}
                </div>
              </div>
              <div className="button-group">
                <div className="radioButtons-AddMuseumAdmin">
                  <input
                    type="radio"
                    id="normale"
                    name="urgency"
                    checked={!isExclusive}
                    onChange={() => setIsExclusive(false)}
                  />
                  <label htmlFor="normale">Normale</label>
                  <input
                    type="radio"
                    id="exclusive"
                    name="urgency"
                    checked={isExclusive}
                    onChange={() => setIsExclusive(true)}
                  />
                  <label htmlFor="exclusive">Exclusive</label>
                </div>
              </div>
              <div className="form-group image-upload-AddMuseumAdmin">
                <label className="image-uploader-AddMuseumAdmin">
                  <div className="image-uploader-content-AddMuseumAdmin">
                    <UploadWidget onUploadSuccess={saveDataImg} />

                    {img === "" ? (
                      <>
                        <span className="image-uploader-icon-AddMuseumAdmin">
                          +
                        </span>
                        <span className="image-uploader-text-AddMuseumAdmin">
                          Main Image
                        </span>
                      </>
                    ) : (
                      <img className="image-uploader-museum" src={img} alt="" />
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="just_margin"></div>
        </>
      )}
    </>
  );
};

export default AddMuseumAdmin;
