import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Alerts = () => {
  const alertState = useSelector((state) => state.alertReducer);

  return (
    alertState != null &&
    alertState.length > 0 &&
    alertState.map((alert) => (
      <Alert
        severity={alert.alertType}
        key={alert.id}
        sx={{ mb: 1, maxHeight: 50 }}
      >
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
