import Button from "@material-ui/core/Button";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./SuperButton.module.css";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  disabled?: boolean;
  red?: boolean;
  color?: string;
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
  red,
  color,
  disabled,
  className,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName = `${disabled ? s.disabled : s.default} `;

  // ${s.button}
  return (
    <Button
      variant="contained"
      color={color === "primary" ? "primary" : "secondary"}
      className={finalClassName}
      onClick={restProps.onClick}
      // {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    >
      {restProps.children}
    </Button>
  );
};

export default SuperButton;
