import React from "react";
import styled from "styled-components";

export interface Props {
  height: number;
}

const Spacer = ({ height }: Props) => {
  return <SpacerComponent height={height} />;
};

const SpacerComponent = styled.div<{
  height: number;
}>`
  height: ${(props) => props.height}px;
`;

export default Spacer;
