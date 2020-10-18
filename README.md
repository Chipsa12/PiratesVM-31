PiratesVM-31

Мини описание. Позже рбудет расписано подробнее.

Есть кораблик, на кораблике есть задания. [Поднять/опустить паруса, вычерпать воду, помыть пол, крутануть штурвал и т.д.]. Время на выполнения каждого задания ограничено. И допустим если команда лажает с n числом заданий корабль тонет.
Соответственно задача игроков проплыть на корабле как можно дольше.



Более детальное описание:

Игровой процесс: 
  Каждому игроку выдается задание. 
  Время на выполнение задания ограничено (у разных заданий может быть по разному). 
  Если игрок не успел выполнить задание или не смог выполнить команде дается -ОЧКО.
  Если задание выполнено игроку выдается следующее задание. (Можно вести подчет выполненных заданий у каждого игрока, чтобы выяснить кто батя)
  Со времением время на выполнение заданий уменьшается, чтобы игра не стала бесколнечной.

  Игра (раунд) заканчиватся, если команда набрала N -ОЧКОВ.
  По окончанию раунда показыватся сколько корабль проплыл. (Можно вести рейтинг команд. Кто дальше/дольше проплыл)
  

Игрок (пират): 
    Имеет имя (логин);
    Может перемещаться по x y;
    Может взаимодействовать с другими предметами и выполнять задания;
   (Доп.) Имеет стамину, настроение, которые тратятся при выполнении заданий и повышаются за счет распития рома и сна.

Задания: (точки выполнения заданий обозначаются координатами x y)
    1. Поднять/опустить паруса:
      (Мин.) Задание выполняется если игрок находится рядом с парусом и нажимает/зажимает кнопку "взаимодействия".
      (Доп) Появляется дополнительное окно, где нужно что-либо сделать.
    2. Вычерпать воду:
    3. Заделать пробоину:
    4. Помять палубу:
    5. Почистить картошку:
    6. Зашить парус:
    
    
ДОПОЛНИТЕЛЬНЫЕ ФИШЕЧКИ:
* Можно прыгнуть с доски)))
* Можно ввести случайные ивенты, влияющие на скорость игроков, обзор и прочее.
* Коллизия у игроков)

P.S. Чтобы не заморачиться с моделями окружения можно использовать 2d спрайты, которые "поворачиваются" к игроку. 






───────────────▌
─────────▄▄▄▄▄██▄▄▄▄▄───────▌
─────────░░░░░░░░░░░░─────▄▄█▄▄
─────────░░░░░░░░░░░░─────░░░░░
─────────░░░░░░░░░░░░────▄▄▄█▄▄▄
─────────░░░░░░░░░░░░────░░░░░░░
───────▄▄▄▄▄▄▄██▄▄▄▄▄▄▄──░░░░░░░
───────░░░░▄░░░░░░▄░░░░─▄▄▄▄█▄▄▄▄
───────░░░░░▄▀▀▀▀▄░░░░░─░░░░░░░░░
───────░░░░░▌▀░░▀▐░░░░░─░░░░░░░░░
───────░░░░▄░▀▄▄▀░▄░░░░─░░░░░░░░░
───────░░░░░░░░░░░░░░░░─░░░░░░░░░────▄███▀
▀████▄▄───────██────────────█─────▄███▀
───▀▀██████▄██████▄─▄▄─▄▄─▄███▄▄████▀
──────▀███▀█▀█▀█▀█▀████████████████▀
───────▀██████████████████████████▀
╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦
╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦
╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦╩╦

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
