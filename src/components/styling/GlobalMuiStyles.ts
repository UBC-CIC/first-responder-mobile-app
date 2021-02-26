import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  wideButtonContainer: {
    width: "75%",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wideButton: {
    width: "100%",
    backgroundColor: "#FF8552",
    borderRadius: 20,
    height: "50px",
    fontFamily: "Montserrat",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export {useStyles as useGlobalStyles}