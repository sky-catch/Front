import React, { useRef, useState } from "react";
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
      <span className=" text=[16px] mb-[6px]">사업자 등록 번호</span>
      <form className="">
        <input
          type="text"
          className="form-input"
          id="owner-num"
          ref={owner}
          value={isNumber}
          onChange={(e) => inputNumber(e)}
          maxLength={12}
          placeholder="사업장 등록 번호를 입력해주세요."
        />
        <OwnerBtn className="" onClick={(e) => companyNumber(e)} value="저장">
          저장
        </OwnerBtn>
      </form>
    </OwnerContents>
  );
};

export default Owner;

const OwnerContents = styled.div`
  /* padding-bottom: 48px; */
  box-sizing: border-box;
  height: calc(100vh - 47px);
  margin-top: 47px;
`;

const OwnerBtn = styled.button`
  border-radius: 6px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  width: 100%;
  margin-top: 0.75rem;
  background-color: rgb(255, 61, 0);
  color: rgb(255, 255, 255);
`;
