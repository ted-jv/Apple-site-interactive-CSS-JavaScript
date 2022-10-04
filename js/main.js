(() => {
  let yOffset = 0; // 복습 ! ( 이런 식으로 블록 내에 let으로 초기화 안 해두면 다른 곳에서 이 변수 불러올 때 undefined 에러 뜬다. 리액트 떠올려봐라 )
  let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 씬
  const sceneInfo = [
    {
      //0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0, // 이런 식으로 변하는 변수는 항상 0으로 세팅 ( 숫자일 경우)
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'), // .main-message.a 이 부분 원래는 .main-message .a 이렇게 썼으나 붙히는 게 맞다.
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      //1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      //2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      //3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // 복습 !
    }
    // console.info(sceneInfo);

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        // console.info(currentScene);
        break;
      }
    }
    // console.info(currentScene);

    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    rv = scrollRatio * (values[1] - values[0]) + values[0];
    // console.info(rv);
    return rv;
  }

  //   console.info(currentYOffset);

  function playAnimaition() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
        // console.info(messageA_opacity_in);
        objs.messageA.style.opacity = messageA_opacity_in;
        // console.info(calcValues(values.messageA_opacity, currentYOffset));
        break;

      case 1:
        console.info('2 play !!');
        break;

      case 2:
        console.info('3 play !!');
        break;

      case 3:
        console.info('4 play !!');
        break;
    }
  }

  //   let yOffset = 0; // 복습 ! ( 이런 식으로 블록 내에 let으로 초기화 안 해두면 다른 곳에서 이 변수 불러올 때 undefined 에러 뜬다. 리액트 떠올려봐라 )
  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 사파리의 경우 처음 화면에서 키보드로 아래 눌렀다가 위로 올리면 -1이 된다고함 미리 예방.
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    // console.info(currentScene);
    playAnimaition();
  }

  window.addEventListener('load', setLayout); // 복습 !
  window.addEventListener('resize', setLayout); // 복습 !
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset; // 복습 ! 맨 위에 let yOffset = 0; 으로 초기화 하였어도 그 보다 더 작은 블록에서 값을 할당 시켜준다면  작은 블록의 할당된 값을 따른다 !
    // console.info(yOffset);
    scrollLoop();
  });
  //   setLayout();
})();
