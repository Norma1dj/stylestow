import React, {useEffect, useState} from 'react';

// function ShoeList(props) {
//     const [shoes, setShoes] = useState([]);
    
//     const fetchShoes = async() => {
//         const url = 'http://localhost:8090/api/shoes/';

//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             setShoes(data.shoes);
//         }
//     }

//     useEffect(() => {
//         fetchShoes();
//     }, []);


//     return (
//         <div className="col">
//         {props.list.map(data => {
//           const conference = data.conference;
//           return (
//             <div key={conference.href} className="card mb-3 shadow">
//               <img src={conference.location.picture_url} className="card-img-top" />
//               <div className="card-body">
//                 <h5 className="card-title">{conference.name}</h5>
//                 <h6 className="card-subtitle mb-2 text-muted">
//                   {conference.location.name}
//                 </h6>
//                 <p className="card-text">
//                   {conference.description}
//                 </p>
//               </div>
//               <div className="card-footer">
//                 {new Date(conference.starts).toLocaleDateString()}
//                 -
//                 {new Date(conference.ends).toLocaleDateString()}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     )
// }

// export default ShoeList



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
          <div key={shoe} className="col-md-4 mb-4">
            <div className="card">
              <img src={shoe.picture_url} className="card-img-top" alt={`Shoe - ${shoe.model_name}`} />
              <div className="card-body">
                <h5 className="card-title">{shoe.model_name}</h5>
                <p className="card-text">
                  Manufacturer: {shoe.manufacturer}
                  <br />
                  Color: {shoe.color}
                  <br />
                  Bin Location: {shoe.bin_location}
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
