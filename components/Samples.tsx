import { Center, Text } from "@chakra-ui/react";
import useTranlate from "../hooks/useTranslate";
import Title from "./Title";

const Samples = () => {
  const t = useTranlate();
  return (
    <>
      <Center>
        <Title>{t.sample}</Title>
      </Center>
      <Center>
        <Text my={"3"} color={"gray.500"}>
          {t.sampleDesc}
        </Text>
      </Center>
    </>
  );
};

export default Samples;
