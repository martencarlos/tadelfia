
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


export const BookingSuccessEmail = ({ booking }) => {

  // booking.contact
  // booking.address
  // booking.accomodation
  
  // booking.payment = {
  //   id: 
  //   amount
  //   currency
  // };

  return (
    <Html lang="en">
    <Head />
    <Preview>{"Τ'αδελφια - Booking confirmed!"}</Preview>

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
              src={`	https://tadelfia.webframe.one/_next/image?url=%2Fbooking%2Fsuccess%2Fcheckmark.webp&w=256&q=75`}
              width="150"
              height="150"
              alt={"Checkmark"}
              style={userImage}
            />
          </Section>
          <Section style={{ paddingBottom: '20px' }}>
            <Row>
              <Text style={heading}>Booking confirmed ! </Text>
              
              <br />
              <br />
              <Text style={{ ...paragraph, textDecoration:"underline" , fontWeight: '700' }}>
                Booking details:
              </Text>
              <Text style={paragraph}>
              <b>Booking Reference nº </b>
              {/*"# " + booking.payment.id.slice(-6)*/}
              {"# "+booking.id}
              </Text>
              <Text style={paragraph}>
              <b>Apartment: </b>
              {booking.accomodation.villa} 
              </Text>

              <Text style={paragraph}>
              <b>Check-in: </b>
              {new Date(booking.accomodation.checkin).toLocaleDateString()} 
              </Text>
              <Text style={paragraph}>
              <b>Check-out: </b>
              {new Date(booking.accomodation.checkout).toLocaleDateString()}
              </Text>
              <Text style={paragraph}>
              <b>Nights: </b>
              {booking.accomodation.nights}
              </Text>
              <Text style={paragraph}>
              <b>Guests: </b>
              {booking.accomodation.guests+ " guests"}
              </Text>
              <Text style={paragraph}>
              <b>Adult(s): </b>
              {booking.accomodation.adults+ " adults"}
              </Text>
              <Text style={paragraph}>
              <b>Children: </b>
              {booking.accomodation.children+ " children"}
              </Text>
              <Text style={paragraph}>
              <b>Amount </b>
              {booking.payment.amount + " €"}
              </Text>


              <Text style={paragraph}>
              <b>Full Name: </b>
              {booking.contact.firstName + " "+ booking.contact.lastName} 
              </Text>
              <Text style={paragraph}>
              <b>Email: </b>
              {booking.contact.email}
              </Text>
              <Text style={{ ...paragraph, paddingBottom: '16px' }}>
                <b>Phone: </b>
                {booking.contact.phone}
              </Text>

              <Button pY={19} style={button} href="https://tadelfia.webframe.one/contact">
                Have a question? Contact us 
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
  textAlign: 'center',
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
  backgroundColor: '#f2f3f3',
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