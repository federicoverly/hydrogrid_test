import React from "react";
import styled from "styled-components";
import { Sizes } from "../styles/globalStyles";

export interface Props {
  text: string;
  color: string;
  style?: React.CSSProperties;
}

export interface Props {
  text: string;
  color: string;
}

const Title = ({ text, color }: Props) => {
  return <TitleComponent color={color}>{text}</TitleComponent>;
};

export default Title;

const TitleComponent = styled.h2<{
  color: string;
}>`
  font-size: ${Sizes.h1};
  text-transform: uppercase;
  text-align: center;
  color: ${(props) => props.color};
  margin: 0;
  padding: 0;
`;
