
import { useCallback, useEffect, useRef } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import useFetch from "../../hooks/useFetch";
import { IMAGE_UPLOAD_URL, SHOW_IMAGE_URL } from "../../constants/costants";
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fetchData, data: res, loading } = useFetch();

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fetchData({
        url: IMAGE_UPLOAD_URL,
        params: { folder: "public" },
        data: formData,
        method: "POST",
      });
    }
  }, []);

  useEffect(() => {
    if (!res) return;
    onChange(res.path);
  }, [res]);

  return (
    <div
      className=" relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center ap-4 text-neutral-600"
      onClick={handleDivClick}
    >
      <TbPhotoPlus size={50} />

      <div className="font-semibold text-lg">
        {loading ? "loading..." : "Click to upload"}
      </div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <img
            alt="upload"
            className="object-cover"
            src={SHOW_IMAGE_URL + value}
          />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        onChange={uploadImage}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
