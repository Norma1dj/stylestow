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
            setHats(data.hats);
        }
    }

    return (
        <div>
            {hats.map(hat => {
                return (
                    <div key={hat.name} className="card mb-3 shadow">
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
                            {hat.location}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HatList
