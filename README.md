# V Vinstory Club

Каталог кроссовок на Next.js 14 (App Router) с клиентским Supabase и интеграцией Telegram Mini App.

## Технологии
- Next.js 14, TypeScript
- TailwindCSS + минимальные компоненты в стиле shadcn/ui (Dialog/Sheet/Input/Badge/Button)
- Supabase JS v2 (client-side, anon key)
- ESLint + Prettier

## Переменные окружения
Создайте `.env.local` (в корне) и заполните:

```
NEXT_PUBLIC_SUPABASE_URL=<https://...supabase.co>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon>
NEXT_PUBLIC_TELEGRAM_CONTACT=https://t.me/danissimmooo04
```

## Запуск
1. npm i
2. создать `.env.local` с 3 переменными (см. выше)
3. npm run dev
4. открыть http://localhost:3000

## Supabase
SQL схема (также в `supabase.sql`):

```
create table if not exists public.vinstory (
  id bigserial primary key,
  created_at timestamp with time zone default now(),
  brand text not null,
  model text not null,
  gender text,
  size_eu numeric,
  price numeric,
  cover text,
  photos text,
  description text
);
```

- Для фотографий используйте Storage с публичным bucket `sneakers`.
- Формат публичного URL: `https://<proj>.supabase.co/storage/v1/object/public/sneakers/IMG_1234.jpeg`.
- Приложение читает таблицу клиентом (anon key), запрос: `select * from vinstory order by id desc;`.
- Поле `photos` — строка с URL, разделёнными запятыми или `;`.
- Если `cover` пустой — берётся первая ссылка из `photos`.

## UI/поведение
- Премиальная светлая тема через CSS variables (см. `src/styles/theme.css`).
- Липкий header «V Vinstory Club».
- Поиск (debounced 250мс) по `brand, model, description` (без регистра).
- Чипсы брендов: All / Adidas / Nike / Puma / Mizuno / Vans / Converse / Saucony / Asics / Reebok.
- Кнопки «Фильтры» (нижний Sheet) и «Сортировка» (меню: Цена ↑/↓, Новизна).
- Сетка карточек: 2 колонки на мобилке; карточка кликабельна целиком; кнопка «Написать» не открывает модалку.
- Модалка: блокировка скролла фона, галерея с превью и белым фоном, кнопки снизу: цена и «Написать в Telegram».
- Скелетоны при загрузке, пустое состояние «Пока нет товаров по фильтрам».
- Локальный кэш в состоянии хука `useCatalog`.
- Нормализация:
  - gender: `m|мужские → Мужские`, `w|женские → Женские`, иначе «Унисекс»
  - photos: split по `,` или `;`, trim, пустые игнорируются
  - bucket размеров: `|size_eu - N| <= 0.5`

## Telegram Mini App
- Скрипт подключается через `telegram-web-app.js`. Если приложение открыто в Telegram, выполняется `WebApp.ready()` и `WebApp.expand()`.
- Приложение также работает в обычном браузере.

### Как завести Mini App (BotFather)
1. Создайте бота через `@BotFather` в Telegram.
2. Установите домен хостинга мини-аппа: команда `setdomain` → укажите домен вашего деплоя (например Vercel).
3. Добавьте Web App кнопку: `setmenubutton` → выбрать бота → тип `Web App` → вставьте URL вашего деплоя.
4. Опционально настройте `setdescription`, `setname`, иконку, короткое имя.
5. В коде ничего менять не требуется — приложение само инициализируется при открытии в Telegram.

Если нужно, могу помочь создать и настроить мини-апп под ваш домен и бота.