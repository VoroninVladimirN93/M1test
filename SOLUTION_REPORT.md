# Что выполнено

В целом постарался избавиться от ререндеров, но сильно переусложнил основной компонент, но об этом в выводах и предложениях.
Мог что то упустить из выполненого, т.к. в какой-то момент перестал вести беклог.
Максимально старался покрыть сделанное комментариями в самом коде.
 
- Компонент Button: добавлена типизация и мемоизация компонента
- Компонент ListItem: добавлена типизация и мемоизация компонента, вынесен Link отдельно. 
В целом проблема должна была решиться отменой всплытия через stopPropagation, но не вышло =)
- Добавлен компонент Pagination: компонент для разбития массива отображаемых данных группой по 20 элементов на странице
при переходе на номерную страницу добавляет query запрос в адресную строку
- Компонент ListPage: добавлена мемоизация компонента. 
Улучшения инпута для поиска и сортировки. В инпут нельзя ввести буквы или символы. Только цифры. 
При попытке вводе ошибочных данных - сообщение рядом с инпутом. Информирование в самом инпуте о максимальном значении id. 
Выше максимального значение число ввести нельзя.
- Компонент SinglePage: добавлена типизация компонента.
Добавлены варианты ответов{return} компонента, при отсутствии данных ( начальное состояние, когда state пустой и запрос еще не выполнился )
В запросе читаем status и на его основе устанавливаем ошибку. При ошибке возвращаем визуально другой ответ.
Обработаны ошибки 403 и 404 под задание. Если Back отдает нам какой - то дополнительный ответ в виде поля message, можно использовать его.
- Компонент useData: добавлена типизация и сравнение данных при повторном запросе
Добавлен сброс таймера, для избавления от переполнения памяти
 Компонент useSort: добавлено создание копии массива для ускорения сортировки


# Что можно улучшить

- Улучшить визуальную часть: Не работал над визуалом, т.к. посчитал более важным решить проблемы оптимизации
- Избавиться от then чейнинга в компонентах. переписать на try-catch . Более "чистый" подход
- Избавиться от ререндера карточек при фильтрации. не уверен возможно ли это, но думаю карточки, данные который уже существуют на текущей странице можно постараться не ререндерить
в данный момент при фильтрации обновляется содержимое карточек. В целом можно попробовать завернуть отдельно компонент <Link> в memo
- Разобраться и найти более оптимальный способ "разворота" массива, т.к. при смене типа сортировки (восходящая, либо нисходящая) из за большого количества данный в массиве тратится много времени. upd*: нашел способ с созданием копии массива
- Перенос сортировки в query запрос. При перезагрузке страницы слетает фильтр. Увидел уже когда писал отчет =)
- Добавить состояние для загрузки данных в useData -> isLoading и на его основе выводить сообщение о загрузке. 
При ошибке, если например у нас в массиве отсутствует 1337 элемент и результат фильтрации вернет пустой массив,
вывести "Результатов нет" . Сейчас при пустом массивы выводится "Загрузка..."
-Вынести состояния в кастомные хуки, что бы сделать компонент чище
