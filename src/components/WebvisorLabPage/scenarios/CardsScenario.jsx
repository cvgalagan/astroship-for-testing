import { useState } from 'react'
import LabSection from './LabSection'
import { productImage } from './labImages'

const products = [
  { id: 'p1', name: 'Платье из шёлка', price: '7 990 ₽', color: '#e8a0bf' },
  { id: 'p2', name: 'Льняная рубашка', price: '4 490 ₽', color: '#a0c4e8' },
  { id: 'p3', name: 'Шерстяной свитер', price: '6 290 ₽', color: '#c4e8a0' },
  { id: 'p4', name: 'Джинсы прямого кроя', price: '5 590 ₽', color: '#a0a8e8' },
  { id: 'p5', name: 'Кожаный ремень', price: '2 190 ₽', color: '#e8c4a0' },
  { id: 'p6', name: 'Хлопковая футболка', price: '1 490 ₽', color: '#e8e0a0' },
];

const faq = [
  { id: 'delivery', question: 'Сколько стоит доставка?', answer: 'Доставка бесплатна для заказов от 3 000 ₽.' },
  { id: 'return', question: 'Можно ли вернуть товар?', answer: 'Вернуть товар можно в течение 14 дней.' },
  { id: 'payment', question: 'Какие способы оплаты есть?', answer: 'Картой онлайн, при получении и через СБП.' },
];

function CardsScenario() {
  const [cart, setCart] = useState([]);
  const [openFaq, setOpenFaq] = useState([]);

  const toggle = (setter, id) =>
    setter((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));

  return (
    <LabSection
      id="lab-cards"
      title="Сценарий: повторяющиеся карточки и раскрывающиеся блоки"
      hint="Добавьте в корзину 2–3 разных товара, у одного нажмите кнопку повторно. Раскройте и закройте вопросы, откройте блок details."
    >
      <div className="product-grid" data-testid="lab-product-grid">
        {products.map((product) => {
          const inCart = cart.includes(product.id);
          return (
            <article className="product-card" key={product.id} data-product-id={product.id}>
              <img className="product-card__image" src={productImage(product.color)} alt={product.name} />
              <h3 className="product-card__title">{product.name}</h3>
              <p className="product-card__price">{product.price}</p>
              <button
                type="button"
                className={inCart ? 'btn product-card__buy product-card__buy--active' : 'btn product-card__buy'}
                aria-pressed={inCart}
                onClick={() => toggle(setCart, product.id)}
              >
                {inCart ? 'В корзине' : 'В корзину'}
              </button>
            </article>
          );
        })}
      </div>
      <p className="lab-status" data-testid="lab-cart-status">
        Товаров в корзине: {cart.length}
      </p>

      <div className="lab-faq" data-testid="lab-faq">
        {faq.map((item) => {
          const isOpen = openFaq.includes(item.id);
          return (
            <div className="lab-faq__item" key={item.id}>
              <button
                type="button"
                className="lab-faq__question"
                aria-expanded={isOpen}
                aria-controls={`lab-faq-${item.id}`}
                onClick={() => toggle(setOpenFaq, item.id)}
              >
                {item.question}
              </button>
              <div id={`lab-faq-${item.id}`} className="lab-faq__answer" hidden={!isOpen}>
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>

      <details className="lab-details">
        <summary>Подробнее о составе (details и summary)</summary>
        <p>Шёлк 100 %, подкладка — вискоза. Стирка при 30 °C.</p>
      </details>
    </LabSection>
  );
}

export default CardsScenario;
