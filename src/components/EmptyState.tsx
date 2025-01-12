import { Link } from "react-router";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact match",
  subtitle = "Try changing or removing some your filters",
  showReset = true,
}) => {
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Link to="/">
            <Button outline label="Remove all filters" onClick={() => {}} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
