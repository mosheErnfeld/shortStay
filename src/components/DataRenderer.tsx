import { ReactNode } from "react";
import LoadingPage from "../pages/LoadingPage";
import toast from "react-hot-toast";

interface DataRendererProps {
  children: ReactNode;
  error?: string;
  isLoading?: boolean;
}

const DataRenderer: React.FC<DataRendererProps> = ({
  children,
  error,
  isLoading
}) => {

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    toast.error(error);
    return;
  }

  return children;
};

export default DataRenderer;
