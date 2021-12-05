import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {
  leftIcon?: React.ReactElement;
  onClick?: () => void;
  full?: boolean;
};

const CommonButton: React.FC<Props> = ({
  children,
  leftIcon,
  onClick,
  full,
}) => {
  return (
    <Button
      leftIcon={leftIcon}
      onClick={onClick}
      rounded={"full"}
      boxShadow="xl"
      size={"lg"}
      width={full ? "full" : "auto"}
      fontWeight={"normal"}
      px={6}
      colorScheme={"teal.800"}
      bg={"teal.800"}
      _hover={{ opacity: 0.8 }}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
