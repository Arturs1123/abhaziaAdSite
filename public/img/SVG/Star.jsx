import React from 'react'

export default function Star({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.7289 3.51014L15.4889 7.03014C15.7289 7.52014 16.3689 7.99014 16.9089 8.08014L20.0989 8.61014C22.1389 8.95014 22.6189 10.4301 21.1489 11.8901L18.6689 14.3701C18.2489 14.7901 18.0189 15.6001 18.1489 16.1801L18.8589 19.2501C19.4189 21.6801 18.1289 22.6201 15.9789 21.3501L12.9889 19.5801C12.4489 19.2601 11.5589 19.2601 11.0089 19.5801L8.01893 21.3501C5.87893 22.6201 4.57893 21.6701 5.13893 19.2501L5.84893 16.1801C5.97893 15.6001 5.74893 14.7901 5.32893 14.3701L2.84893 11.8901C1.38893 10.4301 1.85893 8.95014 3.89893 8.61014L7.08893 8.08014C7.61893 7.99014 8.25893 7.52014 8.49893 7.03014L10.2589 3.51014C11.2189 1.60014 12.7789 1.60014 13.7289 3.51014Z" fill={color === 'white' ? "#FFF8ED" : "#292D32"} stroke={color === 'white' ? "#FFF8ED" : "#292D32"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}