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

  return (
    <div className="container mt-4">
      <h1>Shoe List</h1>
      <div className="row">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={shoe.picture_url} className="card-img-top" alt={` ${shoe.model_name}`} />
              <div className="card-body">
                <h5 className="card-title">{shoe.model_name}</h5>
                <p className="card-text">
                   {shoe.manufacturer}
                  <br />
                   {shoe.color}
                  
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeList;
