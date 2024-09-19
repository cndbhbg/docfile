const token = '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';  // Thay YOUR_TOKEN bằng token của bạn




// Hàm để đọc file ev.txt
async function readLocalFile() {
    const response = await fetch('ev.txt');  // Đọc file từ cùng thư mục
    if (response.ok) {
        const content = await response.text();  // Đọc nội dung file
        const lines = content.split('\n');  // Chia nội dung thành từng dòng
        await displayLines(lines);  // Hiển thị từng dòng với delay
    } else {
        alert('Không thể đọc file: ' + response.statusText);
    }
}

// Hàm hiển thị từng dòng với delay 5 giây
async function displayLines(lines) {
    for (const line of lines) {
        document.getElementById('fileContent').value = line;  // Hiển thị dòng hiện tại
        await new Promise(resolve => setTimeout(resolve, 5000));  // Dừng 5 giây
    }
}

// Hàm ghi file lên GitHub
async function writeFile() {
    const filePath = document.getElementById('filePath').value;  // Đường dẫn file trên GitHub

    // Đầu tiên, lấy nội dung hiện tại của file
    const response = await fetch(`https://api.github.com/repos/cndbhbg/docfile/contents/${filePath}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        const currentContent = atob(data.content);  // Giải mã nội dung hiện tại
        const newContent = currentContent + '\n' + document.getElementById('fileContent').value;  // Thêm nội dung mới vào nội dung hiện tại
        const encodedContent = btoa(newContent);  // Mã hóa lại nội dung

        // Ghi lại nội dung mới vào file trên GitHub
        const updateResponse = await fetch(`https://api.github.com/repos/cndbhbg/docfile/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Ghi thêm nội dung',
                content: encodedContent,
                sha: data.sha,  // Cần SHA để cập nhật file
                branch: 'main'  // Chọn nhánh phù hợp
            })
        });

        if (updateResponse.ok) {
            alert('Ghi thêm nội dung thành công!');
        } else {
            alert('Không thể ghi file: ' + updateResponse.statusText);
        }
    } else {
        alert('Không thể lấy nội dung file: ' + response.statusText);
    }
}

// Hàm xóa nội dung của file và textarea
async function clearContent() {
    const filePath = document.getElementById('filePath').value;  // Đường dẫn file trên GitHub

    // Ghi nội dung trống lên file
    const encodedContent = btoa('');  // Mã hóa nội dung trống

    const response = await fetch(`https://api.github.com/repos/cndbhbg/docfile/contents/${filePath}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Xóa nội dung file',
            content: encodedContent,
            branch: 'main'  // Chọn nhánh phù hợp
        })
    });

    if (response.ok) {
        document.getElementById('fileContent').value = '';  // Xóa nội dung trong textarea
        alert('Đã xóa nội dung của file thành công!');
    } else {
        alert('Không thể xóa nội dung file: ' + response.statusText);
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
