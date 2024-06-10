import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

/**
 * 별점 아이콘
 * @returns
 */
const StarsComponent = ({ startAvg }) => {
  const totalStars = 5;
  const [stars, setStars] = useState(startAvg <= 5 ? startAvg.toFixed(1) : 5);
  const createArray = (length) => [...Array(length)];


  const Stars = ({ selected = false, onSelect = (f) => f }) => (
    <FaStar color={selected ? "FFC94A" : "gray"} />
  );

  useEffect(() => {
    console.log(startAvg);
  }, []);

  return (
    <StarRate className="flex items-center">
      {createArray(totalStars).map((n, i) => (
        <Stars key={i} selected={stars > i} onSelect={() => setStars(i + 1)} />
      ))}
      <span className="starAvg">{stars}</span>
      <span className="reviewAvg"></span>
    </StarRate>
  );
};

export default StarsComponent;

const StarRate = styled.div`
  .starAvg {
    font-size: 14px;
    position: relative;
    padding-left: 8px;
    display: inline-block;
    vertical-align: middle;
    font-weight: 500;
  }
`;
