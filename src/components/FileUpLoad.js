import { useRef } from "react";
import styled from "styled-components";
const FileUpLoad = ({ setPhotoToAddList, photoToAddList, isphoto }) => {
  const photoInput = useRef();

  const handlePhoto = (e) => {
    const temp = [];
    const photoToAdd = e.target.files;

    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push({
        // id: photoToAdd[i].name,
        file: photoToAdd[i],
        // url: URL.createObjectURL(photoToAdd[i]),
      });
    }
    setPhotoToAddList(temp.concat(photoToAddList));
  };

  const handleClick = () => {
    if (photoToAddList.length >= 10) {
      alert("최대 10장만 가능합니다.");
      return;
    }
    photoInput.current.click();
  };

  const onRemoveToAdd = (deleteName) => {
    setPhotoToAddList(
      photoToAddList.filter((photo) => photo.file.name != deleteName)
    );
  };
  const photoToAdd = () => {
    return isphoto.map((photo) => {
      let photoUrl = photo.path;
      if (photoToAddList.length + isphoto.length > 10) {
        alert("최대 10장만 가능합니다.");
        return;
        // (photoToAddList.length + isphoto.length) = 10;
      }
      return (
        <div className="photoBox" key={photoUrl}>
          <div
            className="photoBoxDelete icon delect-icon"
            onClick={() => onRemoveToAdd(photo.file.name)}
          />
          <img className="photoPreview size-[100%]" src={photoUrl} />
        </div>
      );
    });
  };
  const photoToAddPreview = () => {
    if (photoToAddList.length + isphoto.length > 10) {
      alert("최대 10장만 가능합니다.");
      return;
      // (photoToAddList.length + isphoto.length) = 10;
    }

    return photoToAddList.map((photo) => {
      let photoUrl = URL.createObjectURL(photo.file);

      return (
        <div className="photoBox" key={photoUrl}>
          <div
            className="photoBoxDelete icon delect-icon"
            onClick={() => onRemoveToAdd(photo.file.name)}
          />
          <img className="photoPreview size-[100%]" src={photoUrl} />
        </div>
      );
    });
  };
  return (
    <div className="photoUploaderContent">
      <div className="photoBox addPhoto">
        <button className="icon add-icon" onClick={handleClick}></button>
        <PictureFilled onClick={handleClick} />
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          ref={photoInput}
          onChange={(e) => handlePhoto(e)}
          style={{ display: "none" }}
        />
      </div>
      {photoToAddPreview()}
      {/* {photoToAdd()} */}
    </div>
  );
};

export default FileUpLoad;
const PictureFilled = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f9f9f9;
`;
