import {
  Center,
  Icon,
  VisuallyHidden,
  Grid,
  Box,
  Image,
  Flex,
  Text,
  Container,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  RadioGroup,
  Stack,
  Spinner,
  Radio,
} from "@chakra-ui/react";
import Tite from "../components/Title";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CommonButton from "../components/CommonButton";
import { FiUploadCloud, FiDownloadCloud } from "react-icons/fi";
import { FaRegMehRollingEyes } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import useMove from "../hooks/useMove";
import useTranlate from "../hooks/useTranslate";
import { useRef, useState } from "react";
import resizeImage from "../libs/resizeImage";
import axios from "axios";

export default function Home() {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const t = useTranlate();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [base64, setBase64] = useState<string>();
  const [chagedImage, setChangedImage] = useState<string>();
  const [magni, setMagni] = useState<number>(1.4);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
    let imgToBase64 = await resizeImage(imageFile, 1000, 1000);
    imgToBase64 = imgToBase64.replace(/^data:image\/[a-z]+;base64,/, "");
    setBase64(imgToBase64);
  };
  const uploadImage = () => {
    inputImageRef.current.click();
  };

  const changeImage = async () => {
    setIsLoad(true);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT,
      JSON.stringify({
        myimg: base64,
        magni: magni,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsLoad(false);
    setChangedImage(`data:image/png;base64,${response.data.img}`);
  };

  return (
    <>
      <Hero />
      <Center>
        <Tite id={"start"}>{t.selectPhoto}</Tite>
      </Center>
      <Flex
        mt={10}
        maxW={"5xl"}
        mx={"auto"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "50%" }} px={5}>
          <Box>
            <Text fontSize={{ base: "2xl", lg: "3xl" }}>
              {t.selectPhotoFromLibrary}
            </Text>
            <Text my={"3"} color={"gray.500"}>
              {t.note}
            </Text>
            <CommonButton
              leftIcon={<Icon as={FiUploadCloud} />}
              onClick={uploadImage}
            >
              {t.uploadPicture}
              <VisuallyHidden>
                <input
                  name="picture"
                  type="file"
                  ref={inputImageRef}
                  multiple
                  accept="image/jpeg, image/png"
                  onChange={(e) => handleFile(e)}
                />
              </VisuallyHidden>
            </CommonButton>
          </Box>
          <Box mt={5}>
            <Text fontSize={{ base: "2xl", lg: "3xl" }}>{t.changeMagni}</Text>
            {!image && (
              <Text my={"3"} color={"gray.500"}>
                {t.selectPhotoFirst}
              </Text>
            )}
            {image && (
              <>
                <RadioGroup
                  onChange={(e) => setMagni(Number(e))}
                  value={magni}
                  colorScheme="purple"
                  my={5}
                >
                  <Stack direction="column">
                    <Radio value={1.2}>{t.first}</Radio>
                    <Radio value={1.4}>{t.second}</Radio>
                    <Radio value={1.6}>{t.third}</Radio>
                    <Radio value={1.8}>{t.forth}</Radio>
                    <Radio value={2}>{t.fifth}</Radio>
                  </Stack>
                </RadioGroup>
                <CommonButton
                  leftIcon={<Icon as={MdOutlineChangeCircle} />}
                  onClick={changeImage}
                >
                  {t.changeImage}
                </CommonButton>
              </>
            )}
          </Box>
          <Box mt={5}>
            <Text fontSize={{ base: "2xl", lg: "3xl" }}>{t.saveAndShare}</Text>
            {/* <Text my={"3"} color={"gray.500"}>
              先に作って
            </Text> */}
            {/* <CommonButton
              leftIcon={<Icon as={FiUploadCloud} />}
              onClick={uploadImage}
            >
            　{t.save}
            </CommonButton> */}
          </Box>
        </Box>
        <Center w={{ base: "100%", md: "50%" }} position="relative" px={5}>
          <Image
            w="100%"
            src={
              chagedImage ? chagedImage : image ? image : "/images/default.png"
            }
            alt={"default"}
            opacity={isLoad ? 0.5 : 1}
          />
          {isLoad && (
            <Spinner
              position="absolute"
              thickness="8px"
              speed="0.65s"
              emptyColor="pink.100"
              color="pink.800"
              size="xl"
            />
          )}
        </Center>
      </Flex>
      <Footer />
    </>
  );
}
