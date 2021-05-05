import React, { useEffect, useReducer } from "react";
import {
  Image,
  Text,
  Icon,
  Button,
  Heading,
  Flex,
  Box,
  VStack,
} from "@chakra-ui/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { HiCursorClick } from "react-icons/hi";
import { CgGift } from "react-icons/cg";
import { motion, useAnimation } from "framer-motion";
import cloneDeep from "lodash/cloneDeep";

import carouselImg from "./images/carouselImage.jpg";

// * remove in futures
const imgs = new Array(3).fill(carouselImg);
const content = new Array(3).fill("nothing").map((val, idx) => {
  return {
    title: `Lorem Ipsum${idx + 1}`,
    descr:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque magna orci, blandit sed urna a, commodo posuere odio. Phasellus quis rhoncus massa. Nullam venenatis dui at tempus feugiat. Etiam ut felis tortor. Cras in sem elit. Donec rhoncus nunc orci. Mauris pretium eget purus quis commodo. Sed fermentum, turpis a. ",
  };
});
//

type Reducer<S, A> = (prevState: S, action: A) => S;
type State = { position: number; slidesLength: number };
type Action = { type: "nextSlide" | "prevSlide" };

const reducer: Reducer<State, Action> = (prevState, action) => {
  const newState = cloneDeep(prevState);
  switch (action.type) {
    case "nextSlide":
      newState.position =
        prevState.position === prevState.slidesLength
          ? 1
          : prevState.position + 1;
      break;
    case "prevSlide":
      newState.position =
        prevState.position === 1
          ? prevState.slidesLength
          : prevState.position - 1;
      break;
    default:
      throw new Error("unknown action type");
  }
  return newState;
};

interface ICarouselProps {}

const Carousel: React.FunctionComponent<ICarouselProps> = (props) => {
  const initState: State = {
    position: 1,
    slidesLength: content.length,
  };
  const [state, dispatch] = useReducer(reducer, initState);


  return (
    <Flex justify="space-between" bg="white" rounded="0 .375rem 0 0">
      <Box w="70%">
        {imgs.map((img, idx) => {
          return (
            <Image
              src={img}
              key={idx}
              as={motion.img}
              animate={idx + 1 === state.position ? "visible" : "hidden"}
              variants={variants}
            />
          );
        })}
      </Box>
      <Box
        w="30%"
        d="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex justify="space-between" px="3" pt="3">
          <Button
            variant="link"
            leftIcon={<Icon as={BsArrowLeft} />}
            onClick={() => dispatch({ type: "prevSlide" })}
          >
            Пред. слайд
          </Button>
          <Button
            variant="link"
            rightIcon={<Icon as={BsArrowRight} />}
            onClick={() => dispatch({ type: "nextSlide" })}
          >
            След. слайд
          </Button>
        </Flex>
        {content.map(({ title, descr }, idx) => {


          return (
            <VStack
              key={idx}
              textAlign="center"
              px="4"
      
            >
              <Heading as="h3" d="block" size="md">
                {title}
              </Heading>
              <Text>{descr}</Text>
            </VStack>
          );
        })}
        <Box>
          <Button
            w="full"
            bg="red"
            rightIcon={<Icon as={HiCursorClick} />}
            rounded="0"
            color="white"
          >
            Перейти в каталог
          </Button>
          <Button
            w="full"
            bg="black"
            rightIcon={<Icon as={CgGift} />}
            borderRadius="0 0 0.375rem 0"
            color="white"
          >
            Подробнее об акции
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Carousel;
