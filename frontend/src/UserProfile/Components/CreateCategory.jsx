import "./CreateCategory.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAddCategoryMutation } from "../../slices/category";


const CreateCategory = () => {
  const [category, setCategory] = useState("");

  const [newCategory] = useAddCategoryMutation();

  const handleSubmit = async () => {
    const toastId = toast.loading("Saving New Category...");
    try {
      await newCategory({
        category,
      });
      toast.update(toastId, {
        render: "Done!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <div className="price-settingOpenOrderArtist_admin">
        <div className="prices-formOpenOrderArtist_admin">
          <div>
            <label htmlFor="category" className="labelcategoryadmin">New Category : </label>
            <input
              id="category"
              type="text"
              placeholder="e.g Digital Art"
              className="input1OpenOrderArtist_admin"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <button className="submit-btnOpenOrderArtist_admin" onClick={handleSubmit}>
         Add Category
        </button>
      </div>
    </>
  );
}

export default CreateCategory;