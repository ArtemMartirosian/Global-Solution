import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';




function MapSection(props){
    const {center} = props

    return(
        <>
            <div className='container position-relative' style={props.style}>
                <Map
                    google={props.google}
                    zoom={14}
                    initialCenter={center}
                    className='position-relative'

                >
                    <Marker position={center} text='Global Solutions' />
                </Map>
            </div>
        </>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDEcXwCVfDdd5BPBaYi-jtPpXrSutfhddQ'
})(MapSection);
