package com.backend.controller.user;

import com.backend.domain.user.User;
import com.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;
    private final AuthenticationConfiguration authenticationConfiguration;

    // user_id 멤버 상세
    @PreAuthorize("isAuthenticated()")
    @GetMapping("users/{id}")
    public ResponseEntity getUser(@PathVariable Integer id) {
        User db = service.getUserByUserId(id);
        if (db != null) {
            db.setPassword("");
        }
        return ResponseEntity.ok(db);
    }

    // user 회원 가입
    @PostMapping("users")
    public ResponseEntity addUser(@RequestBody User user) {
        //TODO:나중에 주석 풀기
//        if (service.signUpVerification(user)) {
        service.addUser(user);
        return ResponseEntity.ok().build();
//        }
//        return ResponseEntity.badRequest().build();
    }


    // 회원가입 시 인증코드 받기
    // TODO. 나중에 활성화
    @GetMapping("users/codes")
    public ResponseEntity sendCode(String phoneNumber) {
        if (phoneNumber.length() == 11) {
            String verificationCode = service.sendMessage(phoneNumber);
            System.out.println("verificationCode = " + verificationCode);
            return ResponseEntity.ok(verificationCode);
        }
        return ResponseEntity.badRequest().build();
    }

    // 인증코드 일치 확인
    @GetMapping("users/confirmation")
    public ResponseEntity verifyCode(String phoneNumber, int verificationCode) {
        if (service.checkVerificationCode(phoneNumber, verificationCode)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // user 수정
    @PreAuthorize("isAuthenticated()")
    @PutMapping("users/{id}")
    public ResponseEntity updateUser(User user, Authentication authentication,
                                     @RequestParam(value = "profileImages[]", required = false) MultipartFile profileImage) throws IOException {
        if (service.identificationToModify(user)) {
            Map<String, Object> token = service.updateUser(user, authentication, profileImage);
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // user 삭제
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("users/{id}")
    public ResponseEntity removeUser(@RequestBody User user, Authentication authentication) {
        if (service.identificationToDelete(user, authentication)) {
            service.removeUserById(user.getId());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // user 로그인
    @PostMapping("users/login")
    public ResponseEntity login(@RequestBody User user) {

        Map<String, Object> token = service.issueToken(user);
        if (token == null) {
            return ResponseEntity.notFound().build();
        }
        if (token.get("message") != null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(token);
    }

    // 회원가입 시 email 중복 확인
    @GetMapping("/users/emails")
    public ResponseEntity emails(String email) {
        User user = service.getUserByEmail(email);
        String emailPattern = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*";

        if (!email.trim().matches(emailPattern)) {
            return ResponseEntity.ok().build();
        }
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    // 회원가입 시 닉네임 중복 확인
    @GetMapping("/users/nickNames")
    public ResponseEntity nickNames(String nickName) {
        User user = service.getUserByNickName(nickName);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    // user 리스트 조회
    @GetMapping("/users/list")
    public Map<String, Object> list(@RequestParam(required = false, defaultValue = "1") int page,
                                    @RequestParam(required = false) String type,
                                    @RequestParam(required = false, defaultValue = "") String keyword) {
        return service.getUserList(page, type, keyword);
    }

    // 유저 신고하기
    @PutMapping("/users/black/{id}")
    public void reportUser(@PathVariable Integer id) {
        service.reportUserById(id);
    }

    // 전화번호로 이메일 찾기
    @GetMapping("/users/emails/{phoneNumber}")
    public ResponseEntity getEmails(@PathVariable String phoneNumber) {
        if (phoneNumber.length() == 11) {
            String email = service.getEmailByPhoneNumber(phoneNumber);
            if (email != null) {
                return ResponseEntity.ok(email);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }

    // 비밀번호 재설정
    @PutMapping("/user/passwords")
    public ResponseEntity modifyPassword(@RequestBody User user) {
        if (service.modifyPassword(user)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}