// components/maps/LocationSearchInput.tsx
// import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

interface LocationSearchInputProps {
  onSelect: (location: {
    address: string;
    coordinates: { lat: number; lng: number };
  }) => void;
  defaultValue?: string;
}

export const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  onSelect,
  defaultValue = '',
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'il' },
      // types: ['establishment'],
    },
    defaultValue,
    debounce: 300,
  });

  // const handleSelect = async (description: string, placeId: string) => {
  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect({
        address: description,
        coordinates: { lat, lng },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

// try {
//     // שימוש ב-Places Service לקבלת מידע מפורט יותר
//     const service = new google.maps.places.PlacesService(document.createElement('div'));
    
//     service.getDetails({
//       placeId: placeId,
//       fields: ['name', 'formatted_address', 'geometry', 'place_id']
//     }, (place, status) => {
//       if (status === 'OK' && place && place.geometry?.location) {
//         onSelect({
//           place_id: placeId,
//           formatted_address: place.formatted_address || description,
//           coordinates: {
//             lat: place.geometry.location.lat(),
//             lng: place.geometry.location.lng()
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

  return (
    <div className="relative">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="w-full p-3 pr-10 pl-10 border rounded-lg"
          placeholder="הכנס כתובת..."
        />
        <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {value && (
          <button
            onClick={() => setValue('')}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {status === 'OK' && (
        <ul className="absolute z-10 w-full bg-white mt-1 border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="p-3 hover:bg-gray-50 cursor-pointer text-right border-b last:border-b-0"
            >
              <div className="flex items-center space-x-reverse space-x-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>{description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
