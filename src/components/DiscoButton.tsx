import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { discoLinearGradient } from "../themes";

export const DiscoButton = styled(Button)<ButtonProps>(({ disabled }) => ({
  color: disabled ? "rgba(255, 255, 255, 0.3)" : "#111",
  background: disabled ? "rgba(255, 255, 255, 0.2)" : discoLinearGradient,
  backgroundSize: "120%",
  transition: "background 500ms ease-out",
  "&:hover": {
    backgroundPosition: "100%",
  },
  textTransform: "none",
  fontWeight: 600,
  padding: "8px 16px",
  width: "400px",
}));
