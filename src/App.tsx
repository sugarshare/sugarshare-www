import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import {
  faShieldHalved, faGlobe, faEyeSlash, faTruckFast, faWindowRestore, faCalendarDays, faHandHoldingDollar, faTree,
} from '@fortawesome/free-solid-svg-icons';

import settings from './settings';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Landing from './components/Landing';
import GridList from './components/GridList';
import InstallTile from './components/InstallTile';
import PropertyTile from './components/PropertyTile';
import Subscription, { SubscriptionLevel } from './components/Subscription';


export default function App() {
  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Navigation />
        <Landing />
        <Container maxWidth='lg'>

          <Box id='intro' sx={{ marginY: 10 }}>
            <Typography variant='h4' fontWeight='bold' sx={{ marginBottom: 10 }}>
              Create shareable links valid for 24 hours or more to transfer files privately and securely
              with your collaborators and friends.
            </Typography>
          </Box>

          <Box id='benefits' sx={{ marginY: 20 }}>
            <GridList list={[
              <PropertyTile
                icon={faTruckFast}
                primaryText='Fast'
                secondaryText='We use top notch content delivery technology for fast uploads and downloads worldwide.'
              />,
              <PropertyTile
                icon={faGlobe}
                primaryText='Send anywhere'
                secondaryText='You get a link that you can share with anybody you want, wherever they are.'
              />,
              <PropertyTile
                icon={faCalendarDays}
                primaryText='Customize expiry'
                secondaryText='You can set how long files are available &mdash; one day, one week, one month, ...forever.'
              />,
              <PropertyTile
                icon={faEyeSlash}
                primaryText='Encrypted storage'
                secondaryText='Nobody other than you and your collaborators can see the files you are sharing.'
              />,
              <PropertyTile
                icon={faShieldHalved}
                primaryText='Secure TLS'
                secondaryText='Files are securely transmitted with TLS encryption.'
              />,
              <PropertyTile
                icon={faWindowRestore}
                primaryText='Cross-platform'
                secondaryText='Available in all major browsers and operating systems.'
              />,
              <PropertyTile
                icon={faHandHoldingDollar}
                primaryText='Supportive subscription'
                secondaryText='A low-price, hassle-free monthly (or yearly!) subscription that helps us cover our running costs and develop even more awesome features.'
              />,
              <PropertyTile
                icon={faTree}
                primaryText='1% revenue towards carbon removal'
                secondaryText='We contribute 1% of our total revenues to remove CO2 from the atmosphere.'
              />,
            ]}
            />
          </Box>
        </Container>
      </Container>

      <Container id='pricing' maxWidth={false} disableGutters sx={{ backgroundColor: 'text.primary', minHeight: '100vh', paddingY: 10 }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' fontWeight='bold' sx={{ marginY: 4, color: 'white' }}>Pricing</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              flexWrap: 'no-wrap',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Subscription
              level={SubscriptionLevel.FREE}
              benefits={[
                'Send 2 GB per file',
                'Set expiry up to 7 days',
                'Encrypted storage',
                'Fast global network',
              ]}
            />
            <Subscription
              level={SubscriptionLevel.STANDARD}
              price='6$ / month'
              priceId='price_xxx'
              benefits={[
                'Send 15 GB per file',
                'Set expiry up to 30 days',
              ]}
            />
            <Subscription
              level={SubscriptionLevel.PREMIUM}
              price='11$ / month'
              priceId='price_xxx'
              benefits={[
                'Lorem ipsum',
                'Lorem ipsum',
                'Lorem ipsum',
              ]}
            />
          </Box>
        </Container>
      </Container>

      <Container id='products' maxWidth={false} disableGutters sx={{ paddingY: 10 }}>
        <Container maxWidth='lg'>
          <Box sx={{ marginY: 10 }}>
            <Typography variant='h3' fontWeight='bold' sx={{ marginY: 4 }}>Get it</Typography>
            <GridList list={[
              <InstallTile link='/' browser='Chrome' />,
              <InstallTile link='/' browser='Firefox' isSoon />,
              <InstallTile link='/' browser='Microsoft Edge' isSoon />,
              <InstallTile link='/' browser='Opera' isSoon />,
            ]}
            />
          </Box>
        </Container>
      </Container>

      <Container id='about' maxWidth={false} disableGutters sx={{ paddingTop: 10 }}>
        <Container maxWidth='lg'>
          <Box>
            <Typography variant='h3' fontWeight='bold' sx={{ marginBottom: 10 }}>At SugarShare we believe that...</Typography>
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

          <Box id='contact' sx={{ marginY: 10 }}>
            <Typography variant='h3' fontWeight='bold' sx={{ marginY: 4 }}>Contact</Typography>
            <Typography variant='body1'>Ask us questions, give us feedback, report an issue, or simply say hello.</Typography>
            <Link href={`mailto:${settings.defaultEmailAddress}?body=Hello!`} target='_blank' color='inherit'>
              {settings.defaultEmailAddress}
            </Link>
          </Box>
        </Container>
        <Footer />
      </Container>
    </>
  );
}
