import React, { ReactNode } from "react";
import { FullScreen, FullScreenHandle } from "react-full-screen";
import styled from "styled-components";

export interface Props {
  children: ReactNode;
  handle: FullScreenHandle;
}

const FullScreenComponent = ({ children, handle }: Props) => {
  return <FullScreenComp handle={handle}>{children}</FullScreenComp>;
};

const FullScreenComp = styled(FullScreen)`
  background-color: #fff;
  margin: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 1200px;
  height: 700px;
`;

export default FullScreenComponent;
