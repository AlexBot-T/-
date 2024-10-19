const settings = {
    apiUrl: 'https://1103.api.green-api.com',
    idInstance: null,
    apiTokenInstance: null,
    phoneNumber: null,
    phoneNumberFile: null,
    message: null,
    file: null,
    fileName: "horse.png"
};

// Функция для обновления настроек из HTML
function updateSettings() {
    settings.idInstance = document.getElementById('idInstance').value;
    settings.apiTokenInstance = document.getElementById('apiTokenInstance').value;
    settings.phoneNumber = document.getElementById('phoneNumber')?.value || settings.phoneNumber;
    settings.phoneNumberFile = document.getElementById('phoneNumberFile')?.value || settings.phoneNumberFile;
    settings.message = document.getElementById('message')?.value || settings.message;
    settings.file = document.getElementById('file')?.value || settings.file;
}

// Функция для обработки ответа
function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Функция для отображения данных на странице
function displayResult(data) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = JSON.stringify(data, null, 2); 
}

// Функция для выполнения GET-запросов
function fetchGet(url) {
    fetch(url)
        .then(handleResponse)
        .then(displayResult)
        .catch(error => console.error('Ошибка при выполнении GET-запроса:', error));
}

// Функция для выполнения POST-запросов
function fetchPost(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(handleResponse)
    .then(displayResult)
    .catch(error => console.error('Ошибка при выполнении POST-запроса:', error));
}

// Функция запроса настроек инстанса
function getSettings() {
    updateSettings();
    const url = `${settings.apiUrl}/waInstance${settings.idInstance}/getSettings/${settings.apiTokenInstance}`;
    fetchGet(url);
}

// Функция запроса состояния инстанса
function getStateInstance() {
    updateSettings();
    const url = `${settings.apiUrl}/waInstance${settings.idInstance}/getStateInstance/${settings.apiTokenInstance}`;
    fetchGet(url);
}

// Функция отправки сообщения
function sendMessage() {
    updateSettings();
    const url = `${settings.apiUrl}/waInstance${settings.idInstance}/SendMessage/${settings.apiTokenInstance}`;
    const data = {
        chatId: settings.phoneNumber + '@c.us',
        message: settings.message
    };
    fetchPost(url, data);
}

// Функция отправки медиа данных
function sendFileByUrl() {
    updateSettings();
    const url = `${settings.apiUrl}/waInstance${settings.idInstance}/sendFileByUrl/${settings.apiTokenInstance}`;
    const data = {
        chatId: settings.phoneNumberFile + '@c.us',
        urlFile: settings.file,
        fileName: settings.fileName,
    };
    fetchPost(url, data);
}