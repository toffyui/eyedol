import {
  Center,
  Icon,
  VisuallyHidden,
  Grid,
  Box,
  Image,
  Flex,
  Text,
  RadioGroup,
  Stack,
  Spinner,
  Radio,
} from "@chakra-ui/react";
import Title from "../components/Title";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CommonButton from "../components/CommonButton";
import ShareModal from "../components/ShareModal";
import { FiUploadCloud } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaCloudDownloadAlt } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import { IconContext } from "react-icons";
import useTranlate from "../hooks/useTranslate";
import { useRef, useState } from "react";
import resizeImage from "../libs/resizeImage";
import axios from "axios";
import { useRouter } from "next/router";
import useModal from "../hooks/useModal";
import Head from "next/head";
import Samples from "../components/Samples";

export default function Home() {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const t = useTranlate();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [base64, setBase64] = useState<string>();
  const { locale } = useRouter();
  const [changedImage, setChangedImage] = useState<string>();
  const [magni, setMagni] = useState<number>(1.4);
  const [isShareLoading, setIsShareLoading] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string>();
  const [shareUrl, setShareUrl] = useState<string>();
  const { openModal, closeModal, isOpenModal, openModalType } = useModal();
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

  // uuid の発行
  const generateUuid = () => {
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case "x":
          chars[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case "y":
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
      }
    }
    return chars.join("");
  };

  const openModalHandler = async (shareType: "TWITTER" | "FACEBOOK") => {
    openModal(shareType);
    setIsShareLoading(true);
    const uuid = generateUuid();
    await axios.post(
      `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}/postogpimg`,
      JSON.stringify({
        uuid: uuid,
        ogpimg: changedImage,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUuid(uuid);
    window.history.pushState(null, null, `/${locale}/share/${uuid}`);
    setShareUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/share/${uuid}`);
    setIsShareLoading(false);
  };

  const closeModalHandler = () => {
    window.history.pushState(null, null, `/${locale}`);
    closeModal();
  };

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta name="description" content={t.description} />
        <meta property="og:title" content={t.title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={t.description} />
        <meta property="og:site_name" content={t.title} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon.jpg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon.jpg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon.jpg"
        />
        <meta name="twitter:site" content="@yui_active" />
        <meta name="twitter:creator" content="@yui_active" />
        <meta
          property="og:image"
          key="ogImage"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/OGP.jpg`}
        />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          key="twitterImage"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/OGP.jpg`}
        />
      </Head>
      <Hero />
      <Samples />
      <Center>
        <Title id={"start"}>{t.try}</Title>
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
            {!changedImage && (
              <Text my={"3"} color={"gray.500"}>
                {t.changeImageFirst}
              </Text>
            )}
            {changedImage && (
              <Grid
                mt={4}
                templateColumns="repeat(3, 1fr)"
                w={{ base: "100%", md: "80%", lg: "60%" }}
              >
                <Flex flexDirection="column" alignItems="center">
                  <Center
                    bgColor="#385897"
                    color="white"
                    boxSize="50px"
                    cursor="pointer"
                    borderRadius="full"
                    onClick={() => openModalHandler("FACEBOOK")}
                  >
                    <IconContext.Provider value={{ size: "30px" }}>
                      <FaFacebookF />
                    </IconContext.Provider>
                  </Center>
                  <Text size="base" color="gray.700">
                    facebook
                  </Text>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                  <Center
                    bgColor="#1DA1F1"
                    color="white"
                    cursor="pointer"
                    boxSize="50px"
                    borderRadius="full"
                    onClick={() => openModalHandler("TWITTER")}
                  >
                    <IconContext.Provider value={{ size: "30px" }}>
                      <FaTwitter />
                    </IconContext.Provider>
                  </Center>
                  <Text size="base" color="gray.700">
                    twitter
                  </Text>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                  <Center
                    bgColor="tomato"
                    color="white"
                    cursor="pointer"
                    boxSize="50px"
                    borderRadius="full"
                    as="a"
                    download={`${new Date().getTime()}.png`}
                    href={changedImage}
                  >
                    <IconContext.Provider value={{ size: "30px" }}>
                      <FaCloudDownloadAlt />
                    </IconContext.Provider>
                  </Center>
                  <Text size="base" color="gray.700">
                    download
                  </Text>
                </Flex>
              </Grid>
            )}
          </Box>
        </Box>
        <Center w={{ base: "100%", md: "50%" }} position="relative" px={5}>
          <Image
            w="100%"
            src={
              changedImage
                ? changedImage
                : image
                ? image
                : "/images/default.png"
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
      {isOpenModal && (
        <ShareModal
          shareUrl={shareUrl}
          uuid={uuid}
          isOpenModal={isOpenModal}
          onClose={closeModalHandler}
          modalType={openModalType}
          isLoading={isShareLoading}
        />
      )}
      <Footer />
    </>
  );
}
