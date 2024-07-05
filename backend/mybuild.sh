# react project build
cd ../frontend
npm run build

# index.html, main.js 복사(이동) : dist -> static
cd ../backend
rm -rf src/main/resources/static
mv ../frontend/dist src/main/resources/static

# spring project build
./gradlew bootJar

# build image
docker build -t jinjin11/function .

# push image
docker push jinjin11/function

# remote 에서

# 컨테이너 멈추고
ssh -i src/main/resources/secret/key0527.pem ubuntu@54.180.228.71 'docker stop function'
# 컨테이너 삭제
ssh -i src/main/resources/secret/key0527.pem ubuntu@54.180.228.71 'docker rm function'
# pull image
ssh -i src/main/resources/secret/key0527.pem ubuntu@54.180.228.71 'docker pull jinjin11/function'
# 컨테이너 실행
ssh -i src/main/resources/secret/key0527.pem ubuntu@54.180.228.71 'docker run -d -p 8080:8080 --restart always --name function jinjin11/function'
