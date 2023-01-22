import { Fragment, useState } from "react";
import { Box } from "@mui/system";

import "./App.css";

import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import SignInModal from "./SignInModal";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Header handleModalOpen={handleOpen} />
      <SignInModal open={open} handleClose={handleClose} />
      <Box
        sx={{
          height: "93vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          // bgcolor: "#a2a8d3",
        }}
      >
        <Body />
        <Footer />
      </Box>
    </Fragment>
  );
}

export default App;
