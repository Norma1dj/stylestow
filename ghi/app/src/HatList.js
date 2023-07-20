import React, {useEffect, useState} from 'react';

function HatList(props) {
    const [hats, setHats] = useState([]);

    useEffect(() => {
        fetchHats();
    }, []);

    const fetchHats = async() => {
        const url = 'http://localhost:8090/api/hats/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data.hats);
            setHats(data.hats);
        }
    }

    const deleteHats = async(hatId) => {
        const url = 'http://localhost:8090/api/hats/' + hatId;
        const fetchConfig = {
            method: "delete",
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const deleteStatus = await response.json();
            console.log(deleteStatus);
            fetchHats();
        }
    }

    return (
        <div className="container mt-4">
            <h4>Inventory of Hats</h4>
            <div className="d-flex flex-wrap">
                {hats.map(hat => {
                    return (
                        <div key={hat.name} className="card mb-3 shadow w-25 h-25">
                            <img src={hat.picture_url} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{hat.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Fabric: {hat.fabric}
                                </h6>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Color: {hat.color}
                                </h6>
                            </div>
                            <div className="card-footer">
                                <div><b>Wardrobe Location:</b></div>
                                <div>{hat.location.closet_name}</div>
                                <div>Section {hat.location.section_number}</div>
                                <div>Shelf {hat.location.shelf_number}</div>
                            </div>
                            <div className="card-footer">
                                <button type="button" className="btn btn-dark" onClick={() => deleteHats(hat.id)}>Delete Hat</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HatList
