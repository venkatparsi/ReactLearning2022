import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import { Label } from '@mui/icons-material';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Chapter(props) {   
  return (
    <div style={{paddingTop:"30px"}}>
      <Stack
        direction={{ xs: 'row', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
          <Label/>
            {props?.book}
		  <Label/>
            {props?.chapter}							
      </Stack>
    </div>
  );
}