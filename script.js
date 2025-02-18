document.getElementById('uploadBtn').addEventListener('click', function () {
    const files = document.getElementById('fileInput').files;
    if (files.length === 0) {
        alert('Wybierz plik do przesłania.');
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    const xhr = new XMLHttpRequest();
    // Zamień "TWOJ_SERWER" na IP lub nazwę DNS Twojego serwera FTP
    xhr.open('POST', 'http://TWOJ_SERWER/upload', true);

    xhr.upload.onprogress = function (event) {
        const percent = (event.loaded / event.total) * 100;
        document.getElementById('progressBar').style.width = percent + '%';
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById('uploadStatus').textContent = 'Przesyłanie zakończone!';
            fetchFileList();
        } else {
            document.getElementById('uploadStatus').textContent = 'Błąd podczas przesyłania.';
        }
    };

    xhr.send(formData);
});

function fetchFileList() {
    const xhr = new XMLHttpRequest();
    // Zamień "TWOJ_SERWER" na IP lub nazwę DNS Twojego serwera FTP
    xhr.open('GET', 'http://TWOJ_SERWER/files', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const files = JSON.parse(xhr.responseText);
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';
            files.forEach(file => {
                const li = document.createElement('li');
                li.textContent = file;

                const downloadBtn = document.createElement('button');
                downloadBtn.textContent = 'Pobierz';
                // Zamień "TWOJ_SERWER" na IP lub nazwę DNS Twojego serwera FTP
                downloadBtn.addEventListener('click', function () {
                    window.location.href = 'http://TWOJ_SERWER/download/' + file;
                });

                li.appendChild(downloadBtn);
                fileList.appendChild(li);
            });
        }
    };
    xhr.send();
}

// Pobranie listy plików przy załadowaniu strony
window.onload = fetchFileList;
