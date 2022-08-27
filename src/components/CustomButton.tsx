import styled from "styled-components";

export interface Props {
  text: string;
  textColor: string;
  backgroundColor: string;
  width: number;
  height: number;
  onClick: () => void;
  style?: React.CSSProperties;
}

const CustomButton = ({
  text,
  backgroundColor,
  textColor,
  width,
  height,
  onClick,
  style,
}: Props) => {
  return (
    <ButtonComponent
      backgroundColor={backgroundColor}
      textColor={textColor}
      width={width}
      height={height}
      onClick={onClick}
      style={style}
    >
      {text}
    </ButtonComponent>
  );
};

export default CustomButton;

const ButtonComponent = styled.button<{
  backgroundColor: string;
  textColor: string;
  width: number;
  height: number;
}>`
  font-size: 1em;
  color: ${(props) => props.textColor};
  border: 0px solid ${(props) => props.backgroundColor};
  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 10px;
  margin: 10px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.textColor};
    color: ${(props) => props.backgroundColor};
  }
`;
