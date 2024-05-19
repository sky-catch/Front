import { useState } from "react";

const ImageUpload = ({ image }) => {
  const [files, setFiles] = useState([]);
  return (
    <div className="photoBox">
      <div
        className="photoBoxDelete icon delect-icon"
        //   onClick={() => onRemoveToAdd(photo.file.name)}
      />
      <img className="photoPreview size-[100%]" src={image.path} />
    </div>
  );
};

export default ImageUpload;
