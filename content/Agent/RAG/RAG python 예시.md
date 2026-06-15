[[LlamaIndex 활용 기본]] : RAG 에이전트를 통해 재무 분석 수행 예제


[[RAG 대략적인 과정]]
1 전자상거래 업체의 재무 보고서 파일 적재하기
2 벡터 데이터 변환
3 검색 엔진 구성 (QueryEngineTool): 입력에 대해 유사도가 높은 블록을 추출할 수 있게 해줌
4 LLM 설정 및 에이전트 초기화
5 에이전트에게 요청(query)

![[Pasted image 20250514232449.png]]
> Running step 643ca0e5-7a95-424f-8f96-c31fe91865fc. Step input: 전자 상거래 업체 A와 전자 상거래 B의 매출과 영업이익을 비교 분석해 주세요. 당신이 투자자라면 어느 회사가 더 좋을지 판단해주세요.
Thought: 현재 사용자의 언어는 한국어입니다. 두 전자 상거래 업체 A와 B의 매출과 영업이익을 비교하기 위해 각각의 재무 정보를 조회해야 합니다.
Action: A_Finance
Action Input: {'input': '매출과 영업이익'}
Observation: Revenue increased from the third quarter of 2022 to the third quarter of 2023. Operating loss decreased significantly during the same period.
> Running step c0c67a10-fd36-4e11-a7f7-ecdd08c88ace. Step input: None
Thought: A 업체의 매출이 증가하고 영업 손실이 크게 감소한 것을 확인했습니다. 이제 B 업체의 재무 정보를 조회해야 합니다.
Action: B_Finance
Action Input: {'input': '매출과 영업이익'}
Observation: Revenue는 2022년과 2023년 각각 207,176 백만 RMB와 224,790 백만 RMB로 9% 증가했으며, 영업이익은 2022년에 비해 2023년에 25,137 백만 RMB에서 33,584 백만 RMB로 34% 상승했습니다.
> Running step 78cedd96-13ee-41a9-ad78-66491b0e6a51. Step input: None
Thought: B 업체의 매출은 9% 증가하였고, 영업이익은 34% 상승한 것을 확인했습니다. 이제 두 업체의 매출과 영업이익을 비교하여 어느 회사가 더 나은 투자처인지 판단할 수 있습니다.

A 업체:
- 매출: 증가
- 영업 손실: 크게 감소

B 업체:
- 매출: 9% 증가
- 영업이익: 34% 증가

A 업체는 매출이 증가했지만 영업 손실이 있었고, B 업체는 매출과 영업이익 모두 증가했습니다. 

Thought: 두 업체의 재무 성과를 비교한 결과, B 업체가 더 안정적이고 성장 가능성이 높아 보입니다.
Answer: 전자 상거래 업체 B가 더 나은 투자처로 판단됩니다.