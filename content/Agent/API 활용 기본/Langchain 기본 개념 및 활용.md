[[API Key 발급 정리]]

LLM을 외부 데이터와 연결하여 인공지능 애플리케이션을 구축할 수 있게 도와주는 오픈 소스 기반 체계

#### Langchain 기반 인공지능 애플리케이션 개발의 3가지 장점

1) Langchain은 유연한 기반 체계로 여러 LLM과 상호작용 할 수 있음
   : OpenAI 뿐만 아니라 Claude, Hugging Face Hub 등 다양한 모델에 동시 입력하고 답변 비교 가능함
2) LLM 애플리케이션 개발에서 필요로 하는 다양한 기술적 세부사항을 캡슐화하여 많은 작업을 간소화함
   : 프롬프트 템플릿, 프롬프트 관리, 공통 인터페이스, ReAct와 같은 언어적 논리 사고 기반 체계 콛, 구현, 외부 데이터 소스와의 상호작용, 상호작용형 에이전트 생성, 연동과 에이전트 호출 상태 유지, .... 등등 엄청 많음
3) 여러 종류 인공지능 개발 관련 라이브러리 및 도구와 통합
   : ex) 벡터 데이터베이스와 상호작용하는 인터페이스를 포함


#### 기본 활용

```
from dotenv import load_dotenv

# 키 불러오기
load_dotenv()

# 프롬프트 템플릿 설정
from langchain.prompts import PromptTemplate
prompt = PromptTemplate.from_template('{flower}의 꽃말은?')

# LLM 설정
from langchain_openai import OpenAI
model = OpenAI()

# 출력 분석기 설정
from langchain.schema.output_parser import StrOutputParser
output_parser = StrOutputParser()

# 연쇄 구성
chain = prompt | model | output_parser

# 결과 출력
res = chain.invoke({"flower": "라일락"})
print(res)
```

![[Pasted image 20250501155400.png]]

![[Pasted image 20250501155516.png]]
