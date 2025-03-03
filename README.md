# Astrio Test App

Тестовое задание для Astrio на **Nuxt 3** с управлением состоянием через **Pinia** и UI-компонентами от **Nuxt UI**.

## Установленные зависимости

- **Nuxt 3** `^3.15.4`
- **Pinia** `^3.0.1`
- **@pinia/nuxt** `^0.10.1`
- **@nuxt/ui** `^2.21.0`
- **Vue** `latest`
- **Vue Router** `latest`

## Установка и запуск

### 1. Установка зависимостей:

```sh
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 2. Запуск проекта в режиме разработки:

```sh
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### 3. Сборка для продакшена:

```sh
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### 4. Генерация статического проекта:

```sh
# npm
npm run generate

# pnpm
pnpm generate

# yarn
yarn generate

# bun
bun run generate
```

### 5. Локальное превью продакшен билда:

```sh
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

### 6. Функционал приложения

- Вывод списка товаров
- Добавление товара в корзину
- Возможность выбрать и добавить вариации товара
- Фильтрация по брендам
- Изменение кол-ва товара в корзине
- Удаление товара из корзины
- Информирование об удалении или добавлении товара
- Адаптив - 320px

### 7. Что можно добавить

- Хранение товаров корзины в localStorage или Cookies
- Сортировку товаров
- Фильтрацию не только по бренду
- Поиск товаров, пагинацию, разный вид множества товаров (грид, список)
