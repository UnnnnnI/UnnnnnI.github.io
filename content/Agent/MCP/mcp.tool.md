
[[MCP 기본 활용 방법]]

테스트를 위해 다음과 같이 코드 생성

```
from mcp.server.fastmcp import FastMCP

mcp = FastMCP(name = 'tutorial1') # tutorial1이라는 이름으로 mcp 서버 생성

@mcp.tool() 
def echo(message: str) -> str:
    '''
    입력받은 메시지를 그대로 반환
    '''
    return "your message is : " + message

if __name__ == "__main__":
    mcp.run()
```

데코레이터: @ 데코레이터 아래 정의된 echo 함수를 claude desktop이 실행함
echo 함수를 찾아 실행하는 것은 claude desktop과 mcp 프로토콜이 담당함
''' ''' 안의 주석 (독스트링) 과 타입 힌트 (str 등) 이걸 잘 써둬야 claude가 함수를 제대로 실행할 확률이 높음


가상환경 쓰고 있으면 json을 다음과 같이 수정
가상환경 아니면 command에다가 그냥 "python " 써도 됨

{
	"mcpServers": {
		"tutorial1": {
			"command": "D:\\Seungro\\work\\LLM\\mcp\\venv\\Scripts\\python.exe",
			"args": ["D:\\Seungro\\work\\LLM\\mcp\\tutorial1.py"]
		}
	}
}

저장하고 claude를 껐다가 다시 시작

그럼 다음과 같이 뜸
![[스크린샷 2025-09-09 224748.png]]

![[스크린샷 2025-09-09 224800.png]]

이제 물어보면 됨
![[스크린샷 2025-09-09 224858.png]]

그럼 알아서 호출해서 씀
![[스크린샷 2025-09-09 224908.png]]
![[스크린샷 2025-09-09 224928.png]]