import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useSearchParams } from "react-router-dom";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { LoginContext } from "../component/LoginProvider.jsx";

export function ProductList() {
  const [productList, setProductList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [likes, setLikes] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  useEffect(() => {
    axios.get(`/api/products/search?${searchParams}`).then((res) => {
      const products = res.data.content;
      const initialLikes = products.reduce((acc, product) => {
        acc[product.id] = product.like || false;
        return acc;
      }, {});

      if (account?.id) {
        axios.get(`/api/products/like/${account.id}`).then((res) => {
          res.data.forEach((productId) => {
            initialLikes[productId] = true;
          });
          setLikes(initialLikes);
        });
      }
      setProductList(products);
      setPageInfo(res.data.pageInfo);
    });
  }, [searchParams, account]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
  }

  function handleLikeClick(productId) {
    axios
      .put(`/api/products/like`, {
        productId: productId,
      })
      .then((res) => {
        setLikes((prevLike) => ({
          ...prevLike,
          [productId]: res.data.like,
        }));
      });
  }

  return (
    <Box>
      {/*<Category />*/}
      <Heading my={6}></Heading>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        gap={6}
      >
        {productList.map((product) => (
          <GridItem key={product.id}>
            <Card
              cursor={"pointer"}
              maxW="sm"
              h="100%"
              borderWidth="1px"
              borderColor={"#eee"}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
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
                        top="1.5"
                        left="2"
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
                <Stack mt="4" spacing="2">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      noOfLines={1}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.title}
                    </Text>
                    {account.isLoggedIn() && (
                      <Box onClick={() => handleLikeClick(product.id)}>
                        <FontAwesomeIcon
                          icon={likes[product.id] ? fullHeart : emptyHeart}
                          style={{ color: "red" }}
                          cursor="pointer"
                          size="lg"
                        />
                      </Box>
                    )}
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text color="blue.600" fontSize="lg">
                      {product.startPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      원
                    </Text>
                    <Text>{product.timeFormat}</Text>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>

      {/*페이지네이션*/}
      <Center>
        {productList.length === 0 ? (
          <Text>해당 상품의 검색 결과가 없습니다.</Text>
        ) : (
          <Box mt={"30px"}>
            {pageInfo.currentPageNumber == 0 || (
              <Button
                mr={"10px"}
                onClick={() => handlePageButtonClick(pageInfo.firstPageNumber)}
              >
                <FontAwesomeIcon icon={faAnglesLeft} />
              </Button>
            )}
            {pageInfo.leftPageNumber > 10 && (
              <Button
                mr={"10px"}
                onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
            )}

            {pageNumbers.map((pageNumber) => (
              <Button
                mr={"10px"}
                onClick={() => handlePageButtonClick(pageNumber)}
                key={pageNumber}
                colorScheme={
                  pageNumber - 1 == pageInfo.currentPageNumber ? "teal" : "gray"
                }
              >
                {pageNumber}
              </Button>
            ))}

            {pageInfo.nextPageNumber < pageInfo.lastPageNumber && (
              <Button
                mr={"10px"}
                onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            )}
            {pageInfo.currentPageNumber === pageInfo.lastPageNumber - 1 || (
              <Button
                onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
              >
                <FontAwesomeIcon icon={faAnglesRight} />
              </Button>
            )}
          </Box>
        )}
      </Center>
    </Box>
  );
}
