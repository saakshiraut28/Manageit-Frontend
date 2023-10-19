import Backdrop from '@mui/material/Backdrop';
import { loadingAtom } from '../atom/global';
import { useRecoilValue } from 'recoil';
import HashLoader from "react-spinners/HashLoader";

export default function Loading() {
  const {open, text} = useRecoilValue(loadingAtom) ;
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 , flexDirection: 'column' }}
        open={open}
      >
        <HashLoader
            color={'#00C4FF'}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        {(text && text.length>0) && <p className='mt-4'>{text}</p>}
      </Backdrop>
    </div>
  );
}
