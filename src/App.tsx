import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import {
  faShieldHalved, faEyeSlash, faTruckFast, faWindowRestore, faCalendarDays, faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Landing from './components/Landing';
import InstallLink from './components/InstallLink';
import PropertyTile from './components/PropertyTile';

export default function App() {
  return (
    <Container maxWidth={false} disableGutters>
      <Navigation />
      <Landing />
      <Container maxWidth='lg'>

        <Box sx={{ my: 10 }}>
          <Typography variant='h3' fontWeight='bold' sx={{ my: 10 }}>At SugarShare we believe that...</Typography>
          <Typography variant='h4' component='span'>
            Sharing files should be sweet and simple &mdash; as simple as uploading files to a secure location and
            sending it over to anybody you want.
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant='h5' component='span'>
            With SugarShare you can upload your files to a secure and temporary location in the cloud, and get a
            link in return which you can share with anybody. The files stay in their location for a chosen duration
            (e.g. 24 hours) before expiring, and can only be accessed via the provided link &mdash; i.e. by you
            and your collaborators.
          </Typography>
        </Box>

        <Box sx={{ my: 10 }}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs='auto'>
              <PropertyTile
                icon={faTruckFast}
                primaryText='Fast'
                secondaryText='We use state-of-the-art content delivery technology to allow for quick upload and download.'
              />
            </Grid>
            <Grid item xs='auto'>
              <PropertyTile
                icon={faShieldHalved}
                primaryText='Secure TLS 1.2'
                secondaryText='Files are securely transmitted over TLS encryption.'
              />
            </Grid>
            <Grid item xs='auto'>
              <PropertyTile
                icon={faWindowRestore}
                primaryText='Cross-platform'
                secondaryText='Available in all major browsers and operating systems.'
              />
            </Grid>
            <Grid item xs='auto'>
              <PropertyTile
                icon={faEyeSlash}
                primaryText='Encrypted storage'
                secondaryText='Nobody other than you and your collaborators can see the files you are sharing through the link you receive.'
              />
            </Grid>
            <Grid item xs='auto'>
              <PropertyTile
                icon={faCalendarDays}
                primaryText='Customized availability'
                secondaryText='You can set how long files are available &mdash; one day, one week, one month, ...forever.'
              />
            </Grid>
            <Grid item xs='auto'>
              <PropertyTile
                icon={faHandHoldingDollar}
                primaryText='Supportive subscription'
                secondaryText='A low-price, hassle-free monthly subscription that helps us cover our running costs and develop even more awesome features.'
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 10 }}>
          <Typography variant='h2' fontWeight='bold' sx={{ my: 10 }}>Download</Typography>
          <Grid container spacing={2} sx={{ my: 4 }}>
            <Grid item xs='auto'>
              <InstallLink link='/' browser='Chrome' />
            </Grid>
            <Grid item xs='auto'>
              <InstallLink link='/' browser='Firefox' isSoon />
            </Grid>
            <Grid item xs='auto'>
              <InstallLink link='/' browser='Microsoft Edge' isSoon />
            </Grid>
            <Grid item xs='auto'>
              <InstallLink link='/' browser='Opera' isSoon />
            </Grid>
          </Grid>
        </Box>

      </Container>
      <Footer />
    </Container>
  );
}
