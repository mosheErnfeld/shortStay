import { SHOW_IMAGE_URL } from "../../constants/costants";
import useCountries from "../../hooks/useCountries";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <img src={SHOW_IMAGE_URL + imageSrc} alt="Image" className="object-cover w-full"/>
        <div className="absolute top-5 right-5">
            <HeartButton 
                listingId={id}
            />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
