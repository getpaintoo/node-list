// Обработчик события нажатия на кнопку "Добавить"
document.getElementById('add-button').addEventListener('click', function () {
    const textInput = document.getElementById('text-input').value;

    if (textInput.trim() !== "") {
        const notesContainer = document.getElementById('notes-container');
        const miniContainer = document.createElement('div');
        miniContainer.className = 'mini-container red-container'; // Добавляем класс для красного контейнера

        const checkmarkButton = document.createElement('button');
        checkmarkButton.className = 'checkmark-btn';

        const checkmark = document.createElement('img');
        checkmark.src = 'images/checkmark.svg';
        checkmark.alt = 'Галочка';
        checkmark.className = 'checkmark-icon';

        checkmarkButton.appendChild(checkmark);

        const textElement = document.createElement('span');
        textElement.textContent = textInput;

        // Обработчик для галочки (переключение зачёркивания текста и изменения цвета контейнера)
        checkmarkButton.addEventListener('click', function () {
            miniContainer.classList.toggle('green-container'); // Переключаем класс на зелёный фон
            miniContainer.classList.toggle('red-container'); // Убираем красный фон
            textElement.classList.toggle('strikethrough'); // Добавляем/убираем зачёркивание текста
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';

        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'images/icon.svg';
        deleteIcon.alt = 'Удалить';
        deleteIcon.style.width = '20px';
        deleteIcon.style.height = '20px';

        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener('click', function () {
            miniContainer.remove(); // Удаляем заметку из DOM
        });

        miniContainer.appendChild(checkmarkButton); // Вставляем кнопку галочки
        miniContainer.appendChild(textElement); // Вставляем текст
        miniContainer.appendChild(deleteButton); // Вставляем кнопку удаления

        notesContainer.appendChild(miniContainer); // Добавляем мини-контейнер в основной контейнер

        document.getElementById('text-input').value = ""; // Очищаем поле ввода
    }
});
