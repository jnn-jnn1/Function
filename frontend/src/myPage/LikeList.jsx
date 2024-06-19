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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowDownIcon, ArrowUpIcon, ChevronUpIcon } from "@chakra-ui/icons";

export function LikeList() {
  const { userId } = useParams();
  const [likeProductList, setLikeProductList] = useState(null);
  const [likes, setLikes] = useState({});
  const [pageInfo, setPageInfo] = useState({});
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const account = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1");
    axios
      .get(`/api/products/user/${userId}/like?page=${currentPage}`)
      .then((res) => {
        if (currentPage === 1) {
          setLikeProductList(res.data.likeProductList);
        } else {
          setLikeProductList((prevList) => [
            ...prevList,
            ...res.data.likeProductList,
          ]);
        }
        // 좋아요 상태 업데이트
        setLikes((prevLikes) => {
          const updatedLikes = { ...prevLikes };
          res.data.likeProductList.forEach((product) => {
            if (prevLikes[product.id] !== undefined) {
              updatedLikes[product.id] = prevLikes[product.id];
            } else {
              updatedLikes[product.id] = true; // 기본값은 true로 설정
            }
          });
          return updatedLikes;
        });
        setPageInfo(res.data.pageInfo);
        setHasNextPage(res.data.hasNextPage);
      });
  }, [searchParams]);

  if (likeProductList === null) {
    return <Spinner />;
  }

  function handleLikeClick(productId) {
    axios
      .put("/api/products/like", {
        productId: productId,
      })
      .then((res) => {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [productId]: res.data.like,
        }));
      })
      .catch((error) => {
        console.error("Failed to update like status", error);
      });
  }

  function handleMoreClick() {
    if (!hasNextPage) return;

    const currentPage = parseInt(searchParams.get("page") || "1");
    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  }

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFoldClick() {
    const scrollDuration = 500;
    setTimeout(() => {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }, scrollDuration);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Box>
      {likeProductList.length === 0 ? (
        <Text align="center" fontSize="xl" fontWeight="bold" mt={4}>
          찜한 상품이 없습니다.
        </Text>
      ) : (
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          {likeProductList.map((product) => (
            <GridItem key={product.id}>
              <Card
                maxW="sm"
                h="100%"
                borderWidth="1px"
                borderColor={"#eee"}
                borderRadius="lg"
                overflow="hidden"
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
      )}
      <Box display={"flex"} justifyContent={"center"}>
        {hasNextPage ? (
          <Button
            w={"30%"}
            colorScheme={"blue"}
            mt={4}
            onClick={handleMoreClick}
            rightIcon={<ArrowDownIcon />}
          >
            더보기
          </Button>
        ) : likeProductList.length > 9 ? (
          <Button
            w={"30%"}
            colorScheme={"blue"}
            mt={4}
            rightIcon={<ChevronUpIcon />}
            onClick={handleFoldClick}
          >
            접기
          </Button>
        ) : (
          likeProductList.length > 6 && (
            <Button
              w={"30%"}
              colorScheme={"blue"}
              mt={4}
              rightIcon={<ArrowUpIcon />}
              onClick={handleScrollToTop}
            >
              맨 위로
            </Button>
          )
        )}
      </Box>
    </Box>
  );
}