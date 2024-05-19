import { useRef, useState } from "react";
import styled from "styled-components";
import { CreateOwnerReq } from "../../respository/userInfo";
const Owner = () => {
  const owner = useRef();
  const { mutate: presidentCreate, data } = CreateOwnerReq();
  const [isNumber, setIsNumber] = useState("");
  const companyNumber = (e) => {
    e.preventDefault();
    const ownerValue = owner.current.value;
    let last = Number(ownerValue.slice(-1));
    let valueLength = ownerValue.length;

    if (valueLength < 12) {
      alert("사업장등록번호 다시 한번 확인해주세요.");
      return;
    } else if (last !== 5) {
      alert("사업장등록번호의 마지막 숫자는 5여야합니다.");
      return;
    }

    // 사업자 번호 전송
    const registrationNumber = {
      businessRegistrationNumber: ownerValue,
    };
    presidentCreate(registrationNumber);
  };

  const inputNumber = (e) => {
    let value = e.target.value;
    const inputValue = value.replace(/\D/g, "");
    const formattedValue = inputValue.replace(
      /^(\d{3})(\d{0,2})(\d{0,5})$/,
      (match, p1, p2, p3) => {
        let result = "";
        if (p1) result += p1;
        if (p2) result += "-" + p2;
        if (p3) result += "-" + p3;
        return result;
      }
    );

    setIsNumber(formattedValue);
  };
  return (
    <OwnerContents className="container">
      <div className="mb-[6px] mt-[30px] inline-block">
        <label className="color-gray text-[12px]"> 사업자 등록 번호</label>
      </div>
      <form className="">
        <input
          type="text"
          className="form-input block w-[100%] p-[8px] h-[53px] border border-[#d5d5d5] rounded-md"
          placeholder="사업장 등록 번호를 입력해주세요."
          name="displayName"
          onChange={(e) => inputNumber(e)}
          value={isNumber}
          maxLength={12}
          ref={owner}
        ></input>
        <div className="container absolute left-0 right-0 bottom-0 ">
          <OwnerBtn className="" onClick={(e) => companyNumber(e)} value="저장">
            저장
          </OwnerBtn>
        </div>
      </form>
    </OwnerContents>
  );
};

export default Owner;

const OwnerContents = styled.div`
  /* padding-bottom: 48px; */
  box-sizing: border-box;
  height: calc(100vh - 48px);
  margin-top: 48px;
`;

const OwnerBtn = styled.button`
  border-radius: 6px;
  line-height: 48px;
  text-align: center;
  font-size: 14px;
  width: 100%;
  /* margin-top: 0.75rem; */
  background-color: rgb(255, 61, 0);
  color: rgb(255, 255, 255);
  /* position: absolute; */
  /* bottom: 0; */
  /* left: 0; */
  /* right: 0; */
`;
