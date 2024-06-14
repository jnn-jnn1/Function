import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../component/LoginProvider.jsx";
import { useNavigate } from "react-router-dom";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LikeList() {
  const [likeProductList, setLikeProductList] = useState(null);
  const [pageInfo, setPageInfo] = useState({});
  const [likes, setLikes] = useState({});
  const account = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/products/user/${account.id}/like`).then((res) => {
      setLikeProductList(res.data);
    });
  }, []);

  if (likeProductList === null) {
    return <Spinner />;
  }

  function handleLikeClick(id) {}

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {likeProductList.map((product) => (
          <GridItem key={product.id}>
            <Card maxW="sm" h="100%">
              <CardBody position="relative" h="100%">
                <Box mt={2} w="100%">
                  {product.status ? (
                    <>
                      {product.productFileList && (
                        <Image
                          onClick={() => navigate(`/product/${product.id}`)}
                          src={product.productFileList[0].filePath}
                          borderRadius="lg"
                          w="100%"
                          h="200px"
                        />
                      )}
                      <Badge
                        position="absolute"
                        top="1"
                        left="1"
                        colorScheme="teal"
                      >
                        {product.endTimeFormat}
                      </Badge>
                    </>
                  ) : (
                    <Box position={"relative"} w={"100%"} h={"200px"}>
                      <Image
                        src={product.productFileList[0].filePath}
                        borderRadius="lg"
                        w="100%"
                        h="200px"
                        filter="brightness(50%)"
                        position="absolute"
                        top="0"
                        left="0"
                      />
                      <Text
                        onClick={() => navigate(`/product/${product.id}`)}
                        cursor={"pointer"}
                        borderRadius="lg"
                        w="100%"
                        h="200px"
                        position="absolute"
                        top="0"
                        left="0"
                        color={"white"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        fontSize={"2xl"}
                        as="b"
                      >
                        판매완료
                      </Text>
                    </Box>
                  )}
                </Box>
                <Stack mt="6" spacing="3">
                  <Flex justifyContent={"space-between"}>
                    <Text as={"b"} noOfLines={1} fontSize="lg">
                      {product.title}
                    </Text>

                    {account.isLoggedIn() && (
                      <Box onClick={() => handleLikeClick(product.id)}>
                        {(() => {
                          const isLiked = likes[product.id];
                          const icon = isLiked ? fullHeart : emptyHeart;
                          return (
                            <FontAwesomeIcon
                              icon={icon}
                              style={{ color: "red" }}
                              cursor="pointer"
                              size="xl"
                            />
                          );
                        })()}
                      </Box>
                    )}
                  </Flex>
                  <Flex justifyContent={"space-between"}>
                    <Text color="blue.600" fontSize="xl">
                      {product.startPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </Text>
                    <Text>{product.timeFormat}</Text>
                  </Flex>
                </Stack>
                {product.status || (
                  <Box display="flex" justifyContent="center">
                    <Button mt={2} w={"100%"} colorScheme={"green"}>
                      상품 후기
                    </Button>
                  </Box>
                )}
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
