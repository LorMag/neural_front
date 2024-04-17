import { useState } from 'react';

import { FileUploader } from "react-drag-drop-files";

import './ImageForm.css';

function getImages(formData) {
  return fetch('http://localhost:8080/api/predict_lung', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}


const ImageForm = ({ onLoading, onSubmit }) => {
  const [formData, setFormData] = useState({
    neuralType: '',
    lungImage: '',
    fileName: '',
  });

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }

  const handleImageChange = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData(prevData => ({
        ...prevData,
        lungImage: reader.result.split(',')[1],
        fileName: file.name,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onLoading(true);
    getImages(formData)
      .then(data => onSubmit(data.predictedMasks))
      .catch(error => {
        console.log(error);
        return [];
      })
      .finally(() => onLoading(false));
  };

  return (
    <>
      <div>
        <form className='imageForm' onSubmit={handleSubmit}>
          <div>
            <div className="form_radio_btn">
              <input
                id="linkNet"
                type="radio"
                name="neuralType"
                value="link-net"
                checked={formData.neuralType === "link-net"}
                onChange={handleChange}
              />
              <label htmlFor="linkNet">LinkNet</label>
            </div>

            <div className="form_radio_btn">
              <input
                id="Unet"
                type="radio"
                name="neuralType"
                value="u-net"
                checked={formData.neuralType === "u-net"}
                onChange={handleChange}
              />
              <label htmlFor="Unet">U-Net</label>
            </div>

            <div className="form_radio_btn">
              <input
                id="fpn"
                type="radio"
                name="neuralType"
                value="FPN"
                checked={formData.neuralType === "FPN"}
                onChange={handleChange}
              />
              <label htmlFor="fpn">FPN</label>
            </div>
          </div>

          <FileUploader
            classes="fileUploader"
            handleChange={handleImageChange}
            name="file"
          />

          {formData.lungImage && (
            <div className='uploadedImg'>
              <img src={`data:image;base64,${formData.lungImage}`} alt="Uploaded" />
            </div>
          )}

          {formData.neuralType && formData.lungImage && (
            <button className='submitBtn'>Submit</button>
          )}
        </form>
      </div>
    </>
  )
}

export default ImageForm;