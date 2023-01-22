import React from "react";

import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/joy/Stack";
// import Link from "@mui/joy/Link";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 90,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#111827",
        px: 4,
        color: "white",
      }}
    >
      <Typography variant='subtitle1'>
        ©2022 All Rights Reserved
      </Typography>

      <Stack direction='row'>
        <IconButton sx={{ color: "inherit" }}>
          <YouTubeIcon />
        </IconButton>
        <IconButton sx={{ color: "inherit" }}>
          <TwitterIcon />
        </IconButton>
        <IconButton sx={{ color: "inherit" }}>
          <FacebookIcon />
        </IconButton>
      </Stack>
      <Stack direction='row' spacing={3}>
        <Link
          href='#'
          underline='hover'
          sx={{
            color: "inherit",
          }}
        >
          Contact Us
        </Link>
        <Link
          href='#'
          underline='hover'
          sx={{
            color: "inherit",
          }}
        >
          Privacy Policies
        </Link>
        <Link
          href='#'
          underline='hover'
          sx={{
            color: "inherit",
          }}
        >
          Help
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
