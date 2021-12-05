import {
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import useTranslate from "../hooks/useTranslate";
import CommonButton from "./CommonButton";
import useMove from "../hooks/useMove";

export default function Hero() {
  const t = useTranslate();
  const { move } = useMove("start");

  return (
    <Stack
      direction={{ base: "column-reverse", md: "row" }}
      bgColor={"pink.900"}
    >
      <Flex p={{ base: 4, md: 8 }} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text as={"span"} color={"white"}>
              {t.title}
            </Text>
            <br />
            <Text
              color={"white"}
              as={"span"}
              fontSize={{ base: "xl", md: "2xl" }}
            >
              {t.subTitle}
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"pink.100"}>
            {t.description}
          </Text>
          <Stack direction={{ base: "column", md: "row" }}>
            <CommonButton onClick={move}> {t.start}</CommonButton>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Image"} objectFit={"cover"} src={"/images/eyes.gif"} />
      </Flex>
    </Stack>
  );
}
