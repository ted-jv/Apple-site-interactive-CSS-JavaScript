(() => {
  let pageScrollY = 0; // 복습 ! ( 이런 식으로 블록 내에 let으로 초기화 안 해두면 다른 곳에서 이 변수 불러올 때 undefined 에러 뜬다. 리액트 떠올려봐라 )
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
    console.info(sceneInfo);
  }

  //   let pageScrollY = 0; // 복습 ! ( 이런 식으로 블록 내에 let으로 초기화 안 해두면 다른 곳에서 이 변수 불러올 때 undefined 에러 뜬다. 리액트 떠올려봐라 )
  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (pageScrollY > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    }

    if (pageScrollY < prevScrollHeight) {
      if (currentScene === 0) return; // 사파리의 경우 처음 화면에서 키보드로 아래 눌렀다가 위로 올리면 -1이 된다고함 미리 예방.
      currentScene--;
    }
    console.info(currentScene);
  }

  window.addEventListener('resize', setLayout); // 복습 !
  window.addEventListener('scroll', () => {
    pageScrollY = window.scrollY; // 복습 ! 맨 위에 let pageScrollY = 0; 으로 초기화 하였어도 그 보다 더 작은 블록에서 값을 할당 시켜준다면  작은 블록의 할당된 값을 따른다 !
    console.info(pageScrollY);
    scrollLoop();
  });

  setLayout();
})();
