import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import React, {
  SelectHTMLAttributes,
  DetailedHTMLProps,
  ChangeEvent,
} from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const mappedOptions: any[] = options
    ? options.map((el, ind) => (
        <MenuItem key={ind} value={el}>
          {el}
        </MenuItem>
      ))
    : [""]; // map options with key

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

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Open the select
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Letters</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={onChangeHandler}
          value={restProps.value}
          //   {...restProps}
        >
          {mappedOptions}
        </Select>
      </FormControl>
    </div>
  );
};
