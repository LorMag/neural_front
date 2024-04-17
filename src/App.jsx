import { useState } from 'react';

import './App.css';
import Header from './components/header/Header';
import ImageForm from './components/image-form/ImageForm';
import ImagesRow from './components/images-row/ImagesRow';
import Footer from './components/footer/Footer';

function App() {
  const [chestLayers, setChestLayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (images) => {
    setChestLayers(images);
  }

  const changeIsLoading = (value) => {
    setIsLoading(value);
  }

  return (
    <>
      <Header></Header>
      <div style={{marginTop: 20}}>
        <ImageForm onSubmit={handleSubmit} onLoading={changeIsLoading}></ImageForm>
      </div>
      <div style={{marginTop: 60}}>
        <ImagesRow images={chestLayers} isLoading={isLoading}></ImagesRow>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
