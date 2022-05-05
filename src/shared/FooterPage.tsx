import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FooterWrapper = styled(Box)(
 ({ theme }) => `
          border-radius: 0;
          margin: ${theme.spacing(3)} 0;
  `
);

const FooterPage = () => {
 return (
  <FooterWrapper>
   <Container maxWidth="lg">
    <Box
     py={3}
     display={{ xs: 'block', md: 'flex' }}
     alignItems="center"
     textAlign={{ xs: 'center', md: 'left' }}
     justifyContent="space-between"
    >
     <Box>
      <Typography variant="subtitle1">
       &copy; 2022 - Gestión de Biblioteca
      </Typography>
     </Box>
     <Typography sx={{ pt: { xs: 2, md: 0 } }} variant="subtitle1">
      Desarrollado con <FavoriteBorderIcon fontSize='small' />
     </Typography>
    </Box>
   </Container>
  </FooterWrapper>
 );
};

export default FooterPage;
