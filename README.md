클라이언트가 휴대폰 번호를 입력하면 휴대폰 번호가 Context에 전달됩니다. 인증요청 버튼을 누르면 입력한 휴대폰 번호로 인증번호를 발송합니다. 휴대폰 번호가 인증되면 Context의 isCheckedCode를 true로 갱신합니다.

1. setTimeOut으로 인증번호 발송 후 3분의 타이머가 실행됩니다
2. 인증번호가 발송되면 휴대폰 번호와 인증번호를 DB에 저장합니다
3. 재전송을 누르면 타이머가 초기화되고, DB에 저장된 인증번호도 갱신됩니다
4. 3분이 지나도 인증이 되지 않으면 TimerTask()가 실행되어 DB에 저장된 인증번호가 삭제되고 인증번호 확인 버튼도 비활성화 됩니다
5. 4자리 숫자를 입력하면 인증번호 확인 버튼이 활성화됩니다
6. 인증이 완료되면 이메일 찾기 버튼이 활성화되어 해당 휴대폰번호에 맞는 이메일들이 조회됩니다.
7. 원하는 이메일을 체크하고 비밀번호 재설정하기를 누르면 휴대폰 번호와 이메일을 쿼리스트링으로 전달합니다.
