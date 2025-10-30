import { useState, useEffect } from 'react';

const InfiniteTimer = ({ isEnabled, className }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timerId = null;
    if (isEnabled) {
      timerId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    // Очистка таймера при размонтировании компонента
    return () => clearInterval(timerId);
  }, [isEnabled]);

  return (
    <div className={className}>
      <p>Счетчик: {count}</p>
    </div>
  );
};

export default InfiniteTimer;
