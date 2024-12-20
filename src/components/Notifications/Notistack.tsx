import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material/styles";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  () => ({
    "&.notistack-MuiContent-default": {
      //   backgroundColor: "rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(75, 0, 130, 0.01)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      color: "#ffffff",
      borderRadius: "16px",
      padding: "2px",
      border: "1px solid rgba(255, 255, 255, 0.30)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Inter', sans-serif",
      fontSize: "14px",
      lineHeight: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "400px",
      margin: "0 auto",
      "& button": {
        color: "#ff4d4d",
        // backgroundColor: "#ff4d4d" ,
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "medium",
        padding: "4px 8px",
        borderRadius: "4px",
        transition: "background-color 0.2s, color 0.2s",
      },
      "@media (min-width: 640px)": {
        fontSize: "16px",
        padding: "15px",
        maxWidth: "700px",
      },
    },
  })
);
