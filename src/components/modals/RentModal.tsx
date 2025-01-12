import { useEffect, useMemo, useState } from "react";
import useRentModal from "../../hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
// import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { addListing } from "../../store/featured/listingSlice";
import useFetch from "../../hooks/useFetch";
import { useAuthCookies } from "../../hooks/useAuthCookies";
import { CREATE_LISTING } from "../../constants/costants";
// import { LocationStep } from "../test/components/steps/LocationStep";
// import { LocationGoogle } from "../test/components/steps/LocationGoogle";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  // LOCATION_GOOGLE = 2,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

// interface LocationType {
//   location: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
// }

const RentModal = () => {
  // const [locationG, setLocationG] = useState({
  //   location: "",
  //   coordinates: { lat: 32.0853, lng: 34.7818 },
  // });

  // const currentUser = useAppSelector((state) => state.currentUser.user);

  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const dispatch = useDispatch();
  const { fetchData, data: res, loading } = useFetch();
  const { userId } = useAuthCookies();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    data.user = userId;
    console.log(data.location.value)
    console.log(location)
    // data.user = "0dda6fc4-092a-4921-9e80-06c2937d7218";
    data.locationValue = data.location.value
    fetchData({ url: CREATE_LISTING, method: "POST", data });
  };

  useEffect(() => {
    if (!res) return;
    dispatch(addListing(res));
    toast.success("Listing Created");
    setStep(STEPS.CATEGORY);
    reset();
    rentModal.onClose();
  }, [res]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best description your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            {
              <CategoryInput
                onClick={(category) => setValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {

    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          // onChange={(value) => console.log("location", value.value)}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  // if (step === STEPS.LOCATION_GOOGLE) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Where is your place located?"
  //         subtitle="Help guests find you!"
  //       />
  //       <LocationGoogle
  //         formData={locationG}
  //         onChange={(value: LocationType) => setLocationG(value)}
  //       />
  //       {/* <CountrySelect
  //         value={location}
  //         onChange={(value) => setCustomValue("location", value)}
  //       />
  //       <Map center={location?.latlng} /> */}
  //     </div>
  //   );
  // }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />

        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best1"
        />
        <Input
          id="title"
          label="Title"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
