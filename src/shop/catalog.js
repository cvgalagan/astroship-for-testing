// Статический каталог тестового магазина.
// Локальные данные вместо внешнего API — стенд не должен зависеть от чужого аптайма.

export const CATEGORIES = [
  { id: 'audio', title: 'Аудио' },
  { id: 'photo', title: 'Фото и видео' },
  { id: 'smart', title: 'Умный дом' }
]

export const PRODUCTS = [
  {
    id: 'headphones-pro',
    title: 'Наушники Aurora Pro',
    category: 'audio',
    price: 24990,
    oldPrice: 29990,
    rating: 4.8,
    inStock: true,
    description: 'Полноразмерные наушники с активным шумоподавлением и автономностью до 40 часов.',
    specs: [['Тип', 'Полноразмерные'], ['Шумоподавление', 'Активное'], ['Автономность', '40 ч']]
  },
  {
    id: 'earbuds-mini',
    title: 'TWS-наушники Nimbus Mini',
    category: 'audio',
    price: 8490,
    oldPrice: 10990,
    rating: 4.4,
    inStock: true,
    description: 'Компактные беспроводные наушники с зарядным кейсом и защитой IPX5.',
    specs: [['Тип', 'Вкладыши'], ['Защита', 'IPX5'], ['Автономность', '24 ч']]
  },
  {
    id: 'speaker-lumen',
    title: 'Портативная колонка Lumen 300',
    category: 'audio',
    price: 12490,
    oldPrice: null,
    rating: 4.6,
    inStock: true,
    description: 'Стереоколонка мощностью 30 Вт с подсветкой и влагозащитой.',
    specs: [['Мощность', '30 Вт'], ['Защита', 'IP67'], ['Автономность', '18 ч']]
  },
  {
    id: 'turntable-vinyl',
    title: 'Проигрыватель винила Retro One',
    category: 'audio',
    price: 34990,
    oldPrice: 39990,
    rating: 4.9,
    inStock: false,
    description: 'Ременный привод, встроенный фонокорректор, поддержка Bluetooth-передачи.',
    specs: [['Привод', 'Ременный'], ['Скорости', '33/45'], ['Bluetooth', 'Есть']]
  },
  {
    id: 'camera-atlas',
    title: 'Беззеркальная камера Atlas M2',
    category: 'photo',
    price: 129990,
    oldPrice: 144990,
    rating: 4.7,
    inStock: true,
    description: 'Полнокадровая камера 33 Мп с 5-осевой стабилизацией и видео 4K/60.',
    specs: [['Матрица', '33 Мп'], ['Видео', '4K/60'], ['Стабилизация', '5 осей']]
  },
  {
    id: 'lens-50mm',
    title: 'Объектив 50mm f/1.4',
    category: 'photo',
    price: 47990,
    oldPrice: null,
    rating: 4.8,
    inStock: true,
    description: 'Светосильный портретный объектив с бесшумным автофокусом.',
    specs: [['Фокусное', '50 мм'], ['Диафрагма', 'f/1.4'], ['Байонет', 'Universal E']]
  },
  {
    id: 'tripod-carbon',
    title: 'Карбоновый штатив Vertex 3',
    category: 'photo',
    price: 18990,
    oldPrice: 21990,
    rating: 4.5,
    inStock: true,
    description: 'Лёгкий штатив из карбона с шаровой головой и нагрузкой до 12 кг.',
    specs: [['Материал', 'Карбон'], ['Нагрузка', '12 кг'], ['Вес', '1,4 кг']]
  },
  {
    id: 'gimbal-steady',
    title: 'Стабилизатор Steady Arm',
    category: 'photo',
    price: 26490,
    oldPrice: null,
    rating: 4.3,
    inStock: true,
    description: 'Трёхосевой стабилизатор для камер и смартфонов с режимом таймлапса.',
    specs: [['Оси', '3'], ['Нагрузка', '3 кг'], ['Автономность', '12 ч']]
  },
  {
    id: 'hub-nova',
    title: 'Центр умного дома Nova Hub',
    category: 'smart',
    price: 9990,
    oldPrice: 11990,
    rating: 4.2,
    inStock: true,
    description: 'Хаб с поддержкой Zigbee и Matter, управляет 128 устройствами.',
    specs: [['Протоколы', 'Zigbee, Matter'], ['Устройств', 'до 128'], ['Питание', 'USB-C']]
  },
  {
    id: 'lamp-halo',
    title: 'Умная лампа Halo RGB',
    category: 'smart',
    price: 2490,
    oldPrice: 3190,
    rating: 4.1,
    inStock: true,
    description: 'Лампа с 16 млн оттенков, сценариями и голосовым управлением.',
    specs: [['Цоколь', 'E27'], ['Яркость', '1200 лм'], ['Сценарии', 'Есть']]
  },
  {
    id: 'sensor-guard',
    title: 'Датчик протечки Guard Water',
    category: 'smart',
    price: 1690,
    oldPrice: null,
    rating: 4.6,
    inStock: true,
    description: 'Автономный датчик протечки с сиреной и уведомлениями в приложение.',
    specs: [['Питание', 'CR2032'], ['Сирена', '80 дБ'], ['Связь', 'Zigbee']]
  },
  {
    id: 'thermostat-clima',
    title: 'Термостат Clima Touch',
    category: 'smart',
    price: 14990,
    oldPrice: 16990,
    rating: 4.4,
    inStock: true,
    description: 'Программируемый термостат с сенсорным экраном и недельными сценариями.',
    specs: [['Экран', 'Сенсорный'], ['Сценарии', 'Недельные'], ['Связь', 'Wi-Fi']]
  }
]

// Небольшие товары для блоков допродажи на корзине, чекауте и оплате
export const UPSELL_IDS = ['lamp-halo', 'sensor-guard', 'earbuds-mini']

export const getProduct = (id) => PRODUCTS.find((product) => product.id === id)

export const getProductImage = (id, width = 400, height = 300) =>
  `https://picsum.photos/seed/${id}/${width}/${height}`
