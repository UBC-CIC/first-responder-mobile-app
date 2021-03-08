import { makeStyles, TextField, TextFieldProps } from "@material-ui/core";
import { ReactElement } from "react";
import Colors from "../styling/Colors";
const useStyles = makeStyles({
  textField: {
    margin: 10,
    color: Colors.theme.platinum,
  },
  inputLabel: {
    color: Colors.theme.platinum,
    fontFamily: "Montserrat",
  },
});
export const DarkModeTextField = (props: TextFieldProps): ReactElement => {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      InputLabelProps={{
        className: classes.inputLabel,
      }}
      InputProps={{
        className: classes.inputLabel,
      }}
      className={classes.textField}
    />
  );
};
