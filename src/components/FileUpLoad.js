import { useRef } from "react";
import styled from "styled-components";
const FileUpLoad = ({ setPhotoToAddList, photoToAddList, isphoto }) => {
  const photoInput = useRef();

  const handlePhoto = (e) => {
    const temp = [];
    const photoToAdd = e.target.files;

    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push({
        file: photoToAdd[i],
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

  const photoToAddPreview = () => {
    if (photoToAddList.length > 10) {
      alert("최대 10장만 가능합니다.");
      return;
    }
    // console.log(photoToAddList);
    return photoToAddList.map((photo) => {
      // console.log("photo.file", photo.file);
      // let photoUrl = URL.createObjectURL(photo.file);
      // return (
      // <div className="photoBox" key={photoUrl}>
      //   <div
      //     className="photoBoxDelete icon delect-icon"
      //     onClick={() => onRemoveToAdd(photo.file.name)}
      //   />
      //   <img className="photoPreview size-[100%]" src={photoUrl} />
      // </div>
      // );
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
    </div>
  );
};

export default FileUpLoad;
const PictureFilled = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f9f9f9;
`;
