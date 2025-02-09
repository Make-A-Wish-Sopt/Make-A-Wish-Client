# Make a Wish
![기본케이크 11](https://github.com/user-attachments/assets/2447fb97-524a-46a1-b894-903acb1bd742)

## 프로젝트 소개
친구의 생일이 다가오면 어떤 선물을 할지 고민이 됩니다. 친구에게 물어보면 돌아오는 대답 ‘아무거나’. 

기왕이면 친구가 필요하고, 잘 쓸 수 있는 선물을 하고 싶은데 어떤 게 좋을지 아무리 생각해도 너무 어렵곤 합니다. <br/>
특히 이미 있는 물건을 선물하지는 않을까? 걱정되기도 합니다.

그렇기 때문에 편하게 갖고 싶은 물건을 보여주고, 친구도 쉽게 보탬이 될 수 있는 서비스를 만들고 싶었어요.<br/>
**‘라떼’가 모여서 ‘에어팟’이 될 수 있다니!** <br/>
친구도 원하는 선물을 받고, 저도 부담 없이 선물을 할 수 있었어요.

## 배포 주소
[https://sunmulzu.com](https://sunmulzu.com)

## 서비스 아키텍쳐

![Group 2609503](https://github.com/user-attachments/assets/850a952c-2b06-4562-afe9-35609277ebb7)


## 기술 스택

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**

## 주요 기능

- 소원 게시물 CRUD (생성, 조회, 수정, 삭제)
- 카카오 소셜 로그인
- React-Hook-Form을 통한 입력 상태 관리
- 계좌 인증

## 시작 가이드

### 요구 사항
- `yarn` 패키지 매니저가 설치되어 있어야 합니다.

### 실행 명령어

- **개발 모드**  
  ```bash
  $ yarn dev

### 환경변수 설정

`.env.local` 파일에 아래와 같은 환경변수를 추가해주세요:

```bash
NEXT_PUBLIC_BASE_URL="https://www.api-sunmulzu.shop"
NEXT_PUBLIC_S3_URL="https://sunmulzu-wish-image-bucket.s3.ap-northeast-"
NEXT_PUBLIC_KAKAO_REDIRECT_URI="http://localhost:8080/login/oauth2/code/kakao"
```


## 개발 기간
- **2024.02 ~ 현재 진행 중**

## 팀원 구성
- 기획: 2명
- 디자인: 1명
- 서버: 1명
- 프론트: 2명

