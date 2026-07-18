// تشغيل وإخفاء شاشة التحميل (Loading Screen)
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 800); // تأخير بسيط لإعطاء فخامة وحس أمان
});
