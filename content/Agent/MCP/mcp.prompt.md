

[[MCP 기본 활용 방법]]

질문에 특정 형식이나 지시 사항을 자동으로 덧붙여 주는 기능

```
from mcp.server.fastmcp import FastMCP

# Create an MCP server

mcp = FastMCP("tutorial_3")

@mcp.prompt()

def prompt_extension(contents: str) -> str:

    return f"""{contents}

    이 프롬프트에 대해 아래와 같은 템플릿에 맞춰 대답해줘.

    * 사실: 

    * 의견:
    """ 

# 서버 실행
if __name__ == "__main__":
    mcp.run()
```


![[Pasted image 20250912225903.png]]

![[Pasted image 20250912225936.png]]

![[Pasted image 20250912230008.png]]




