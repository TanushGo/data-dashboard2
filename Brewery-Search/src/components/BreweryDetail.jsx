import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const BreweryDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState({});


    useEffect(() => {
        const getBreweryDetail = async () => {
            const response = await fetch( 
                `https://api.openbrewerydb.org/v1/breweries/${params.id}`
            );
        
        const json = await response.json();
        setFullDetails(json);
        };
        
        getBreweryDetail().catch(console.error);
    }, []);

    console.log(fullDetails)
    return (<div>
        <h1>{fullDetails.name}</h1>
        <h4>Brewery Type: {fullDetails.brewery_type}</h4>
        <p>Address:</p>
        <p>{fullDetails.street}, {fullDetails.city}, {fullDetails.state}</p>
        <a href={fullDetails.website_url}>{fullDetails.website_url}</a>
        <p>Latitude : {fullDetails.latitude}  & Longitude : {fullDetails.longitude}</p>
    </div>
    )
}

export default BreweryDetail;