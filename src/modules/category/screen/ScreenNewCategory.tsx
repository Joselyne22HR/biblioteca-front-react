import { Card, CardHeader, Container, Divider, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import FormCategory from '../components/FormCategory';

const ScreenNewCategory = () => {
 return (
  <>
   <Helmet>
    <title>Nueva categoria</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Categoria'}
     subtitle={'Aquí podrás crear una nueva categoria.'}
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
       <CardHeader title="Crear nueva categoria" />
       <Divider />
       <FormCategory />
      </Card>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />
  </>
 );
};

export default ScreenNewCategory;
