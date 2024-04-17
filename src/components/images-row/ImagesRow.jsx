import './ImagesRow.css';

const ImagesRow = ({isLoading, images }) => {
  const imagesLabels = ['Heart', 'Lungs', 'Ribs', 'Cols']
  return (
    <div className='imagesRow'>
      {isLoading && <div>Loading...</div>}
      {!isLoading && images.map((image, index) => (
        <div className='imageCard' key={index}>
          <img
            src={`data:image;base64,${image}`}
            alt="Image"
          />
          <p className='imageLabel'>{imagesLabels[index]}</p>
        </div>
      ))}
    </div>
  )
}

export default ImagesRow;