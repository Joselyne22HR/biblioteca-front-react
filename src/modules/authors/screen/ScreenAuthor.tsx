import {
 Card,
 CardHeader,
 Container,
 Divider,
 Grid
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import FormAuthor from '../components/FormAuthor';

const ScreenAuthor = () => {

 return (
  <>
   <Helmet>
    <title>Nuevo autor</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Autor'}
     subtitle={'Aquí podrás crear un nuevo autor.'}
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
       <CardHeader title="Crear nuevo autor" />
       <Divider />
       <FormAuthor />
      </Card>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />
  </>
 );
};

export default ScreenAuthor;
