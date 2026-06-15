[[API Key 발급 정리]]

```
from dotenv import load_dotenv
import os

# 키 불러오기
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')

from openai import OpenAI

client = OpenAI(api_key=api_key)

response = client.images.generate(
    model = 'dall-e-3',
    prompt = "침대에 누워서 쉬고 있는 미모의 배우",
    size = "1024x1024",
    quality = 'standard',
    n = 1
    )
print(response)

img_url = response.data[0].url
print(img_url)
```

![[Pasted image 20250501150538.png]]