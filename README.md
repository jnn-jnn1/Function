### READ ME

![로고](https://github.com/jnn-jnn1/Function/blob/master/image/Untitled%20(2).png?raw=true)

## **🌟 서비스 소개**

- 'FUNCTION' 은 "**경매**"를 통해 상품을 거래하는 플랫폼입니다
- "긴장감 넘치는 경매의 스릴"울  추구하며,
    
    타임어택 경매 ⏳를 통해 경매가 종료되면, 당첨여부를 바로 확인 가능합니다
    
- 당첨된 후에는 **판매자와 채팅**을 통해 구매를 확정할 수 있습니다



## **👨‍👨‍👧‍👦 팀원 소개**

**Da Hee Kim**

- 🐶 Github: [https://github.com/huitopia]

**Ye Been Kim**

- 🐍 Github: [https://github.com/kybcod]

**Jin A An**

- 🐮 Github : [https://github.com/jnn-jnn1]

**Hwa Yeong Joe**

- 🦄 Github: [https://github.com/kiwi85547]

**Jeong Yun Heo**

- 🐴 Github : [https://github.com/JeongYunheo]


## **⛓ 기술 스택**

**Backend :  Java, Spring Boot, MyBatis**

**Frontend : React, Vite, Node.js**

**Server :  AWS EC2**

**Management : Git, GitHub, Notion**

**Database : AWS S3, MariaDB, Docker**



## **⭐️ 주요 기능**

----

## 회원가입 및 로그인

![회원가입](https://github.com/jnn-jnn1/Function/blob/master/image/email_signup.gif?raw=true)

- **회원가입**
    - 클라이언트가 입력한 정보를 바탕으로 회원을 DB에 저장합니다
    - 입력 정보가 양식에 맞는지 정규 표현식으로 검증합니다
    - 이메일과 닉네임이 중복이 아닌지 확인합니다
    - 휴대폰 번호로 인증번호를 보내 유효한 휴대폰 번호인지 확인합니다
    - 개인정보 수집 동의 여부를 확인합니다
    - 모든 항목이 확인되었을 때만 회원 가입이 가능합니다


![로그인](https://github.com/jnn-jnn1/Function/blob/master/image/email_login.gif?raw=true)

- **로그인**
    - 클라이언트가 제공한 이메일과 비밀번호로 회원을 조회합니다.
    - 이메일과 비밀번호로 회원임이 검증되면 JWT 토큰을 발급합니다.
    - 발급된 JWT 토큰은 LocalStorage에 저장되어 axios 요청이 발생할 때마다 서버에 전달됩니다
    - JWT 토큰의 정보를 Context에 저장하여 사용자 정보를 애플리케이션 전역에서 사용합니다
 


---
## 상품 경매

![경매참여](https://github.com/jnn-jnn1/Function/blob/master/image/%EC%A0%9C%EB%AA%A9%20%EC%97%86%EB%8A%94%20%EB%94%94%EC%9E%90%EC%9D%B8.gif?raw=true)

- **경매 참여**
    - 경매를 참여하기 전에 모달을 띄워 경매 참여 시 유의사항을 보여줍니다.
    - 경매를 계속 참여할 수 있으며 계속 마지막으로 참여한 가격이 경매에 참여한 가격이 됩니다.
    - 입찰 금액을 입력하면 시작가보다 같거나 높기 전까지 경고 메세지를 띄웁니다.
    - 해당 상품의 경매에 처음 참여할 경우 참여 인원이 변경됩니다.


 
---
## 낙찰 여부 확인

![낙찰확인](https://github.com/jnn-jnn1/Function/blob/master/image/image.gif?raw=true)

- **경매 참여 후 낙찰 여부 확인**
    - 경매 참여 후 낙찰 여부는 마이 페이지 입찰내역에서 볼 수 있습니다.
    - **낙찰 성공** :  `낙찰 성공` 벳지로 알려주고 거래하기 버튼을 클릭하면 판매자와의 채팅으로 이어집니다.
    - **낙찰 실패**  : `낙찰 실패` 벳지로 알려줍니다.
 

---
# **📆 서비스 개발 개요**



## 기획 의도

- 사용자들이 원하는 상품을 얻기 위해 보이지 않는 경쟁을 함으로써 긴장감과 재미를 줍니다.
- 판매자에게는 처음 상품을 올린 가격(시작가)보다 더 높은 가격에 팔 수 있는 기회, 구매자에게는 원하는 상품을 더 저렴하게 구매할 수 있는 기회를 제공합니다.
- 비공개 입찰을 통해 경매 방식으로 거래하는 차별화된 방식입니다.



## **개발 일정**

- **총 진행 기간**: 2024.06.03 ~ 2024.07.04 ( 32일 )
- **설계 기간**: 2024.06.03 ~ 2024.06.05 ( 와이어 프레임, ERD, API)
- **피드백 반영 기간**: 2024.06.06 ~ 2024.06.22 ( 17일 )
- 화면 / 기능 구현, 테스트 기간 : 2024.06.23 ~ 2024.07.04 ( 12일 )



## 와이어 프레임

![와이어프레임](https://github.com/user-attachments/assets/481da724-2fee-4f71-a840-86cd86754ab2)



## ERD

![ERD](https://github.com/jnn-jnn1/Function/blob/master/image/%EB%B0%9C%ED%91%9C.png?raw=true)



## **🖼 사용 기술 스택**

![기술스택](https://github.com/jnn-jnn1/Function/blob/master/image/%EA%B0%9C%EB%B0%9C%20%EC%8A%A4%ED%83%9D.PNG.png?raw=true)



## 🔨기술 선정 Why ?
- **Spring Boot**
    - 내장된 톰캣 서버와 다양한 패키지를 통해 RESTful 웹 서비스를 구축할 수 있습니다.
- **AWS EC2**
    - 가상 서버를 사용하여 애플리케이션의 실행 환경을 제공합니다. 웹 애플리케이션, 데이터베이스 서버 등 다양한 형태의 애플리케이션을 호스팅합니다.
- **AWS S3**
    - 데이터의 내구성이 높고 높은 가용성을 제공하여 데이터 손실 없이 안정적으로 저장할 수 있어 파일을 저장할 때 사용합니다.
- **Docker**
    - 애플리케이션을 컨테이너화하여 개발, 테스트, 배포를 진행하였습니다.
- **Websocket**
    - 클라리언트와 서버 간의 실시간 양방향 통신을 가능하게 하여 채팅을 할 수 있도록 하였습니다.
- **STOMP**
    - Websocket을 통해 메시징 프로토콜을 구현하여 백엔드에서는 메시징 브로커와의 통신을 담당하고, 프론트엔드에서는 실시간 메시지 송수신을 처리합니다.
- **MariaDB**
    - MySQL 기반으로 오픈 소스 관계형 데이터베이스 관리 시스템으로 최적화된 쿼리를 작성할 수 있습니다.
- **React**
    - 사용자 인터페이스 구축을 위한 JavaScript 라이브러리로 컴포넌트 기반 구조를 통해 빠른 렌더링과 재사용성을 제공합니다. 단일 페이지 애플리케이션 개발할 때 적합하며, 라우팅, 상태 관리, 데이터 흐름 등을 간편하게 관리할 수 있습니다.



**⚙ 개발 환경 및 IDE**

- Spring Boot 3.2.6
- Java 21.0.3
- React 18.2.0
- Docker 26.1.1


**🌐 Server Description**

- http://54.180.228.71:8080/



## 🎞 최종산출물

https://www.canva.com/design/DAGJrEM9uQg/YjMCcJizEJdqjEsQd_eRWA/view?utm_content=DAGJrEM9uQg&utm_campaign=designshare&utm_medium=link&utm_source=editor

