// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef } from "react";
import { TbPhotoPlus } from "react-icons/tb";
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dwcd2xfhm",
        uploadPreset: "zs2t9zce",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          onChange(result.info.secure_url);
        }
      }
    );
  }, [onChange]);

  return (
    <div
      className="
  relative
  cursor-pointer 
  hover:opacity-70
  transition
  border-dashed
  border-2
  p-20
  border-neutral-300
  flex
  flex-col
  justify-center
  items-center
  gap-4
  text-neutral-600
"
      onClick={() => widgetRef.current.open()}
    >
      <TbPhotoPlus size={50} />
      <div className="font-semibold text-lg">Click to upload</div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <img alt="upload" className="object-cover" src={value} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
