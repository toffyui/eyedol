import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
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
      <Flex
        px={{ base: 4, md: 10 }}
        pt={{ base: 0, md: 10, lg: 14 }}
        pb={{ base: 6, md: 10, lg: 14 }}
        flex={1}
        align={"center"}
        justify={"center"}
      >
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
            <br />
            {t.description2}
          </Text>
          <Stack direction={{ base: "column", md: "row" }}>
            <CommonButton onClick={move}> {t.start}</CommonButton>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Image"}
          objectFit={"contain"}
          src={"/images/eyes.gif"}
          w={{ base: "100%", md: "80%" }}
        />
      </Flex>
    </Stack>
  );
}
