import { useEffect, useRef, useState } from 'react'
import LabSection from './LabSection'

// Узлы создаются и двигаются напрямую через DOM: React пересоздал бы их, а сценарию нужны те же самые узлы.
const template = `
<form class="demo-form lab-dom-form" id="lab-dom-form-a" data-testid="lab-dom-form-a">
  <h3>Форма А</h3>
  <div class="form-group lab-dom-field" data-testid="lab-dom-field">
    <label for="lab-dom-input">Перемещаемое поле</label>
    <input type="text" id="lab-dom-input" name="movable" />
  </div>
  <ul class="lab-dom-list" data-testid="lab-dom-list">
    <li>Пункт 1</li>
    <li>Пункт 2</li>
    <li>Пункт 3</li>
  </ul>
  <button type="submit" class="lab-btn">Отправить форму А</button>
</form>
<form class="demo-form lab-dom-form" id="lab-dom-form-b" data-testid="lab-dom-form-b">
  <h3>Форма Б</h3>
  <button type="submit" class="lab-btn">Отправить форму Б</button>
</form>
<p class="lab-status" data-testid="lab-dom-status">Операций ещё не было</p>
`;

function report(nodes, text) {
  nodes.operations += 1;
  nodes.status.textContent = `${nodes.operations}. ${text}`;
}

function insertBeforeSubmit(form, node) {
  form.insertBefore(node, form.querySelector('button[type="submit"]'));
}

function DomOperationsScenario() {
  const containerRef = useRef(null);
  const nodesRef = useRef(null);
  const [fieldRemoved, setFieldRemoved] = useState(false);
  const [wrapped, setWrapped] = useState(false);
  const [listRemoved, setListRemoved] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = template;
    const nodes = {
      formA: container.querySelector('#lab-dom-form-a'),
      formB: container.querySelector('#lab-dom-form-b'),
      field: container.querySelector('.lab-dom-field'),
      list: container.querySelector('.lab-dom-list'),
      status: container.querySelector('[data-testid="lab-dom-status"]'),
      wrapper: null,
      operations: 0,
    };
    nodesRef.current = nodes;

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const filled = Array.from(form.elements).filter((element) => element.name && element.value).length;
      report(nodes, `Отправлена ${form === nodes.formA ? 'форма А' : 'форма Б'}, заполнено полей: ${filled}`);
    };
    nodes.formA.addEventListener('submit', handleSubmit);
    nodes.formB.addEventListener('submit', handleSubmit);

    return () => {
      nodes.formA.removeEventListener('submit', handleSubmit);
      nodes.formB.removeEventListener('submit', handleSubmit);
      container.replaceChildren();
    };
  }, []);

  const movableUnit = (nodes) => nodes.wrapper ?? nodes.field;
  const otherForm = (nodes) => (movableUnit(nodes).closest('form') === nodes.formA ? nodes.formB : nodes.formA);

  const moveField = () => {
    const nodes = nodesRef.current;
    const target = otherForm(nodes);
    insertBeforeSubmit(target, movableUnit(nodes));
    report(nodes, `Поле перенесено в ${target === nodes.formA ? 'форму А' : 'форму Б'}`);
  };

  const moveFieldWithAttributes = () => {
    const nodes = nodesRef.current;
    const target = otherForm(nodes);
    const input = nodes.field.querySelector('input');
    nodes.field.classList.toggle('lab-dom-field--moved');
    nodes.field.dataset.moves = String(Number(nodes.field.dataset.moves || 0) + 1);
    input.placeholder = `Перенесено с новыми атрибутами: ${nodes.field.dataset.moves}`;
    insertBeforeSubmit(target, movableUnit(nodes));
    report(nodes, 'Поле перенесено с изменёнными атрибутами');
  };

  const removeField = () => {
    const nodes = nodesRef.current;
    movableUnit(nodes).remove();
    setFieldRemoved(true);
    report(nodes, 'Поле вынуто из документа');
  };

  const restoreField = () => {
    const nodes = nodesRef.current;
    insertBeforeSubmit(nodes.formA, movableUnit(nodes));
    setFieldRemoved(false);
    report(nodes, 'Тот же узел поля вставлен обратно в форму А — введите в него текст');
  };

  const replaceWithCopy = () => {
    const nodes = nodesRef.current;
    const copy = nodes.field.cloneNode(true);
    nodes.field.replaceWith(copy);
    nodes.field = copy;
    report(nodes, 'Поле заменено новым узлом с той же разметкой');
  };

  const toggleWrapper = () => {
    const nodes = nodesRef.current;
    if (nodes.wrapper) {
      nodes.wrapper.before(nodes.field);
      nodes.wrapper.remove();
      nodes.wrapper = null;
      setWrapped(false);
      report(nodes, 'Обёртка снята');
      return;
    }
    const wrapper = document.createElement('div');
    wrapper.className = 'lab-dom-wrapper';
    wrapper.dataset.testid = 'lab-dom-wrapper';
    nodes.field.before(wrapper);
    wrapper.append(nodes.field);
    nodes.wrapper = wrapper;
    setWrapped(true);
    report(nodes, 'Поле обёрнуто в новый блок: родитель создан позже ребёнка');
  };

  const reorderList = () => {
    const nodes = nodesRef.current;
    nodes.list.prepend(nodes.list.lastElementChild);
    report(nodes, 'Последний пункт списка перенесён в начало');
  };

  const toggleList = () => {
    const nodes = nodesRef.current;
    if (listRemoved) {
      insertBeforeSubmit(nodes.formA, nodes.list);
      setListRemoved(false);
      report(nodes, 'Список с пунктами вставлен обратно');
    } else {
      nodes.list.remove();
      setListRemoved(true);
      report(nodes, 'Список с пунктами удалён');
    }
  };

  return (
    <LabSection
      id="lab-dom"
      title="Сценарий: операции с DOM"
      hint="Введите текст в поле, затем по очереди: перенесите поле, перенесите с атрибутами, выньте и вставьте обратно (и снова введите текст), замените копией, оберните, переставьте и удалите список. После переносов отправьте обе формы."
    >
      <div className="lab-row">
        <button type="button" className="lab-btn" onClick={moveField} disabled={fieldRemoved}>
          Перенести поле в другую форму
        </button>
        <button type="button" className="lab-btn" onClick={moveFieldWithAttributes} disabled={fieldRemoved}>
          Перенести с новыми атрибутами
        </button>
        <button type="button" className="lab-btn" onClick={fieldRemoved ? restoreField : removeField}>
          {fieldRemoved ? 'Вставить поле обратно' : 'Вынуть поле'}
        </button>
        <button type="button" className="lab-btn" onClick={replaceWithCopy} disabled={fieldRemoved}>
          Заменить поле копией
        </button>
        <button type="button" className="lab-btn" onClick={toggleWrapper} disabled={fieldRemoved}>
          {wrapped ? 'Снять обёртку' : 'Обернуть поле в новый блок'}
        </button>
        <button type="button" className="lab-btn" onClick={reorderList} disabled={listRemoved}>
          Переставить пункты списка
        </button>
        <button type="button" className="lab-btn" onClick={toggleList}>
          {listRemoved ? 'Вернуть список' : 'Удалить список'}
        </button>
      </div>
      <div ref={containerRef} className="lab-dom" data-testid="lab-dom-container" />
    </LabSection>
  );
}

export default DomOperationsScenario;
