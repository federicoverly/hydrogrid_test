import React, { ReactNode } from "react";
import { Sizes } from "../styles/globalStyles";
import styled from "styled-components";

export interface Props {
  width: number;
  height: number;
  children: ReactNode;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const CustomContainer = ({ width, height, style, children }: Props) => {
  return (
    <CustomContainerComponent
      width={width}
      height={height}
      style={style && style}
    >
      {children}
    </CustomContainerComponent>
  );
};

export default CustomContainer;

const CustomContainerComponent = styled.div<{
  width: number;
  height: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: ${Sizes.padding}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
