export interface LocationData {
  address?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LoactionStepProps {
  value: LocationData;
  onChange: (value: LocationData) => void;
}
