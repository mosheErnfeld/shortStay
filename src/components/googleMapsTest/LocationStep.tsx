import React from "react";
import { LoadScript } from "@react-google-maps/api";
import { LoactionStepProps } from "./type";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { LocationSearchInput } from "./LocationSearchInput";
import { GOOGLE_MAPS_API_KEY } from "../../constants/costants";
const libraries = ["places", "marker"] as ["places", "marker"];

export const LocationStep: React.FC<LoactionStepProps> = ({ value, onChange }) => {
  const handleLocationSelect = (location: {
    address: string;
    coordinates: { lat: number; lng: number };
  }) => {
    onChange({
      address: location.address,
      coordinates: location.coordinates,
    });
    
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      {/* <div className="space-y-6"> */}
        <LocationSearchInput
          onSelect={handleLocationSelect}
          defaultValue={value.address}
        />

        {value.coordinates.lat !== 0 && (
          // <div className="mt-4">
            <GoogleMapComponent
              center={value.coordinates}
              // onLocationSelect={(coords) => onChange({ coordinates: coords })}
            />
          // </div>
        )}
      {/* </div> */}
    </LoadScript>
  );
};
