import { useEffect, useState } from "react";

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ latitude, longitude }) => {
    // Здесь мы могли бы сохранить весь объект position, но для
    // ясности давайте явно перечислим, какие свойства нас интересуют.
    setPosition({ latitude, longitude });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
      return;
    }

    // Подписываемся на изменение геопозиции браузера.
    let watcher = geo.watchPosition(onChange, onError);

    // В случае, если компонент будет удаляться с экрана
    // производим отписку от слежки, чтобы не засорять память.
    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, error };
}

export const useScaleResumePageShare = ({
  refDivResumeMain,
  constWidth = 624,
  currentResolution = [],
  drawing,
  loadContent,
  isPdf = false
}) => {
  const [scaleSize, setScaleSize] = useState(1);
  const [origin, setOrigin] = useState(0);
  const [originTop, setOriginTop] = useState(0);
  const isMob = ['md', 'sm', 'xs'].includes(currentResolution);

  function handleResize() {
    if (!isPdf)
      if (typeof window != "undefined")
        if (refDivResumeMain?.current) {
          let wid = refDivResumeMain.current.offsetWidth;
          let hed = refDivResumeMain.current.offsetHeight

          if (!isMob) {
            let wOr = refDivResumeMain.current.querySelector(".body-template-resume").offsetWidth;
            let wHr = refDivResumeMain.current.querySelector(".body-template-resume").offsetHeight;
            let sc = scaleSize;

            // если будет больше по ширине
            // if (wOr > wid) {
            //   let trW = ((wid * 100) / wOr) / 100;
            //   sc = trW;
            // }

            // проверяем влазит ли по высоте после уменшения по ширине, если не влезает то уменшаем чтобы влезло по высоте
            // let whS = (wHr * sc);

            // if (whS > hed) {
            //   console.log("height");
            //   let minH = whS - hed;
            //   let vic = sc - ((minH * 100) / hed / 100);
            //   sc = vic;
            // }

            if (wHr > hed) {
              let trH = ((hed * 100) / wHr) / 100;
              sc = trH;
            }

            setScaleSize(sc);
            // setOrigin((wid - (wOr * sc)) / 2);
            // setOriginTop((hed - (wHr * sc)) / 2);
          }

          if (isMob) {
            if ((window.innerWidth + 32) < 630) {
              let w = (((window.innerWidth - 32) * 100) / constWidth) / 100;

              setScaleSize(w);
            } else {
              setScaleSize(1);
            }

            setOrigin(0);
            setOriginTop(0);
          }
        }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [currentResolution, drawing, loadContent]);

  return { scaleSize, origin, originTop };
}

// resume main
export const useScaleResumeMain = ({
  refDivResumeMain,
  constWidth = 624,
  currentResolution = [],
  drawing,
  loadContent,
  befContent,
}) => {
  const [scaleSize, setScaleSize] = useState(0.915677);
  const [origin, setOrigin] = useState(0);
  const [originTop, setOriginTop] = useState(0);
  const isMob = ['md', 'sm', 'xs'].includes(currentResolution);

  function handleResize() {
    if (typeof window != "undefined")
      if (refDivResumeMain?.current) {
        let wid = refDivResumeMain.current.offsetWidth;
        let hed = refDivResumeMain.current.offsetHeight

        if (!isMob) {
          let wOr = refDivResumeMain.current.querySelector(".resume-main_scale").offsetWidth;
          let wHr = refDivResumeMain.current.querySelector(".resume-main_scale").offsetHeight;
          let sc = scaleSize;

          // если будет больше по ширине
          if (wOr > wid) {
            let trW = ((wid * 100) / wOr) / 100;
            sc = trW;
          }

          // проверяем влазит ли по высоте после уменшения по ширине, если не влезает то уменшаем чтобы влезло по высоте
          let whS = (wHr * sc);

          if (whS > hed) {
            let minH = whS - hed;
            let vic = sc - ((minH * 100) / hed / 100);
            sc = vic;
          }

          setScaleSize(sc.toFixed(1));
          setOrigin(Math.round(((wid - (wOr * sc)) / 2) / 10) * 10);
          // setOriginTop(Math.round(((hed - (wHr * sc)) / 2) / 10) * 10);
        }

        if (isMob) {
          let w = (((wid * 100) / constWidth) / 100);
          isMob && (w -= 0.002);

          if (wid >= 640) {
            setScaleSize(1);
          } else {
            setScaleSize(w);
          }

          setOrigin(0);
          setOriginTop(0);
        }
      }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [currentResolution, drawing, loadContent, befContent]);

  return { scaleSize, origin, originTop };
}