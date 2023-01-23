import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const SearchBox = ({ isSmallScreen }) => {
  let style;
  if (isSmallScreen) {
    style = { width: "100%" };
  } else {
    style = {
      width: "100%",
      maxWidth: 400,
    };
  }
  return (
    <Input
      sx={{
        // display: {
        //   xs: "none",
        //   sm: "flex",
        // },
        // ml: 4,
        flex: 1,
        // width: isSmallScreen ? "100%" : "80%",
        ...style,
        borderRadius: 5,
        pl: 1,
        backgroundColor: "white",
        color: "black",
        "&:hover": {
          backgroundColor: "white",
          color: "black !important",
        },
      }}
      placeholder='Search'
      endDecorator={
        <Button
          sx={{
            pr: 1,
          }}
        >
          <SearchIcon />
        </Button>
      }
    />
  );
};

const Header = ({ handleModalOpen }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: "#111827" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Stack
              direction='row'
              alignItems='flex-end'
              spacing={1}
              mr={2}
              // flexGrow={1}
            >
              {isSmallScreen ? (
                <Typography variant='h5'>M</Typography>
              ) : (
                <Typography variant='h5'>Management</Typography>
              )}
              <Typography variant='subtitle1' sx={{ fontSize: "10px" }}>
                Chuwa
              </Typography>
            </Stack>
            {!isSmallScreen && <SearchBox isSmallScreen={isSmallScreen} />}

            <Box>
              <Button
                startDecorator={<PersonIcon />}
                onClick={handleModalOpen}
              >
                Sign in
              </Button>
              <Button
                startDecorator={<ShoppingCartIcon />}
                sx={{ paddingRight: "0 !important" }}
              >
                $0.00
              </Button>
            </Box>
          </Box>
        </Toolbar>
        {isSmallScreen && (
          <Toolbar>
            <SearchBox isSmallScreen={isSmallScreen} />
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
};

export default Header;
