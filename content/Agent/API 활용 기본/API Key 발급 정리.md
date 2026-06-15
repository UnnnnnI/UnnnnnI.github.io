
#### OpenAI 에서 Key 발급


**나는 OpenAI 에서 API KEY를 받으려면 PLUS 계정이어야 하는 줄 알았는데,,,,!!!!
괜히 돈 날린 기분,,,,??**
ChatGPT Plus와 OpenAI API Key는 별도 독립된 서비스,,, (API Key는 토큰 당 가격이 책정되어 있음...)

 - https://platform.openai.com/api-keys
   새로 키 만들 수 있다...
   키 복사 안 해두면 다시 볼 수 없음 (복사해두자!)
   ![[Pasted image 20250501131730.png]]
 
 - .env 파일을 만들어서 key 저장
   1) .env 파일에 OPENAI_API_KEY=xxxx 저장
      아래 그림 잘못됨... 그냥 .env 로 저장해야됨
   ![[Pasted image 20250501133125.png]]
   2) pip install python-dotenv 설치
   3) 아래 코드대로 하면 .env 내 키를 불러옴
```
from dotenv import load_dotenv
import os  

# .env 파일에서 환경변수 불러오기
load_dotenv()  

# 환경 변수 사용
api_key = os.getenv('OPENAI_API_KEY')
if api_key:
    print(f"[API KEY]\n{api_key}")
else:
    print("OPENAI_API_KEY가 .env 파일에 없거나 비어 있습니다.")
```



#### SerpAPI 에서 Key 발급
SerpAPI는 다양한 검색 엔진의 결과를 실시간으로 제공하는 API 서비스
이것도 key 발급하려면 돈 내야함,,,
이건 나중에 하자...

#### LangSmith Key 발급
LangSmith는 LangChain이 동작을 수행할 때마다 보내주는 메시지를 받아서 분석하는 웹 서비스 (디버깅 역할인듯)

1인 사용자 (개발자용)은 월 5000개 까지 트레이스가 무료, 이후 1000개 당 0.5달러

키 받아서 .env 파일 업데이트
![[Pasted image 20250501154643.png]]

LANGCHAIN_PROJECT 는 별도 지정 안 하면 default를 사용
![[Pasted image 20250501155221.png]]
![[Pasted image 20250501152900.png]]
