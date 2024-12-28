import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material/styles";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  () => ({
    "&.notistack-MuiContent-default": {
      backgroundColor: "rgba(109, 40, 217, 0.05)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      color: "#ffffff",
      borderRadius: "16px",
      padding: "12px 24px",
      border: "1px solid rgba(139, 92, 246, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "14px",
      lineHeight: "1.5",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "400px",
      margin: "0 auto",
      transition: "all 0.3s ease",
      animation: "slideIn 0.3s ease-out",

      "&:hover": {
        backgroundColor: "rgba(109, 40, 217, 0.1)",
        borderColor: "rgba(139, 92, 246, 0.3)",
      },

      "& button": {
        color: "rgb(139, 92, 246)",
        background: "rgba(139, 92, 246, 0.1)",
        border: "1px solid rgba(139, 92, 246, 0.2)",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "500",
        padding: "6px 12px",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        "&:hover": {
          background: "rgba(139, 92, 246, 0.2)",
          borderColor: "rgba(139, 92, 246, 0.3)",
        },
      },

      "@media (min-width: 640px)": {
        fontSize: "14px",
        padding: "16px 32px",
        maxWidth: "600px",
      },

      "@keyframes slideIn": {
        "0%": {
          transform: "translateY(-20px)",
          opacity: 0,
        },
        "100%": {
          transform: "translateY(0)",
          opacity: 1,
        },
      },
    },
  })
);
