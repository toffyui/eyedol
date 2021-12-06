import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useTranlate from "../../hooks/useTranslate";

type Props = {
  uuid: string;
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  if (typeof context.params?.uuid === "string") {
    return {
      props: {
        uuid: context.params?.uuid,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

const SharePage = ({ uuid }: Props) => {
  const router = useRouter();
  const t = useTranlate();
  const { locale } = useRouter();
  useEffect(() => {
    router.push(`/${locale}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          content={`${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/ogpimg/${uuid}.jpg`}
        />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          key="twitterImage"
          content={`${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/ogpimg/${uuid}.jpg`}
        />
      </Head>
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="tomato"
          size="xl"
        />
      </Flex>
    </>
  );
};

export default SharePage;
