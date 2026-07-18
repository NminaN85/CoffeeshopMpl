document.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ أرقام تجريبية فخمة (سيتم سحبها لاحقاً من جوجل شيت)
    const financialData = {
        totalProfits: 2450.75,
        revenues: 3100.00,
        expenses: 649.25,
        investors: 42,
        shareValue: 1.25,
        weeklyProfit: 185.50,
        monthlyProfit: 780.20,
        updateTime: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + " (Live)",
        alertMessage: "All systems operational. Next dividend payout on Aug 1st."
    };

    // 2️⃣ تشغيل العدادات المتحركة (CountUp Effect)
    animateCurrency(document.getElementById("total-profits"), financialData.totalProfits);
    animateCurrency(document.getElementById("revenues"), financialData.revenues);
    animateCurrency(document.getElementById("expenses"), financialData.expenses);
    animateCurrency(document.getElementById("share-value"), financialData.shareValue);
    animateCurrency(document.getElementById("weekly-profit"), financialData.weeklyProfit);
    animateCurrency(document.getElementById("monthly-profit"), financialData.monthlyProfit);
    
    // عداد المستثمرين (بدون علامة اليورو)
    animateValue(document.getElementById("investors-count"), 0, financialData.investors, 1500);

    // تحديث النصوص والتوقيت
    document.getElementById("sync-time").innerText = "Synced: " + financialData.updateTime;
    document.getElementById("last-update").innerText = "🔄 Updated " + financialData.updateTime;
    document.getElementById("system-alert").innerText = financialData.alertMessage;

    // 3️⃣ بناء الرسم البياني الفاخر (Chart.js Premium Customization)
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // عمل تأثير تدرج لوني ذهبي تحت المنحنى (Gradient Fill)
    const goldGradient = ctx.createLinearGradient(0, 0, 0, 300);
    goldGradient.addColorStop(0, 'rgba(212, 175, 55, 0.3)');
    goldGradient.addColorStop(1, 'rgba(212, 175, 55, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // الأيام
            datasets: [{
                label: 'Fund Growth (€)',
                data: [1200, 1350, 1600, 1550, 1900, 2200, 2450], // نمو الأرباح
                borderColor: '#d4af37', // اللون الذهبي للمنحنى
                borderWidth: 3,
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#0a0a0a',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                backgroundColor: goldGradient, // التدرج الذهبي
                fill: true,
                tension: 0.4 // انحناء ناعم للمنحنى (Smooth Lines)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } // إخفاء الليجند الافتراضي لشكل أنظف
            },
            scales: {
                x: {
                    grid: { display: false }, // إخفاء الخطوط الطولية
                    ticks: { color: '#a1a1a6', font: { size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }, // خطوط عرضية خفيفة جداً
                    ticks: { color: '#a1a1a6', font: { size: 11 } }
                }
            }
        }
    });
});

// 🛠️ دالة تحريك الأرقام المالية مع علامة اليورو
function animateCurrency(element, targetValue) {
    let startTimestamp = null;
    const duration = 2000; // مدة الأنيميشن بالملي ثانية (ثانيتين)
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = progress * targetValue;
        
        element.innerText = "€" + currentValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

// 🛠️ دالة تحريك الأرقام الصحيحة (عدد المستثمرين مثلاً)
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
