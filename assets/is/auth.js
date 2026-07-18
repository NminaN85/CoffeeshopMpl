// كود الدخول الخاص بك (يمكنك تغييره في أي وقت)
const VIP_ACCESS_KEY = "MPL2026";

function handleLogin(event) {
    event.preventDefault();
    
    const inputKey = document.getElementById('access-key').value;
    const errorMsg = document.getElementById('error-message');
    
    if (inputKey === VIP_ACCESS_KEY) {
        errorMsg.style.display = 'none';
        // حفظ جلسة الدخول في المتصفح عشان ما يطلبش الباسوورد كل ثانية
        localStorage.setItem('mocha_auth', 'true');
        // الانتقال لصفحة الداشبورد
        window.location.href = 'dashboard.html';
    } else {
        errorMsg.style.display = 'block';
        // تأثير هز خفيف عند الخطأ
        const card = document.querySelector('.login-card');
        card.style.animation = 'none';
        setTimeout(() => card.style.animation = 'fadeInUp 0.3s ease', 10);
    }
}

// إظهار وإخفاء الباسوورد عند الضغط على العين
function togglePass() {
    const passInput = document.getElementById('access-key');
    const icon = document.querySelector('#toggle-password i');
    
    if (passInput.type === 'password') {
        passInput.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passInput.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}
