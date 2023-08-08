
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';


export const ContactFormEmail = ({ info }) => {

  // const formInfo = {
  //   firstName: form.firstName.value,
  //   lastName: form.lastName.value,
  //   email: form.email.value,
  //   phone: form.phone.value,
  //   messageToHost: form.messageToHost.value,
  // };

  return (
    <Html lang="en">
    <Head />
    <Preview>{"previewText"}</Preview>

    <Body style={main}>
      <Section style={main}>
        <Container style={container}>
          <Section>
          <Text style={{ ...paragraph, fontWeight: '700', paddingBottom: '16px' }}>
          {"Τ'αδελφια"}
              </Text>
      
          </Section>
          <Section>
            <Img
              src={`https://tadelfia.webframe.one/_next/image?url=%2Flogo.webp&w=640&q=75`}
              width="200"
              height="200"
              alt={"Checkmark"}
              style={userImage}
            />
          </Section>
          <Section style={{ paddingBottom: '20px' }}>
            <Row>
              <Text style={heading}>Here’s what {info.firstName+ " "+ info.lastName} wrote</Text>
              <Text style={review}>{info.messageToHost}</Text>

              <Text style={{ ...paragraph, paddingBottom: '16px' }}>
                This message was sent to you by {info.firstName+ " "+ info.lastName} using Tadelfia’s contact form.
              </Text>

              <Text style={{ ...paragraph, fontWeight: '700' }}>
                Contact details:
              </Text>

              <Text style={paragraph}>
              <b>Full Name: </b>
              {info.firstName+ " "+ info.lastName} 
              </Text>
              
              <Text style={paragraph}>
                <b>Email: </b>
                {info.email}
              </Text>
              <Text style={paragraph}>
                <b>Phone: </b>
                {info.phone}
              </Text>
              <Text style={paragraph}>
                <b>Arrival: </b>
                {new Date (info.arrivalDate).toLocaleDateString()}
              </Text>
              <Text style={{ ...paragraph, paddingBottom: '16px' }}>
                <b>Departure: </b>
                {new Date (info.departureDate).toLocaleDateString()}
              </Text>


              <Button pY={19} style={button} href="https://tadelfia.webframe.one/dashboard/bookings">
                Review all bookings
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Row>
              <Text style={{ ...paragraph, fontWeight: '700' }}>
                Useful links
              </Text>
              <Text>
                <Link href="https://tadelfia.webframe.one/" style={link}>
                  Home Page
                </Link>
              </Text>
              <Text>
                <Link href="https://tadelfia.webframe.one/villas" style={link}>
                  Overview of Apartments
                </Link>
              </Text>
              <Text>
                <Link href="https://tadelfia.webframe.one/contact" style={link}>
                  Contact Page
                </Link>
              </Text>
              <Hr style={hr} />
              <Text style={footer}>
                Powered by Webframe.one - The easiest way to build web applications
              </Text>
              <Link href="https://webframe.one" style={reportLink}>
                visit webframe.one
              </Link>
            </Row>
          </Section>
        </Container>
      </Section>
    </Body>
  </Html>
  );
};


const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const userImage = {
  margin: '0 auto',
  marginBottom: '16px',
  borderRadius: '50%',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
};

const review = {
  ...paragraph,
  padding: '24px',
  whiteSpace: 'pre-wrap',
  backgroundColor: '#e2e0e0',
  borderRadius: '4px',
};

const button = {
  backgroundColor: '#89966c',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '100%',
};

const link = {
  ...paragraph,
  color: '#89966c',
  display: 'block',
};

const reportLink = {
  fontSize: '14px',
  color: '#9ca299',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginBottom: '10px',
};