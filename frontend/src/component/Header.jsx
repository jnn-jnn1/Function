import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faHeartPulse,
  faMobileScreenButton,
  faSearch,
  faShirt,
  faTicket,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faComments, faUser } from "@fortawesome/free-regular-svg-icons"; // Import regular style FontAwesome icons
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginContext } from "./LoginProvider.jsx";
import { HamburgerIcon } from "@chakra-ui/icons";
import { faScaleUnbalanced } from "@fortawesome/free-solid-svg-icons/faScaleUnbalanced";

export function Header() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const keywordFromParams = searchParams.get("title");
    if (keywordFromParams) {
      setKeyword(keywordFromParams);
    } else {
      setKeyword("");
    }
  }, [searchParams]);

  function handleSearchClick(title) {
    navigate(`/list?title=${title}`);
  }

  function handleCategoryClick(category) {
    if (category === "") {
      navigate(`/list`);
    } else {
      navigate(`/list?category=${category}`);
    }
  }

  return (
    <Box height={"70px"}>
      <Flex align="center" justify="space-between" maxW="100%">
        <Menu>
          <Box ml={2} align="center">
            <MenuButton
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              as={Button}
              leftIcon={<HamburgerIcon />}
              size="lg"
            >
              카테고리
            </MenuButton>
          </Box>
          <MenuList m={2} border="1px solid green" borderRadius={0} bg="white">
            <MenuItem
              onClick={() => handleCategoryClick("clothes")}
              icon={<FontAwesomeIcon icon={faShirt} />}
              _hover={{ bg: "green.50" }}
              _focus={{ bg: "green.50" }}
            >
              의류
            </MenuItem>
            <MenuItem
              onClick={() => handleCategoryClick("goods")}
              icon={<FontAwesomeIcon icon={faBasketShopping} />}
              _hover={{ bg: "green.50" }}
            >
              잡화
            </MenuItem>
            <MenuItem
              onClick={() => handleCategoryClick("food")}
              icon={<FontAwesomeIcon icon={faUtensils} />}
              _hover={{ bg: "green.50" }}
            >
              식품
            </MenuItem>
            <MenuItem
              onClick={() => handleCategoryClick("digital")}
              icon={<FontAwesomeIcon icon={faMobileScreenButton} />}
              _hover={{ bg: "green.50" }}
            >
              디지털
            </MenuItem>
            <MenuItem
              onClick={() => handleCategoryClick("sport")}
              icon={<FontAwesomeIcon icon={faHeartPulse} />}
              _hover={{ bg: "green.50" }}
            >
              스포츠
            </MenuItem>
            <MenuItem
              onClick={() => handleCategoryClick("e-coupon")}
              icon={<FontAwesomeIcon icon={faTicket} />}
              _hover={{ bg: "green.50" }}
            >
              e-쿠폰
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 로고 */}
        <Box>
          <Text
            fontWeight={"bold"}
            fontSize={"2xl"}
            color={"green"}
            cursor={"pointer"}
            onClick={() => navigate("/")}
          >
            {/*LIVE AUCTION{" "}*/}
            <Box w={"250px"}>
              <Image src={"/img/function.png"} />
              {/*<Image src={"/img/live.PNG"} />*/}
            </Box>
          </Text>
        </Box>

        {/* 검색 */}
        <Flex align={"center"}>
          <InputGroup border={"1px solid green"}>
            <Input
              _focus={{ boxShadow: "none" }}
              bg="transparent"
              border="none"
              w="400px"
              placeholder="상품명 입력"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <InputRightAddon
              bg="transparent"
              border="none"
              onClick={() => handleSearchClick(keyword)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </InputRightAddon>
          </InputGroup>
        </Flex>

        {/* 마이경매, 판매하기, 경매톡 */}
        <Flex align="center" justifyContent="center">
          {account.isLoggedIn() && (
            <>
              <Box textAlign="center">
                <Button
                  variant="unstyled"
                  onClick={() => navigate(`/myPage/${account.id}`)}
                >
                  <FontAwesomeIcon icon={faUser} size="xl" />
                </Button>
                <Text fontSize="small" mt={1}>
                  마이경매
                </Text>
              </Box>

              <Box textAlign="center" ml={4}>
                <Button onClick={() => navigate("/write")} variant="unstyled">
                  <FontAwesomeIcon icon={faScaleUnbalanced} size="xl" />
                </Button>
                <Text fontSize="small" mt={1}>
                  판매하기
                </Text>
              </Box>

              <Box textAlign="center" ml={4} mr={4}>
                <Button
                  onClick={() => navigate("/chat/list")}
                  variant="unstyled"
                >
                  <FontAwesomeIcon icon={faComments} size="xl" />
                </Button>
                <Text fontSize="small" mt={1}>
                  경매톡
                </Text>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
