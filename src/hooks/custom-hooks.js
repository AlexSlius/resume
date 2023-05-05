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

export const useScaleResumePageShare = (constWidth = 628) => {
  const [scaleSize, setScaleSize] = useState(1);

  useEffect(() => {
    function handleResize() {
      if ((window.innerWidth + 32) < 630) {
        setScaleSize(((window.innerWidth * 100) / constWidth) / 100);
      } else {
        setScaleSize(1);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scaleSize;
}

export const useScaleResumeMain = ({
  refDivResumeMain,
  constWidth = 624,
}) => {
  const [scaleSize, setScaleSize] = useState(1);

  useEffect(() => {
    function handleResize() {
      let wid = refDivResumeMain?.current?.offsetWidth;

      if (wid) {
        if (wid >= 640) {
          setScaleSize(1);
        } else {
          setScaleSize(((wid * 100) / constWidth) / 100);
        }
      } else {
        setScaleSize(1);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scaleSize;
}