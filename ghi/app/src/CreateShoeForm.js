import React, { useEffect, useState } from 'react';

function CreateShoeForm() {
    const [shoes, setShoes] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [model_name, setModel] = useState('');
    const [color, setColor] = useState('');
    const [bin_location, setBin] = useState('');

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
      };

    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModel(value);
      };
      
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
      };
      
    const handleBinLocationChange = (event) => {
        const value = event.target.value;
        setBin(value);
      };



      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {};
    
        data.manufacturer = manufacturer;
        data.model_name = model_name;
        data.color = color;
        data.bin_location = bin_location;
        
      

        console.log(data);
    
        const shoeUrl = `http://localhost:8080/api/shoes/`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
          const newShoe = await response.json();
          console.log(newShoe);
    
      
        setManufacturer('');
        setModel('');
        setColor('');
        setBin('');
        setShoes([]);
        

        }
        
    
      }
      const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          setShoes(data.bins);
          console.log(data.bins)
          
          
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add Shoe</h1>
                        <form onSubmit={handleSubmit} id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleManufacturerChange} value={manufacturer} placeholder="manufacturer" required type="text" id="manufacturer"
                                    name="manufacturer" className="form-control"/>
                                <label htmlFor="manufacturer">Manufacturer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleModelNameChange} value={model_name} placeholder="model_name" required type="text" id="model_name"
                                    name="model_name" className="form-control"/>
                                <label htmlFor="model_name">Model</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleColorChange} value={color} placeholder="color" required type="text" id="color"
                                    name="color" className="form-control"/>
                                <label htmlFor="color">Color</label>
                            </div>
                           
                            <div className="mb-3">
                                <select onChange={handleBinLocationChange} required value={bin_location} id="bin_location" name="bin_location" className="form-select">
                                    <option value="">Choose a bin</option>
                                    {shoes.map((shoe) => {
                                    return (
                                        <option key={shoe.id} value={shoe.href}>
                                            {shoe.id}
                                        </option>
                                    );
                                })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className="alert alert-success d-none mb-0" id="success-message">
                            Your Shoe has been successfully created!
                          </div>
                    </div>
                </div>
            </div>
        </div>
      );






      useEffect(()  => { 
        fetchData();
      }, []);





}

export default CreateShoeForm