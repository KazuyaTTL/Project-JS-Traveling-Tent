// Get elements
const bookBtn = document.getElementById('bookBtn');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');

// Toggle sidebar
bookBtn.addEventListener('click', () => {
    if (sidebar.style.width === '350px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '350px';
    }
});

// Close sidebar
closeBtn.addEventListener('click', () => {
    sidebar.style.width = '0';
});

