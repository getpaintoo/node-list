// Функция для сохранения заметок в Local Storage
function saveNotes() {
    const notesContainer = document.getElementById('notes-container');
    const notes = [];

    notesContainer.querySelectorAll('.mini-container').forEach(miniContainer => {
        const text = miniContainer.querySelector('span').textContent;
        const isStrikethrough = miniContainer.querySelector('span').classList.contains('strikethrough');
        const isGreen = miniContainer.classList.contains('green-container');

        notes.push({ text, isStrikethrough, isGreen });
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

// Функция для загрузки заметок из Local Storage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNote(note.text, note.isStrikethrough, note.isGreen);
    });
}

// Функция для добавления новой заметки
function addNote(textInput, isStrikethrough = false, isGreen = false) {
    const notesContainer = document.getElementById('notes-container');
    const miniContainer = document.createElement('div');
    miniContainer.className = `mini-container ${isGreen ? 'green-container' : 'red-container'}`; 

    const checkmarkButton = document.createElement('button');
    checkmarkButton.className = 'checkmark-btn';

    const checkmark = document.createElement('img');
    checkmark.src = 'images/checkmark.svg';
    checkmark.alt = 'Галочка';
    checkmark.className = 'checkmark-icon';

    checkmarkButton.appendChild(checkmark);

    const textElement = document.createElement('span');
    textElement.textContent = textInput;
    if (isStrikethrough) {
        textElement.classList.add('strikethrough');
    }

    // Обработчик для галочки (переключение зачёркивания текста и изменения цвета контейнера)
    checkmarkButton.addEventListener('click', function () {
        miniContainer.classList.toggle('green-container'); 
        miniContainer.classList.toggle('red-container'); 
        textElement.classList.toggle('strikethrough'); 
        saveNotes(); // Сохраняем изменения в Local Storage
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
        miniContainer.remove(); 
        saveNotes(); // Сохраняем изменения в Local Storage
    });

    miniContainer.appendChild(checkmarkButton);
    miniContainer.appendChild(textElement);
    miniContainer.appendChild(deleteButton);

    notesContainer.appendChild(miniContainer);
}

// Обработчик события нажатия на кнопку "Добавить"
document.getElementById('add-button').addEventListener('click', function () {
    const textInput = document.getElementById('text-input').value;

    if (textInput.trim() !== "") {
        addNote(textInput);
        saveNotes(); // Сохраняем заметки в Local Storage
        document.getElementById('text-input').value = ""; // Очищаем поле ввода
    }
});

// Загружаем заметки из Local Storage при загрузке страницы
window.addEventListener('load', loadNotes);
