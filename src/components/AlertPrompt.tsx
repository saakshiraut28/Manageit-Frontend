import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRecoilState } from 'recoil';
import { alertAtom } from "../atom/global"


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertPrompt() {
  const [alertState, setalertState] = useRecoilState(alertAtom) ;
	const vertical = 'top', horizontal = 'center';

  React.useEffect(() => {
    if (alertState.open) {
      setTimeout(() => {
        setalertState(prev => ({...prev, open: false})) ;
      }, 3000);
    }
  }, [alertState.open])
  

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setalertState({ open: false, text: '', eventType: 'success' }) ;
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar 
				open={alertState.open} 
				autoHideDuration={6000} 
				onClose={handleClose}
				anchorOrigin={{ vertical, horizontal }}
				key={vertical + horizontal}
			>
        <Alert onClose={handleClose} severity={alertState.eventType} sx={{ width: '100%' }}>
          {alertState.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

// Severity option : error , warning, info, success