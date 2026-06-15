[[API Key 발급 정리]]

인공지능 기반의 검색증강생성 (RAG, Retreval-Augmented Generation)기술 개발과 멀티테넌트 검색증강생성 시스템 구축에 주력하는 오픈 소스 인공지능 어플리케이션 개발 기반 체계

＊ 검색증강생성: 정보 검색과 생성이 결합된 머신러닝 방법
데이터 소스에서 정보를 검색 / 이 정보를 문맥으로 추가하여 사용자의 요청에 응답하는 방식

LlamaIndex의 도구
- 데이터 연결자 (data connector): 데이터는 API, PDF, SQL 등 다양한 형태이고 이를 읽을 수 있는 인터페이스를 제공
- 데이터 색인 (data index): LLM이 이해하기 쉽게 데이터를 word vector 같은 형태로 색인, 구조화
- 엔진: 데이터를 자연어로 접근할 수 있게 함
- 애플리케이션 통합: 다른 생태계와 통합

```
from dotenv import load_dotenv  

# 키 불러오기
load_dotenv()  

# 문서 적재
from llama_index.core import SimpleDirectoryReader
documents = SimpleDirectoryReader("./agent-test/data").load_data()

# 문서 색인 생성
from llama_index.core import VectorStoreIndex
index = VectorStoreIndex.from_documents(documents)  

# 요청 엔진 생성
agent = index.as_query_engine()  

# 요청 예제
question1 = '저자들은 B-rep 형상을 어떻게 생성하나요?'
response = agent.query(question1)
print(question1, response)  

# 색인을 로컬에 저장
index.storage_context.persist()
```

