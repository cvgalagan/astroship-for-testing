import InfiniteTimer from '../InfiniteTimer/InfiniteTimer'; // Импортируем компонент InfiniteTimer. Убедитесь, что путь верен.
import './GridPage.css'; // Импортируем стили для сетки. Убедитесь, что путь верен.

const GridPage = ({ timersCount }) => {
    const timers = Array.from({ length: timersCount }, (_, index) => <InfiniteTimer key={index} />);
  
    return (
      <div className="grid-container">
        {timers}
      </div>
    );
  };
  

export default GridPage;