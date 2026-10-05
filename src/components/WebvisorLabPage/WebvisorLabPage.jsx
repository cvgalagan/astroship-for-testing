import '../FormsPage/FormsPage.css'
import './WebvisorLabPage.css'
import ControlsScenario from './scenarios/ControlsScenario'
import PrivacyScenario from './scenarios/PrivacyScenario'
import SelectionScenario from './scenarios/SelectionScenario'
import CardsScenario from './scenarios/CardsScenario'
import ReactionScenario from './scenarios/ReactionScenario'
import DomOperationsScenario from './scenarios/DomOperationsScenario'
import TitleScenario from './scenarios/TitleScenario'
import IframeScenario from './scenarios/IframeScenario'
import WidgetsScenario from './scenarios/WidgetsScenario'

const labScenarios = [
  { id: 'lab-controls', title: 'Поля и клики' },
  { id: 'lab-privacy', title: 'Приватность' },
  { id: 'lab-selection', title: 'Выделение' },
  { id: 'lab-cards', title: 'Повторяющиеся карточки и раскрывающиеся блоки' },
  { id: 'lab-reaction', title: 'Реакция страницы' },
  { id: 'lab-dom', title: 'Операции с DOM' },
  { id: 'lab-title', title: 'Заголовки страницы' },
  { id: 'lab-iframe', title: 'iframe' },
  { id: 'lab-widgets', title: 'Нестандартные элементы' },
];

// Сценарии для записей Вебвизора, по которым готовятся эталоны трейса.
function WebvisorLabPage() {
  return (
    <div className="forms-page lab-page">
      <h1>Сценарии для записей Вебвизора</h1>
      <p className="lab-intro">Каждый блок — отдельный сценарий. В одну запись лучше брать один-два сценария.</p>
      <nav className="lab-toc" aria-label="Сценарии">
        <ol>
          {labScenarios.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ol>
      </nav>
      <ControlsScenario />
      <PrivacyScenario />
      <SelectionScenario />
      <CardsScenario />
      <ReactionScenario />
      <DomOperationsScenario />
      <TitleScenario />
      <IframeScenario />
      <WidgetsScenario />
    </div>
  );
}

export default WebvisorLabPage;
