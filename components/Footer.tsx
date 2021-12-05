import { Box, Text, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="12"
      px={{ base: "4", md: "8" }}
    >
      <Flex
        justifyContent="space-between"
        flexDirection={{ md: "row", base: "column" }}
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Eye Bigger All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
