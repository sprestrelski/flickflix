const Gallery = ({ images }) => {

    return (
      <div>
        <h3> Flicks </h3>
        <div className="flicks-container">
        {images && images.length > 0 ? (
            images.map((pic, index) => (
                <img
                    key={index}
                    className="gallery-movie"
                    src={pic}
                    alt="movie poster"
                    height="200"
                />
                
            )
            
            )
        ) : (
            <div></div>
        )}
        </div>


      </div>
    );
};

export default Gallery;
  