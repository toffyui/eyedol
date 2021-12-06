import { Stack, Text, Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
};

export default function Title({ children, id }: Props) {
  return (
    <Box w="full" textAlign={"center"} id={id ? id : ""}>
      <Stack display={"inline-block"} mt={{ base: 3, lg: 10 }}>
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight={500}
          as={"h3"}
          position={"relative"}
          zIndex={1}
          _after={{
            content: "''",
            width: "full",
            height: "20%",
            position: "absolute",
            bottom: 2,
            left: 0,
            bg: "pink.900",
            opacity: 0.5,
            zIndex: -1,
          }}
        >
          {children}
        </Text>
      </Stack>
    </Box>
  );
}
