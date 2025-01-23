// components/maps/GoogleMapComponent.tsx
import { GoogleMap, Marker } from "@react-google-maps/api";


interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  // onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.5rem",
};

const defaultOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  // mapTypeControl: true,
  // streetViewControl: true,
};

export const GoogleMapComponent: React.FC<MapProps> = ({
  center,
  // onLocationSelect,
}) => {
  

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={15}
      options={defaultOptions}
      // onClick={handleClick}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
