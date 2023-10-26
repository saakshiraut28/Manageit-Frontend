
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TaskCard() {
  return (
    <div className='border-black border-2 rounded-lg mx-4 '>
        <Accordion classes={'border-none px-2'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><p className='font-bold text-xl'>Task Title 1</p></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography> 
            <p className='text-sm mb-2'>
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className='text-sm md:space-x-3 space-y-2'>
              <span className='bg-[#EFE2FF] rounded-full px-4 py-1 inline-block '> Assigned By: @Mayank </span>
              <span className='bg-[#FFE7E7] rounded-full px-4 py-1 inline-block '> Deadline: 14 Oct, 2023  </span>
              <span className='bg-[#B3FCAD] rounded-full px-4 py-1 inline-block '> In Progress </span>
            </div>
          </Typography>          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}