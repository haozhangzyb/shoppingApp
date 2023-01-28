import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/joy/Stack";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const flexStyle = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  };
  return (
    <Grid
      container
      spacing={1}
      sx={{
        ...flexStyle,
        height: isSmallScreen ? "15vh" : "10vh",
        backgroundColor: "#111827",
        mt: 4,
        color: "white",
        // width: "100.4vw",
        // position: "fixed",
        bottom: 0,
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        order={{ xs: 3, sm: 3, md: 1 }}
        sx={flexStyle}
        pt={1.6}
      >
        <Typography variant='subtitle1'>
          ©2022 All Rights Reserved
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        order={{ sm: 1, md: 2 }}
        sx={flexStyle}
      >
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
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        order={{ sm: 2, md: 3 }}
        sx={flexStyle}
        pt={1.7}
      >
        <Stack direction='row' spacing={3} sx={flexStyle}>
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
      </Grid>
    </Grid>
  );
};

export default Footer;
