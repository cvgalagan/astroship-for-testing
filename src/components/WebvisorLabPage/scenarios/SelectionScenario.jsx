import LabSection from './LabSection'

function SelectionScenario() {
  return (
    <LabSection
      id="lab-selection"
      title="Сценарий: выделение"
      hint="Выделите мышью часть абзаца так, чтобы выделение захватило жирный текст и ссылку. Затем выделите часть текста в каждом поле. Кликните в пустое место, чтобы снять выделение."
    >
      <p className="lab-selectable" data-testid="lab-selectable">
        Вебвизор записывает выделение текста страницы: начало и конец выделения могут лежать в{' '}
        <strong>разных узлах</strong>, например в обычном тексте и в{' '}
        <a href="#lab-selection">ссылке внутри абзаца</a>. Выделение внутри одного узла даёт одинаковые начало
        и конец, а <em>курсив в конце абзаца</em> — ещё один отдельный узел.
      </p>
      <div className="form-group">
        <label htmlFor="lab-select-text">Поле type=text — выделение записывается</label>
        <input
          type="text"
          id="lab-select-text"
          name="selectText"
          defaultValue="Выделите часть этого текста внутри поля"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lab-select-search">Поле type=search — выделение записывается</label>
        <input type="search" id="lab-select-search" name="selectSearch" defaultValue="платье из шёлка" />
      </div>
      <div className="form-group">
        <label htmlFor="lab-select-textarea">Textarea — выделение тоже записывается</label>
        <textarea
          id="lab-select-textarea"
          name="selectTextarea"
          rows="3"
          defaultValue="Выделите часть текста внутри textarea: рекордер записывает и его."
        />
      </div>
    </LabSection>
  );
}

export default SelectionScenario;
