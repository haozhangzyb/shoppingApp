import { IconButton, Stack } from "@mui/material";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const Header = ({ handleModalOpen }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: "#111827" }}>
        <Toolbar>
          <Stack direction='row' alignItems='flex-end' spacing={1}>
            <Typography variant='h5'>Management</Typography>
            <Typography variant='subtitle1' sx={{ fontSize: "10px" }}>
              Chuwa
            </Typography>
          </Stack>

          {/* <Stack
            direction='row'
            sx={{
              ml: 2,
              flex: 1,
              backgroundColor: "white",
              maxWidth: "40%",
              borderRadius: 1,
              pl: 1,
            }}
          >
            <InputBase sx={{ width: "100%" }} placeholder='Search' />
            <IconButton>
              {" "}
              <SearchIcon />
            </IconButton>
          </Stack> */}

          <Input
            sx={{
              ml: 4,
              flex: 1,
              maxWidth: "40%",
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
              <Button sx={{ pr: 1 }}>
                <SearchIcon />
              </Button>
            }
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button
            startDecorator={<PersonIcon />}
            onClick={handleModalOpen}
          >
            Sign in
          </Button>
          <Button startDecorator={<ShoppingCartIcon />}>$0.00</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
