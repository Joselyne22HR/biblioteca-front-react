import { Card, CardHeader, Container, Divider, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import FormEditorial from '../components/FormEditorial';

const ScreenNewEditorial = () => {
 return (
  <>
   <Helmet>
    <title>Nueva editorial</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Editorial'}
     subtitle={'Aquí podrás crear una nueva editorial.'}
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
       <CardHeader title="Crear nuevo editorial" />
       <Divider />
       <FormEditorial />
      </Card>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />
  </>
 );
};

export default ScreenNewEditorial;
