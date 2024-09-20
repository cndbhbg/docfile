// Lấy phần tử textarea
const editor = document.getElementById('editor');

// Khi tải trang, kiểm tra xem có dữ liệu đã lưu không
window.onload = function() {
    const savedData = localStorage.getItem('editorContent');
    if (savedData) {
        editor.value = savedData; // Hiển thị dữ liệu đã lưu
    }
};

// Lưu dữ liệu khi người dùng thay đổi
editor.addEventListener('input', function() {
    localStorage.setItem('editorContent', editor.value);
});
