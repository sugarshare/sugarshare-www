import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import {
  faShieldHalved, faEyeSlash, faTruckFast, faWindowRestore, faCalendarDays, faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Landing from './components/Landing';
import GridList from './components/GridList';
import InstallTile from './components/InstallTile';
import PropertyTile from './components/PropertyTile';
import settings from './settings';

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
          <GridList list={[
            <PropertyTile
              icon={faTruckFast}
              primaryText='Fast'
              secondaryText='We use state-of-the-art content delivery technology to allow for quick upload and download.'
            />,
            <PropertyTile
              icon={faShieldHalved}
              primaryText='Secure TLS 1.2'
              secondaryText='Files are securely transmitted over TLS encryption.'
            />,
            <PropertyTile
              icon={faWindowRestore}
              primaryText='Cross-platform'
              secondaryText='Available in all major browsers and operating systems.'
            />,
            <PropertyTile
              icon={faEyeSlash}
              primaryText='Encrypted storage'
              secondaryText='Nobody other than you and your collaborators can see the files you are sharing through the link you receive.'
            />,
            <PropertyTile
              icon={faCalendarDays}
              primaryText='Customized availability'
              secondaryText='You can set how long files are available &mdash; one day, one week, one month, ...forever.'
            />,
            <PropertyTile
              icon={faHandHoldingDollar}
              primaryText='Supportive subscription'
              secondaryText='A low-price, hassle-free monthly subscription that helps us cover our running costs and develop even more awesome features.'
            />,
          ]}
          />
        </Box>

        <Box sx={{ my: 10 }}>
          <Typography variant='h2' fontWeight='bold' sx={{ my: 10 }}>Download</Typography>
          <GridList list={[
            <InstallTile link='/' browser='Chrome' />,
            <InstallTile link='/' browser='Firefox' isSoon />,
            <InstallTile link='/' browser='Microsoft Edge' isSoon />,
            <InstallTile link='/' browser='Opera' isSoon />,
          ]}
          />
        </Box>

        <Box id='contact' sx={{ my: 10 }}>
          <Typography variant='h3' fontWeight='bold' sx={{ my: 4 }}>Contact</Typography>
          <Typography variant='body1'>Ask us questions, give us feedback, report an issue, or simply say hello.</Typography>
          <Link href={`mailto:${settings.defaultEmailAddress}?body=Hello!`} target='_blank'>
            {settings.defaultEmailAddress}
          </Link>
        </Box>
      </Container>
      <Footer />
    </Container>
  );
}
