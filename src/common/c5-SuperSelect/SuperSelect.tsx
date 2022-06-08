import React, {
  SelectHTMLAttributes,
  DetailedHTMLProps,
  ChangeEvent,
} from "react";
import SuperButton from "../c2-SuperButton/SuperButton";
import classes from "./SuperSelect.module.css";

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[];
  onChangeOption?: (option: any) => void;
};

export const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const [open, setOpen] = React.useState(false);
  const selectOptions: any[] = [
    "Select element",
    "Apples",
    "Bananas",
    "Oranges",
    "Grapes",
  ];

  const onChangeHandler = (event: ChangeEvent<any>) => {
    onChange && onChange(event);
    onChangeOption && onChangeOption(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const toogleHandler = () => {
    console.log("toggle");
  };

  // const finalStyle = open ? `${classes.select}` :

  return (
    <div>
      <SuperButton className={classes.button} onClick={handleOpen}>
        Open the select
      </SuperButton>
      <select className={classes.select} onChange={toogleHandler}>
        {/* <option>Select element</option> */}
        {selectOptions.map((el, ind) => (
          <option key={ind + 1}>{el}</option>
        ))}
      </select>
    </div>
  );
};
