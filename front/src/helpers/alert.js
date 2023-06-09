function activateAlert(alertState, setAlertState, err, setErrorMsg, ms) {
  if (alertState) return false;

  setAlertState(true);
  setErrorMsg(err.response?.data?.message || err?.message || err);

  setTimeout(() => {
    setAlertState(false);
    setErrorMsg('');
  }, ms);
  return true;
}

export default activateAlert;
