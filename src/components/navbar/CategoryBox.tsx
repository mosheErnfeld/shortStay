import { IconType } from "react-icons";
import qs from "query-string";
import { useSearchParams } from "react-router";
import { useCallback } from "react";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  description?: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (searchParams.size) {
      currentQuery = qs.parse(searchParams.toString());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (searchParams?.get("category") === label) {
      delete updatedQuery.category;
    }

    setSearchParams(updatedQuery);
  }, [searchParams, label]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
  ${selected ? "border-b-neutral-800" : "border-transparent"}
  ${selected ? "text-neutral-800" : "text-neutral-500"}
  `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
