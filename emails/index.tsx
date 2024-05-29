import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface DropboxResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

// const baseUrl = process.env.NEXTAUTH_URL
//   ? `https://${process.env.NEXTAUTH_URL}`
//   : "";
  const baseUrl = "http://res.cloudinary.com/dsytnzksz/image/upload/v1714764049/bpmhemefrxqorzmxgqgk.png";

export const DropboxResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Dropbox reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={baseUrl}
            width="250"
            height="100"
            alt="Course Programming"
          />
          <Section>
            <Text style={text}>Hola {userFirstname},</Text>
            <Text style={text}>
              Alguien solicitó recientemente un cambio de contraseña para tu
              cuenta en Course Programming. Si eres tú, puedes establecer una
              nueva contraseña aquí:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Cambiar contraseña
            </Button>
            <Text style={text}>
              Si no desea cambiar su contraseña o no lo hizo,
              simplemente ignore y elimine este mensaje.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

DropboxResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
} as DropboxResetPasswordEmailProps;

export default DropboxResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#099DF1",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
