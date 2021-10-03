import React from 'react';
import { Container, Box } from '@chakra-ui/react';

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Container centerContent>
      <Box width="100%" padding="4">
        {children}
      </Box>
    </Container>
  );
}

export default Layout;
