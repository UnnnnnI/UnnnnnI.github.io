---
title: CAD 데이터의 인공지능 학습을 위한 전처리 방법 소개, Voxelization (복셀화)
date: 2023-05-17
tags:
  - 기술
---
최근 기계공학 분야에서 인공지능을 적용한 많은 연구가 진행, 발표되고 있다. 
인공지능 학습에는 일반적으로 배열 형태가 입력되어야 한다. 
인공지능에서 주로 활용되는 데이터 중 하나인 2D 이미지 픽셀도 너비, 높이, 채널을 가진 배열이다.

따라서, 인공지능 학습을 위해서 3차원 CAD로 설계한 데이터 또한 배열로 변환하는 전처리 과정을 거쳐야 한다. 
3차원 볼륨 공간의 배열 데이터는 voxel (복셀)로 부르며, 복셀로 만드는 작업을 **voxelization (복셀화)** 라고 한다.
​

본 글에서는 CAD 데이터를 활용한 전처리 과정인 **voxelization을 쉽게 할 수 있는 프로그램**을 소개하고자 한다. 

[https://www.patrickmin.com/binvox/](https://www.patrickmin.com/binvox/) (23.05.16 접근)

아래 사이트에서 운영체제에 맞는 실행파일을 다운로드하면 된다. 
해당 프로그램을 사용해서 논문을 작성한다면 아래 사이트와 관련 논문을 reference로 걸어주어야 한다.

![[그림0.png]]

​
우선, voxelization을 위해서는 CAD 데이터를 **.stl과 같은 메시 파일로 변환**해 주어야 한다. CAD로 설계한 데이터는 피처 기반으로 만들어지기 때문에 Voxelization을 바로 진행하기는 어렵기 때문이다. 

.stl, .obj 등의 메시 파일은 CAD 프로그램에서 쉽게 export 하여 만들 수 있다.

이후, **도스 창에 binvox stl 파일을 입력**해 주면 된다. 
명령어를 입력하면 자동으로 복셀화가 진행되며 binvox 파일이 생긴다. 

binvox 파일은 해당 프로그램의 저자인 Patrick Min이 고안한 파일 타입으로 binary 형태의 voxel 파일이다. 
같은 폴더 내에서는 그냥 stl 파일을 입력하면 되고, 다른 폴더의 파일을 변환하고 싶다면 폴더 경로가 포함된 stl 파일 경로를 적어주면 된다.
![[그림1 3.png]]

위와 같이 binvox 파일을 만들면 256x256x256의 볼륨이 형성되며, **한 볼륨의 크기는 stl 파일에서 가장 긴 변을 기준**으로 한다. 

즉, 가장 긴 변이 15 mm라면 256 복셀의 길이가 15 mm이므로, 한 복셀의 크기는 15/256 mm가 된다.

![[그림2 3.png]]

256이 아닌 **다른 값으로 전체 볼륨의 크기를 지정해 주기 위해서는 아래와 같이 -d 뒤에 원하는 크기를 입력**해 주면 된다. 
혹은 voxelization 과정에서 축을 회전하기 위해서 **-rotx, roty 등의 명령어를 입력**할 수도 있다.

```cmd  
binvox -rotx -d 64 ./cylinder.stl
```

변환해야 하는 stl 데이터가 많다면 커맨드에 한 줄 씩 입력하기가 번거롭다. 
이를 해결하기 위해 stl 파일 별로 binvox 파일이 실행될 수 있도록 아래와 같이 python 을 활용한 **매크로를 작성**해 보았다. 

아래 매크로에서는 stl 데이터가 있는 폴더 경로를 입력 받는다. 
입력 받은 폴더에 있는 모든 stl 데이터를 읽어서 (.stl), 하나씩 자동으로 커맨드에 binvox 명령어를 입력하여 실행한다.

```python  
import os 
py_path = os.getcwd() 

import glob 
import subprocess 
from subprocess import check_output 

def runbinvox(stl): 
    check_output("binvox.exe -rotx -d 64 " + stl, shell=True) 

if __name__ == "__main__": 
    for f in glob.glob('폴더위치/*.stl'): 
        print(f) 
        runbinvox(f) # binvox file saves in the forder where stl file is 
    pass
```


위의 방법을 활용하면 3차원 CAD 데이터를 voxelization 하여 배열 형태로 전처리하여, 인공지능 학습에서 사용할 수 있다. 

그러나, 기계공학에서 다루는 3차원 형상들은 위와 같은 전처리 과정을 거치더라도 복셀 형태로 표현하기 어려울 수 있다. 
형상이 너무 복잡하고, 살이 얇으면 전처리 후 배열을 확인했을 때 해당 형상이 무시 될 수 있기 때문이다. 
이를 해소하고자 배열의 크기를 키우면, 인공지능 모델 학습을 위해 필요한 컴퓨팅 자원이 크게 늘어나는 문제가 있다.
