import React, {useEffect, useState} from 'react'

function HatForm() {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [fabric, setFabric] = useState("");
    const [location, setLocation] = useState("");
    const [success, setSuccess] = useState(false);

    let successClasses = "alert alert-success d-none mb-0";
    let formClasses = "";
    if (success === true) {
        successClasses = "alert alert-success mb-0";
        formClasses = "d-none";
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleColorChange = (event) => {
        setColor(event.target.value);
    }

    const handleFabricChange = (event) => {
        setFabric(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.color = color;
        data.fabric = fabric;
        data.location = location;

        const createHatUrl = "http://localhost:8090/api/hats/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applications/json',
            }
        }

        const response = await fetch(createHatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);

            setName("");
            setColor("");
            setFabric("");
            setLocation("");
            setSuccess(true);
        }
    }

    const fetchLocations = async() => {
        const url = 'http://localhost:8100/api/locations/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    useEffect(() => {
        fetchLocations();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new hat</h1>
                    <form className={formClasses} onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationChange} required name="location" id="location" className="form-select">
                                <option value="">Choose a location</option>
                                {locations.map(location => {
                                    return (
                                        <option key={location.href} value={location.href}>
                                            {location.closet_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className={successClasses} id="success-message">
                        Hat added to inventory!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HatForm
