

[[MCP 기본 활용 방법]]

코드 동작 하는 것을 확인하려고 매번 클로드를 껐다가 다시 실행하는게 번거로움

그래서 Inspector는 작성한 MCP 서버를 개별적으로 연결하고 테스트할 수 있는 웹 기반 인터페이스를 제공
클로드를 실행하지 않아도 제대로 동작하는지 바로 확인 가능하다고 함

아래 두 개 설치하고 node.js도 깔아야됨
```
pip install mcp[cli]
pip install uv
```

그리고 dev로 코드 실행 명령어 쓸 수 있음

```
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("server")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

# 서버 실행
if __name__ == "__main__":
    mcp.run()

```

```
mcp dev server_test.py
```

![[Pasted image 20250912233509.png]]
제대로 다운되는건 아닌가봄...

저거 설치하면 이렇게 열림
![[Pasted image 20250912233555.png]]

connect 누르면 연결 됨
dev 할 때 tap 눌러서 파이썬 코드 치면 .\ 으로 잡혀서 connect 안 될 수 있음,,,

![[Pasted image 20250912233746.png]]


mcp install xxx.py 하면
테스트 했던 서버가 자동으로 json에 추가됨^^