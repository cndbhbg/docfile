const token = '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';  // Thay YOUR_TOKEN bằng token của bạn

// Hàm để đọc file ev.txt
async function readLocalFile() {
    const response = await fetch('ev.txt');  // Đọc file từ cùng thư mục
    if (response.ok) {
        const content = await response.text();  // Đọc nội dung file
        document.getElementById('fileContent').value = content;  // Hiển thị nội dung trong textarea
    } else {
        alert('Không thể đọc file: ' + response.statusText);
    }
}

// Sửa hàm đọc file để gọi readLocalFile
async function readFile() {
    await readLocalFile();  // Gọi hàm đọc file cục bộ
}

// Hàm ghi file lên GitHub
async function writeFile() {
    const filePath = document.getElementById('filePath').value;  // Đường dẫn file trên GitHub
    const content = document.getElementById('fileContent').value;  // Nội dung từ textarea
    const encodedContent = btoa(content);  // Mã hóa nội dung sang Base64

    const response = await fetch(`https://api.github.com/repos/cndbhbg/docfile/contents/${filePath}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Ghi nội dung mới',
            content: encodedContent,
            branch: 'main'  // Chọn nhánh phù hợp
        })
    });

    if (response.ok) {
        alert('Ghi file thành công!');
    } else {
        alert('Không thể ghi file: ' + response.statusText);
    }
}

// Hàm xóa file trên GitHub
async function deleteFile() {
    const filePath = document.getElementById('filePath').value;  // Đường dẫn file trên GitHub

    // Lấy SHA của file
    const response = await fetch(`https://api.github.com/repos/cndbhbg/docfile/contents/${filePath}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        const sha = data.sha;  // Lấy SHA của file

        // Xóa file
        const deleteResponse = await fetch(`https://api.github.com/repos/cndbhbg/docfile/contents/${filePath}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Xóa file',
                sha: sha,
                branch: 'main'  // Chọn nhánh phù hợp
            })
        });

        if (deleteResponse.ok) {
            alert('Xóa file thành công!');
        } else {
            alert('Không thể xóa file: ' + deleteResponse.statusText);
        }
    } else {
        alert('Không thể lấy thông tin file: ' + response.statusText);
    }
}
