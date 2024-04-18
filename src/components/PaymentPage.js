import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
const PaymentPage = () => {
  const location = useLocation();
  console.log(location.subKey2);
  return (
    <PaymentContents>
      {/* 예약 정보 */}
      <section className=" container">
        <h2 className="">예약 정보</h2>
        <span className=""></span>
        <button className="">다른 사람이 방문해요</button>
      </section>
    </PaymentContents>
  );
};

export default PaymentPage;

const PaymentContents = styled.div`
  /* padding-bottom: 48px; */
  box-sizing: border-box;
  min-height: calc(100vh - 47px);
  margin-top: 47px;
`;
