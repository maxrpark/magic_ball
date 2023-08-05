import { Text } from "@react-three/drei";

interface Props {
  positionY: number;
  fontSize: number;
  text: string;
}

const LabelText: React.FC<Props> = ({ positionY, fontSize, text }) => {
  return (
    <Text
      position-y={positionY}
      lineHeight={1.4}
      fontSize={fontSize}
      color='white'
      textAlign='center'
      maxWidth={3}
    >
      {text}
    </Text>
  );
};

export default LabelText;
