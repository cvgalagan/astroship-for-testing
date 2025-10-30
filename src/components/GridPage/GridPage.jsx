import InfiniteTimer from '../InfiniteTimer/InfiniteTimer'; // Импортируем компонент InfiniteTimer. Убедитесь, что путь верен.
import './GridPage.css'; // Импортируем стили для сетки. Убедитесь, что путь верен.

const GridPage = ({ timersCount, isTimersEnabled }) => {
    const timers = Array.from({ length: timersCount }, (_, index) => <InfiniteTimer key={index} isEnabled={isTimersEnabled} className="counter" />);

    return (
      <div className="grid-container">
        {timers}
      </div>
    );
  };


export default GridPage;
