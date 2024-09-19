const token = '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';  // Thay YOUR_TOKEN bằng token của bạn

async function readFile() {
    const filePath = document.getElementById('filePath').value;
    const response = await fetch(`https://api.github.com/repos/YOUR_USERNAME/YOUR_REPOSITORY/contents/${filePath}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        const content = atob(data.content);  // Giải mã Base64
        document.getElementById('fileContent').value = content;
    } else {
        alert('Không thể đọc file: ' + response.statusText);
    }
}

async function writeFile() {
    const filePath = document.getElementById('filePath').value;
    const content = document.getElementById('fileContent').value;
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

async function deleteFile() {
    const filePath = document.getElementById('filePath').value;

    // Lấy SHA của file
    const response = await fetch(`https://api.github.com/repos/YOUR_USERNAME/YOUR_REPOSITORY/contents/${filePath}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        const sha = data.sha;

        // Xóa file
        const deleteResponse = await fetch(`https://api.github.com/repos/YOUR_USERNAME/YOUR_REPOSITORY/contents/${filePath}`, {
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
