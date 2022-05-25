import { Card, CardHeader, Container, Divider, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import FormCategory from '../components/FormCategory';

const ScreenEditCategory = () => {
 return (
  <>
   <Helmet>
    <title>Editar editorial</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Categoria'}
     subtitle={'Aquí podrás editar los datos de la categoria.'}
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
       <CardHeader title="Editar categoria" />
       <Divider />
       <FormCategory edit/>
      </Card>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />
  </>
 );
};

export default ScreenEditCategory;
