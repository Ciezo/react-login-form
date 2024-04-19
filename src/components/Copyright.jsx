import * as React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © Cloyd Van Secuya"}
      <br />
      <Link color="inherit" to="https://cloydvansecuya-blog.vercel.app/">
        My Portfolio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
