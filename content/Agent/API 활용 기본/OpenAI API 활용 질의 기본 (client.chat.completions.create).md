[[API Key 발급 정리]]

```
from dotenv import load_dotenv
import os
from openai import OpenAI

# .env 파일로부터 환경변수 불러오기
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')  # 하지만 이 값은 client에 전달되지 않음

client = OpenAI()  # api_key를 명시적으로 전달하지 않았음 → 기본 환경 변수로 인식함

response = client.chat.completions.create(
    model='gpt-4o-mini',
    response_format={"type": "json_object"},  # 공식 API 문서에는 아직 실험적 옵션일 수 있음
    messages=[
        {"role": "system", "content": "당신은 사용자가 꽃에 대한 정보를 이해하도록 돕는 지능형 비서이며, JSON 형식의 내용을 출력할 수 있습니다."},
        {"role": "user", "content": "생일 선물로 어떤 꽃이 가장 좋을까요?"}
    ]
)
```

→
- **모델:** `gpt-4o-mini`    
- **목표:** JSON 형식으로 꽃 선물 추천을 받아오기    
- **response_format:** 이 키는 공식 문서에는 보통 `"json"` (string)으로 설정해야 하는데, 현재 사용된 `{"type": "json_object"}`는 향후 deprecated 될 수 있음

→ 출력 메시지
response.choices[0].message.content
{
  "best_flower_gifts": [
    {
      "flower": "장미",
      "meaning": "사랑과 열정을 상징",
      "occasion": "생일, 기념일"
    },
    {
      "flower": "백합",
      "meaning": "순수함과 우아함",
      "occasion": "친구의 생일, 고백"
    },
    {
      "flower": "튤립",
      "meaning": "사랑의 고백",
      "occasion": "생일, 격려"
    },
    {
      "flower": "해바라기",
      "meaning": "기쁨과 긍정적인 에너지",
      "occasion": "친구나 가족의 생일"
    },
    {
      "flower": "프리지아",
      "meaning": "친애와 우정",
      "occasion": "특별한 사람의 생일"
    }
  ],
  "considerations": {
    "recipient_preferences": "받는 사람의 좋아하는 꽃",
    "flower_colors": "상대방이 좋아하는 색상",
    "arrangement": "꽃다발 또는 화분"
  }
}

CompletionUsage(completion_tokens=256, prompt_tokens=55, total_tokens=311)

- 입력 프롬프트는 55 토큰
    
- 모델 응답은 256 토큰
    
- 총 311 토큰 → 요금 계산 시 기준

