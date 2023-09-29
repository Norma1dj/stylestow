import React, {useEffect, useState} from 'react';

const ShoeList = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/shoes/');
      if (response.ok) {
        const data = await response.json();
        setShoes(data.shoes);
      } else {
        console.error('Failed to fetch shoes:', response.status);
      }
    } catch (error) {
      console.error('Error fetching shoes:', error);
    }
  };

  const handleDelete = async (shoeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/shoes/${shoeId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted shoe from the state
        setShoes((prevShoes) => prevShoes.filter((shoe) => shoe.id !== shoeId));
      } else {
        console.error('Failed to delete shoe:', response.status);
      }
    } catch (error) {
      console.error('Error deleting shoe:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Shoe List</h1>
      <div className="row">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={shoe.picture_url} className="card-img-top" alt={` ${shoe.model_name}`} />
              <div className="card-body">
                <h3 className="card-title">{shoe.model_name}</h3>
                <p className="card-text">
                   {shoe.manufacturer}
                   <br />
                Closet: {shoe.bin_location.closet_name}
                <br />
                Bin Number: {shoe.bin_location.bin_number}
                </p>
                <button
                  onClick={() => handleDelete(shoe.id)}
                  className="btn btn-dark"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeList;
