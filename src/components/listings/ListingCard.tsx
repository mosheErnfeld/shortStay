import { useCallback, useMemo } from "react";
import useCountries from "../../hooks/useCountries";
import { Listing, Reservation } from "../../types";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { SHOW_IMAGE_URL } from "../../constants/costants";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCancel: any = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    return `${format(new Date(reservation.startDate), "PP")} - ${format(
      new Date(reservation.endDate),
      "PP"
    )}`;
  }, [reservation]);
  
  return (
    <div
      onClick={() => navigate(`/listing/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full aspect-square relative overflow-hidden rounded-xl">
          <img
            src={SHOW_IMAGE_URL + data.imageSrc}
            alt="Listings"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
