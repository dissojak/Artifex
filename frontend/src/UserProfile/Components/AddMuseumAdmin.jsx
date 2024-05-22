import React, { useEffect, useState } from "react";
import "./AddMuseumAdmin.css";


const AddMuseumAdmin = (props) => {
 
  return (
    <>
     
     <div className="add-museum-container">
      <div className="add-museum-form-section">
        <h2 style={{margin: '30px 0' ,marginTop:'24px'}}>Add Museum</h2>
        <div className="add-museum-form-group">
          <label>Title</label>
          <input  placeholder="e.g. Jazz Movement: Fizz [Shark of the Ocean]" />
        </div>
        <div className="add-museum-form-group-row">
          <div className="add-museum-form-group">
            <label>Client Price</label>
            <input placeholder="1000 DT" />
          </div>
          <div className="add-museum-form-group">
            <label>Artist Price</label>
            <input placeholder="1000 DT" />
          </div>
        </div>
        <div className="add-museum-form-group-row">
          <div className="add-museum-form-group">
            <label>Client Places</label>
            <input  placeholder="150" />
          </div>
          <div className="add-museum-form-group">
            <label>Artist Places</label>
            <input  placeholder="30" />
          </div>
        </div>
        <div className="add-museum-form-group">
          <label>Description</label>
          <textarea placeholder="Optional, max 250 symbols"></textarea>
        </div>
      </div>
      <div className="sidebar">
      <div className="post-button-container-AddMuseumAdmin">
                <button
                  className="post-button-AddMuseumAdmin"
                >
                  Post
                </button>
              </div>
        <div className="add-museum-form-group">
          <label>Categories</label>
          <select>
            <option>Select Category</option>
          </select>
        </div>
        <div className="button-group">
        <div className="radioButtons-AddMuseumAdmin">
              <input
                type="radio"
                id="normale"
                name="urgency"
                defaultChecked
              />
              <label htmlFor="normale">Normale</label>
              <input
                type="radio"
                id="exclusive"
                name="urgency"
              />
              <label htmlFor="exclusive">Exclusive</label>
            </div>
        </div>
        <div className="form-group image-upload-AddMuseumAdmin">
        <label className="image-uploader-AddMuseumAdmin">
                <div className="image-uploader-content-AddMuseumAdmin">
                
                    <>
                      <span className="image-uploader-icon-AddMuseumAdmin">+</span>
                      <span className="image-uploader-text-AddMuseumAdmin">Main Image</span>
                    </>
                
               
             </div>
              </label>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddMuseumAdmin;
