import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CustomToast } from "../component/CustomToast.jsx";

export function BoardModify() {
  const [board, setBoard] = useState({ title: "", content: "", inserted: "" });
  const { successToast, errorToast } = CustomToast();
  const { board_id } = useParams();
  const navigate = useNavigate();
  const offset = 1000 * 60 * 60 * 9;

  useEffect(() => {
    axios.get(`/api/board/${board_id}`).then((res) => {
      const boardData = {
        ...res.data,
        inserted: new Date(Date.now() + offset).toISOString(),
      };
      setBoard(boardData);
    });
  }, []);

  function handleClickSaveButton() {
    axios
      .put(`/api/board/modify`, board)
      .then(() => {
        successToast("게시물 수정이 완료되었습니다");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          errorToast("게시물 수정에 실패했습니다. 다시 수정해주세요");
        }
      });
  }

  function handleClickDeleteButton() {
    axios
      .delete(`/api/board/${board_id}`)
      .then(() => {
        successToast("게시물이 삭제되었습니다");
        navigate("/board/list");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          errorToast("게시물 삭제에 실패했습니다. 다시 삭제해주세요");
        }
      });
  }

  return (
    <Box>
      <Heading>자유게시판 글 수정</Heading>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
            value={board.title}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>상품 상세 내용</FormLabel>
          <Textarea
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
            value={board.content}
          />
        </FormControl>
      </Box>
      <Box>
        <Input type={"hidden"} value={board.inserted} />
      </Box>
      <Box>
        <Button onClick={handleClickSaveButton}>게시글 수정</Button>
      </Box>
      <Box>
        <Button onClick={handleClickDeleteButton}>게시글 삭제</Button>
      </Box>
    </Box>
  );
}
