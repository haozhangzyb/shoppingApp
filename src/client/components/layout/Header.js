import { useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
  useMediaQuery,
  Skeleton,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as logoutAction } from "../../actions/auth";
import { getCart } from "../../actions/cart";
import { openAuthModal } from "../../actions/authModal";
import { openCartModal } from "../../actions/cartModal";
import { userType } from "../../Constants";
import { setSearchInput } from "../../actions/product";

const SearchBox = ({ isSmallScreen, onChange, value }) => {
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
      onChange={(e) => onChange(e)}
      value={value}
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

const Header = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cartReducer);
  const cartStateJson = JSON.stringify(cartState);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const searchInput = useSelector(
    (state) => state.productReducer.searchInput
  );

  // useEffect(() => {
  //   // if (isAuthenticated) dispatch(getCart());
  //   dispatch(getCart());
  // }, [cartStateJson, dispatch]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const AuthButton = () => {
    if (authState.isLoading) {
      return <p>loading...</p>;
    }

    if (authState.isAuthenticated) {
      return (
        <Button
          startDecorator={<PersonIcon />}
          onClick={() => logoutAction()(dispatch)}
        >
          Log out
        </Button>
      );
    }
    return (
      <Button
        startDecorator={<PersonIcon />}
        onClick={() => openAuthModal()(dispatch)}
      >
        Log in
      </Button>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position='static' sx={{ backgroundColor: "#111827" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              // alignContent: "flex-end",
            }}
          >
            <Stack
              direction='row'
              alignItems='flex-end'
              spacing={1}
              mr={2}
              onClick={() => {
                navigate("/");
              }}
              // flexGrow={1}
            >
              {isSmallScreen ? (
                <Typography variant='h5'>
                  {authState.userType == userType.ADMIN ? "M" : "H"}
                </Typography>
              ) : (
                <Typography variant='h5'>
                  {authState.userType == userType.ADMIN
                    ? "Management"
                    : "Hi"}
                </Typography>
              )}
              <Typography variant='subtitle1' sx={{ fontSize: "10px" }}>
                Shopping
              </Typography>
            </Stack>
            {!isSmallScreen && (
              <SearchBox
                isSmallScreen={isSmallScreen}
                onChange={(e) => setSearchInput(e)(dispatch)}
                value={searchInput}
              />
            )}

            <Stack
              direction={"row"}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <AuthButton />

              <Button
                sx={{ paddingRight: "0 !important" }}
                onClick={() => {
                  dispatch(openCartModal());
                }}
                startDecorator={
                  <Badge
                    badgeContent={cartState.totalQuantity}
                    showZero
                    sx={{
                      "& .MuiBadge-badge": {
                        // color: "lightgreen",
                        backgroundColor: "red",
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                }
              >
                ${cartState.total}
              </Button>
              {/* </Badge> */}
            </Stack>
          </Box>
        </Toolbar>
        {isSmallScreen && (
          <Toolbar>
            <SearchBox
              isSmallScreen={isSmallScreen}
              onChange={(e) => setSearchInput(e)(dispatch)}
              value={searchInput}
            />
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
};

export default Header;
