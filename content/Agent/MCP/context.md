

[[MCP 기본 활용 방법]]

복잡한 애플리케이션을 개발할 때는 여러 함수가 동일한 데이터나 자원에 접근해야 하는 경우가 많음
(사용자 정보를 여러 기능에서 공통으로 사용하거나 특정 데이터를 불러와 여러 곳에서 활용하고 싶음 등)

-> 함수 간에 자원을 효율적으로 공유할 수 있게 해주는 도구: context

resource: 여러 함수에서 공유할 수 있는 데이터나 서비스
context: resource에 접근하기 위해 사용하는 객체

각 resource는 고유한 uri로 식별됨


```
from mcp.server.fastmcp import FastMCP, Context

# Create an MCP server
mcp = FastMCP("tutorial_5")


# context 객체를 통해 특정 resource로 읽어 오는 부분 : ctx.read_resource(xxx)
# await : async로 선언되었기 때문에 읽어올 때도 await 키워드 사용
# asysn - 비동기함수, await - 비동기 작업이 완료될 때 까지 기다림 / 비동기 프로그램은 여러 작업을 동시에 효율적으로 처리 가능
@mcp.tool()
async def greeting(name: str, ctx: Context) -> str:
    """Get a greeting using the greeting resource"""
    try:
        result = await ctx.read_resource(f"greeting://{name}")
        content = result[0] if isinstance(result, tuple) else result
        return f"Tool response: {content}"
    except Exception as e:
        return f"Error retrieving greeting: {str(e)}"


@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!! Welcome to FastMCP!"


if __name__ == "__main__":
    mcp.run()

```


![[Pasted image 20250912232708.png]]

![[Pasted image 20250912232741.png]]

greeting 함수가 context를 통해 resource에 접근해서 데이터를 가져옴

복잡한 작업 흐름을 함수와 리소스, 컨텍스트로 구분하여 유기적으로 연결
모듈화된 설계가 가능