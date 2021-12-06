import { Center, Text, Box, Image } from "@chakra-ui/react";
import useTranlate from "../hooks/useTranslate";
import Title from "./Title";
import Slick, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Samples = () => {
  const t = useTranlate();
  const samples = [1, 2, 3, 4, 5];
  const settings: Settings = {
    centerPadding: "60px",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    lazyLoad: true,
    autoplay: true,
    speed: 300,
    cssEase: "ease-out",
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };
  return (
    <Box px={5} mb={5}>
      <Center>
        <Title>{t.sample}</Title>
      </Center>
      <Center>
        <Text my={"3"} color={"gray.500"}>
          {t.sampleDesc}
        </Text>
      </Center>
      <Box maxW={"5xl"} w={"100%"} mx={"auto"} py={{ base: 1, md: 3 }}>
        <Slick {...settings}>
          {samples.map((s, index) => (
            <Box key={index}>
              <Image
                src={`/samples/${s}.png`}
                alt={`${s}.png`}
                borderRadius={"xl"}
                px={"5px"}
                boxShadow="md"
              />
            </Box>
          ))}
        </Slick>
      </Box>
    </Box>
  );
};

export default Samples;
