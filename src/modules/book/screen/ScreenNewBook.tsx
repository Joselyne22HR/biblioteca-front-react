import { Card, CardHeader, Container, Divider, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import FormBook from '../components/FormBook';

const ScreenNewBook = () => {
 return (
  <>
   <Helmet>
    <title>Nuevo libro</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Libro'}
     subtitle={'Aquí podrás crear una nuevo libro.'}
    />
   </PageTitleWrapper>
   <Container maxWidth="lg">
    <Grid
     container
     direction="row"
     justifyContent="center"
     alignItems="stretch"
     spacing={3}
    >
     <Grid item xs={12}>
      <Card>
       <CardHeader title="Crear nuevo libro" />
       <Divider />
       <FormBook />
      </Card>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />
  </>
 );
};

export default ScreenNewBook;
