import { Box, Text, Flex, Image } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      pt="20"
      pb="12"
      px={{ base: "4", md: "8" }}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ md: "row", base: "column" }}
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Eye Bigger All rights reserved.
        </Text>
        <a href="https://www.buymeacoffee.com/yuikoito" target="_blank">
          <Image
            src={"/images/buyMeACoffee.svg"}
            alt={"buy"}
            borderRadius={"xl"}
            h={"60px"}
            cursor="pointer"
          />
        </a>
      </Flex>
    </Box>
  );
};

export default Footer;
