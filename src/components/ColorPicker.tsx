import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  colors: string[];
  selectedColor: string;
  handleSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<Props> = ({
  colors,
  handleSelectColor,
  selectedColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null!);
  const debouncedValue = useDebounce(selectedColor, 3000);

  const handleClick = (color: string) => {
    if (isOpen) {
      handleSelectColor(color);
      if (color == selectedColor) {
        closeWrapper();
      }
    } else {
      setIsOpen(true);
      gsap.to(wrapper.current, {
        width: 500,
        padding: "1rem 2rem",
      });
    }
  };

  const closeWrapper = () => {
    gsap.to(wrapper.current, {
      width: "42px",
      borderRadius: "50",
      padding: 0,

      onComplete: () => setIsOpen(false),
    });
  };

  useEffect(() => {
    closeWrapper();
  }, [debouncedValue]);

  return (
    <div ref={wrapper} className='color-picker-container'>
      {colors.map((color) => {
        return (
          <span
            onClick={() => handleClick(color)}
            style={{ background: `${!isOpen ? selectedColor : color}` }}
            className={`single-color ${
              color === selectedColor ? "is-selected" : ""
            }`}
            key={color}
          ></span>
        );
      })}
    </div>
  );
};

export default ColorPicker;
