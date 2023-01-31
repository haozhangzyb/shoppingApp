import {
  Typography,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { productListSortMenuItems } from "../../Constants";

const ListHeader = (props) => {
  const navigate = useNavigate();
  return (
    <Grid2
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "flex-end",
      }}
    >
      <Typography
        variant='h5'
        sx={{
          my: "auto",
        }}
      >
        Products
      </Typography>
      <Stack direction='row'>
        <FormControl
          sx={{
            m: 1,
          }}
          size='small'
        >
          <Select
            id='demo-simple-select'
            value={props.sortMenuValue}
            onChange={props.handleChange}
            sx={{
              width: 180,
            }}
          >
            <MenuItem value={productListSortMenuItems.LAST_ADDED}>
              {productListSortMenuItems.LAST_ADDED}
            </MenuItem>
            <MenuItem value={productListSortMenuItems.PRICE_HIGH_TO_LOW}>
              {productListSortMenuItems.PRICE_HIGH_TO_LOW}
            </MenuItem>
            <MenuItem value={productListSortMenuItems.PRICE_LOW_TO_HIGH}>
              {productListSortMenuItems.PRICE_LOW_TO_HIGH}
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          sx={{
            bgcolor: "#4f48dd",
            m: 1,
            textTransform: "none",
          }}
          onClick={() => navigate("/addProduct")}
        >
          Add Product
        </Button>
      </Stack>
    </Grid2>
  );
};
export default ListHeader;
