

[[MCP 기본 활용 방법]]

resource는 필요한 정보나 데이터를 특정 주소 url을 통해 가져올 수 있게 해주는 기능
웹 api의 get 엔드포인트와 유사하게 작동

작성 함수 위에 @mcp.resource(주소) 데코레이터를 추가하면 해당 url로 접근함
-> 이 주소로 오면 이 데이터를 제공해줄게...

코드는 다음과 같음
```
from mcp.server.fastmcp import FastMCP

  

# Create an MCP server

mcp = FastMCP("tutorial_2")

  
  

@mcp.tool()

def add(a: int, b: int) -> int:

    """Add two numbers"""

    return a + b

  
  

@mcp.resource("greeting://hello")

def get_greeting() -> str:

    """Get a personalized greeting"""

    return f"Hello, world!"

  
  

# 서버 실행

if __name__ == "__main__":

    mcp.run()
```

![[Pasted image 20250909225511.png]]

![[Pasted image 20250909225523.png]]
이렇게 선택해주면 대화창에 첨부됨
tool이랑은 다름

tool은 llm이 적당히 알아서 찾음