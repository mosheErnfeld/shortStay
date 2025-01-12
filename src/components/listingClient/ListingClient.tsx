import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/store";
import { EnhancedListing } from "../../types";
import { categories } from "../navbar/Categories";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "../../hooks/useLoginModal";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";
import useFetch from "../../hooks/useFetch";
import { CREATE_RESERVATION } from "../../constants/costants";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  data: EnhancedListing;
}

const ListingClient: React.FC<ListingClientProps> = ({ data }) => {
  const { user, reservations, ...listing } = data;

  const currentUser = useAppSelector((state) => state.currentUser.user);
  const userId = useAppSelector((state) => state.currentUser.user?.id);
  const loginModal = useLoginModal();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const { fetchData, data: res, loading } = useFetch();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    fetchData({
      url: CREATE_RESERVATION,
      method: "POST",
      data: {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listing: listing?.id,
        user: userId,
      },
    });
  }, [totalPrice, dateRange, listing, currentUser, loginModal]);

  useEffect(() => {
    if (!res) return;

    toast.success("Listing reserved!");
    setDateRange(initialDateRange);
    navigate("/trips");
  }, [res]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first md-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                // onSubmit={() => {}}
                onSubmit={onCreateReservation}
                disabled={loading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// const ListingClient: React.FC<ListingClientProps> = ({
//   listing,
//   reservations = [],
// }) => {

//   const currentUser = useAppSelector((state) => state.currentUser.user);
//   const userId = useAppSelector((state) => state.currentUser.user?.id);
//   const loginModal = useLoginModal();
//   const navigate = useNavigate();

//   const disabledDates = useMemo(() => {
//     let dates: Date[] = [];

//     reservations.forEach((reservation) => {
//       const range = eachDayOfInterval({
//         start: new Date(reservation.startDate),
//         end: new Date(reservation.endDate),
//       });

//       dates = [...dates, ...range];
//     });

//     return dates;
//   }, [reservations]);

//   const [isLoading, setIsLoading] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(listing.price);
//   const [dateRange, setDateRange] = useState<Range>(initialDateRange);

//   const onCreateReservation = useCallback(() => {
//     if (!currentUser) {
//       return loginModal.onOpen();
//     }

//     setIsLoading(true);
//     console.log(userId)
//     axios
//       .post(`/api/reservation/${userId}`, {
//         totalPrice,
//         startDate: dateRange.startDate,
//         endDate: dateRange.endDate,
//         listingId: listing?.id,
//       })
//       .then((data) => {
//         console.log(data.data)
//         toast.success("Listing reserved!");
//         setDateRange(initialDateRange);
//         navigate('/trips')
//       })
//       .catch(() => {
//         toast.error("something went wrong");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [totalPrice, dateRange, listing?.id, currentUser, loginModal]);

//   useEffect(() => {
//     if (dateRange.startDate && dateRange.endDate) {
//       const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

//       if (dayCount && listing.price) {
//         setTotalPrice(dayCount * listing.price);
//       } else {
//         setTotalPrice(listing.price);
//       }
//     }
//   }, [dateRange, listing.price]);

//   const category = useMemo(() => {
//     return categories.find((item) => item.label === listing.category);
//   }, [listing.category]);

//   return (
//     <Container>
//       <div className="max-w-screen-lg mx-auto">
//         <div className="flex flex-col gap-6">
//           <ListingHead
//             title={listing.title}
//             imageSrc={listing.imageSrc}
//             locationValue={listing.locationValue}
//             id={listing.id}
//           />
//           <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
//             <ListingInfo
//               user={listing.user}
//               category={category}
//               description={listing.description}
//               roomCount={listing.roomCount}
//               guestCount={listing.guestCount}
//               bathroomCount={listing.bathroomCount}
//               locationValue={listing.locationValue}
//             />
//             <div className="order-first md-10 md:order-last md:col-span-3">
//               <ListingReservation
//                 price={listing.price}
//                 totalPrice={totalPrice}
//                 onChangeDate={(value) => setDateRange(value)}
//                 dateRange={dateRange}
//                 onSubmit={onCreateReservation}
//                 disabled={isLoading}
//                 disabledDates={disabledDates}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

export default ListingClient;
