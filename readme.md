### Файлы .gitignore 
- [Node](https://github.com/iksergey/gitignore/blob/main/Node.gitignore)
- [Java](https://github.com/iksergey/gitignore/blob/main/Java.gitignore)

### Создание client-app 
- `npx create-react-app client --template typescript`

### Добавление Bootstrap
- [Bootstrap #quick-start](https://getbootstrap.com/docs/5.3/getting-started/introduction/#quick-start)

### Создание Java-проекта
- [Start spring](https://start.spring.io)

Потребуются следующие зависимости:
 - [Lombok](#)
 - [Rest Repositories](#)
 - [Spring Data JPA](#)
 - [MySQL Driver](#)

### Маршрутизация
- `npm i react-router-dom@5`
- `npm i @types/react-router-dom@5` | [url](https://www.npmjs.com/package/%40types/react-router-dom)

### Иконки при необходимости
- `npm i bootstrap-icons` | [url](https://icons.getbootstrap.com)

### Security Okta.com
Регистрация через [developer.okta.com](https://developer.okta.com)
- `npm i @okta/okta-signin-widget@6.3.3`
- `npm install @okta/okta-react@6.4.3`
* Отказывался работать с последними версиями

### Добавление Okta в Java-проект
```
<dependency>
    <groupId>com.okta.spring</groupId>
    <artifactId>okta-spring-boot-starter</artifactId>
    <version>3.0.4</version>
</dependency>

```
- Дополнительная информация [url](https://mvnrepository.com/artifact/com.okta.spring/okta-spring-boot-starter/3.0.4)

### Ошибка при выходе
- https://github.com/okta/okta-auth-js/issues/575
