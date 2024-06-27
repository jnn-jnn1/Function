import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LoginContext } from "../component/LoginProvider.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { CustomToast } from "../component/CustomToast.jsx";
import { buttonStyle } from "../component/css/style.js";

const VerticalLine = ({ height, color, thickness }) => {
  return <Box height={height} width={thickness} bg={color} />;
};

export function UserEdit() {
  const account = useContext(LoginContext);
  const [user, setUser] = useState(null);
  const [oldNickName, setOldNickName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const [isCheckedNickName, setIsCheckedNickName] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [profileImages, setProfileImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast } = CustomToast();
  const { onClose, isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/users/${account.id}`).then((res) => {
      const dbUser = res.data;
      setUser({ ...dbUser });
      setOldNickName(dbUser.nickName);
    });
  }, []);

  function handleUserUpdate() {
    setIsLoading(true);
    const userCopy = { ...user };
    delete userCopy.profileImage;
    axios
      .putForm(`/api/users/${account.id}`, {
        ...userCopy,
        oldPassword,
        profileImages,
      })
      .then((res) => {
        account.logout;
        account.login(res.data.token);
        successToast("회원 정보가 수정되었습니다");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          errorToast("비밀번호가 다릅니다");
        } else if (err.response.status === 400) {
          errorToast("사용할 수 없는 비밀번호이거나 닉네임입니다");
        } else {
          errorToast("회원 정보 수정 중 문제가 발생했습니다");
        }
      })
      .finally(() => {
        setOldPassword("");
        onClose();
        setIsLoading(false);
      });
  }

  function handleDuplicated() {
    axios
      .get(`/api/users/nickNames?nickName=${user.nickName}`)
      .then(() => {
        errorToast("이미 존재하는 닉네임입니다");
      })
      .catch(() => {
        successToast("사용 가능한 닉네임입니다");
        setIsCheckedNickName(true);
      });
  }

  if (user === null) {
    return <Spinner />;
  }

  let disabledNickNameCheckButton = true;
  let disabled = false;
  let isPasswordCheck = user.password === passwordCheck;

  if (user.nickName.length === 0) {
    disabledNickNameCheckButton = false;
  }

  if (!isCheckedNickName) {
    disabled = true;
  }

  if (!isPasswordCheck) {
    disabled = true;
  }

  if (!disabledNickNameCheckButton) {
    disabled = true;
  }

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  return (
    <Box>
      <Box mt={10}>
        <Heading fontSize={"2xl"}>회원정보 수정</Heading>
        <HStack mt={10} ml={5}>
          <Box>
            <Image
              width={"150px"}
              src={imgFile}
              alt="프로필 이미지"
              borderRadius={"100px"}
              fallbackSrc={
                user.profileImage.src
                  ? user.profileImage.src
                  : "https://study34980.s3.ap-northeast-2.amazonaws.com/prj3/profile/original_profile.jpg"
              }
            />
            <Center mt={3}>
              <Button
                onClick={() => imgRef.current.click()}
                colorScheme="teal"
                height={"30px"}
                fontSize={"xs"}
              >
                이미지 업로드
              </Button>
            </Center>
            <FormControl mt={7}>
              <Input
                display={"none"}
                type={"file"}
                accept="image/*"
                ref={imgRef}
                onChange={(e) => {
                  setProfileImages(e.target.files);
                  saveImgFile();
                }}
              />
            </FormControl>
          </Box>
          <VerticalLine
            height="180px"
            color="gray.200"
            thickness="2px"
            margin-left={"20px"}
          />
          <Box ml={5}>
            <Heading mb={8}>{user.email || ""}</Heading>
            <Text>변경 시에만 비밀번호와 닉네임을 입력해주세요</Text>
          </Box>
        </HStack>
        <FormControl mt={7}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type={"password"}
            variant="flushed"
            placeholder={"변경 시에만 입력해주세요"}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </FormControl>
        <FormControl mt={7}>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input
            type={"password"}
            variant="flushed"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          {isPasswordCheck || (
            <FormHelperText>비밀번호가 일치하지 않습니다</FormHelperText>
          )}
        </FormControl>
        <FormControl mt={7}>
          <FormLabel>닉네임</FormLabel>
          <InputGroup size="md">
            <Input
              variant="flushed"
              placeholer={"닉네임 중복 확인 필수"}
              value={user.nickName}
              onChange={(e) => {
                setUser({ ...user, nickName: e.target.value });
                setIsCheckedNickName(false);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                onClick={handleDuplicated}
                isDisabled={!disabledNickNameCheckButton}
                h="1.75rem"
                size="md"
                colorScheme="teal"
                variant="outline"
              >
                중복확인
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button onClick={onOpen} isDisabled={disabled} mt={10} {...buttonStyle}>
          수정
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정하시겠습니까?</ModalHeader>
          <ModalBody>비밀번호를 입력해주세요</ModalBody>
          <ModalFooter>
            <Input
              type={"password"}
              variant="flushed"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleUserUpdate} isLoading={isLoading}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
