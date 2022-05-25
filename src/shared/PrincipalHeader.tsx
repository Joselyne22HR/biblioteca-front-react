import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React from 'react';

interface Props {
 title: String;
 subtitle: String;
 buttonTitle?: String;
 handleClick?: () => void;
}

const PrincipalHeader = ({ title, subtitle, buttonTitle, handleClick }: Props) => {

 return (
  <Grid container justifyContent="space-between" alignItems="center">
   <Grid item>
    <Typography variant="h3" component="h3" gutterBottom>
     {title}
    </Typography>
    <Typography variant="subtitle2">{subtitle}</Typography>
   </Grid>
   {buttonTitle && handleClick && <Grid item>
    <Button
     sx={{ mt: { xs: 2, md: 0 } }}
     variant="contained"
     startIcon={<AddTwoToneIcon fontSize="small" />}
     onClick={handleClick}
    >
     {buttonTitle}
    </Button>
   </Grid>}
  </Grid>
 );
};

export default React.memo(PrincipalHeader);
