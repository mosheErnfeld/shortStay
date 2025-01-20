import { useEffect, useState } from "react";
import useRentModal from "../../hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
// import { LocationStep } from "../googleMapsTest/LocationStep";

export interface LocationType {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const GoogleMapModal = () => {
  const rentModal = useRentModal();

  const [locationG, setLocationG] = useState<LocationType>({
    address: "",
    coordinates: { lat: 31.7889548, lng: 35.2031488 },
  });

  useEffect(() => {
    console.log(locationG);
  }, [locationG]);

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
     
      {/* <LocationStep
        formData={locationG}
        onUpdate={(value) => setLocationG(value)}
      /> */}
    </div>
  );

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      onClose={rentModal.onClose}
      onSubmit={() => {}}
      actionLabel={"actionLabel"}
      secondaryActionLabel={"secondaryActionLabel"}
      body={bodyContent}
    />
  );
};

export default GoogleMapModal;
