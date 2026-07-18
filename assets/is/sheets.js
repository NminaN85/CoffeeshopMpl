// 🔗 الرابط الخاص بالشيت بتاعك (Sheet2)
const SHEET_URL = "https://docs.google.com/spreadsheets/d/11-u2UCKiW1VmYhm3X8MhD_f4PhyfdXi0DtJG41zdHT8/gviz/tq?tqx=out:json&sheet=Sheet2";

async function fetchLiveSheetData() {
    try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        
        // تنظيف الجافا سكريبت القادم من جوجل وتحويله لـ JSON
        const jsonData = JSON.parse(text.substr(47).slice(0, -2));
        const rows = jsonData.table.rows;

        let totalRevenues = 0;
        let totalExpenses = 0;

        // 🔄 اللف على كل السطور في الجدول وجمع البيانات تلقائياً
        // السطر الأول (index 0) فيه العناوين، عشان كده بنبدأ من السطر الثاني (index 1)
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row && row.c) {
                // العمود B (index 1) هو الإيرادات
                const revVal = row.c[1]?.v;
                if (typeof revVal === 'number') totalRevenues += revVal;

                // العمود C (index 2) هو المصروفات
                const expVal = row.c[2]?.v;
                if (typeof expVal === 'number') totalExpenses += expVal;
            }
        }

        // 🧮 الحسبه الذكية للأرقام المطلوبة في الداشبورد
        const totalProfits = totalRevenues - totalExpenses; // الأرباح = الإيرادات - المصروفات
        const shareValue = 1.25; // قيمة السهم الثابتة اللي اتفقت عليها
        const investorsCount = 42; // رقم افتراضي للمستثمرين (تقدر تثبته أو نغيره لاحقاً)

        const liveData = {
            totalProfits: totalProfits,
            revenues: totalRevenues,
            expenses: totalExpenses,
            investors: investorsCount,
            shareValue: shareValue,
            weeklyProfit: totalProfits, // كبداية هنخليهم نفس صافي الأرباح
            monthlyProfit: totalProfits,
            alertMessage: "System Dynamic Ledger Active. Payouts Secure."
        };

        // تحديث اللوحة بالبيانات الحقيقية المحسوبة
        updateDashboardWithLiveData(liveData);

    } catch (error) {
        console.error("Error calculating dynamic data from sheet:", error);
        document.getElementById("sync-time").innerText = "⚠️ Sync Failed";
    }
}

function updateDashboardWithLiveData(data) {
    const timeString = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    // تشغيل أنيميشن العدادات بناءً على أرقام الشيت الحقيقية
    animateCurrency(document.getElementById("total-profits"), data.totalProfits);
    animateCurrency(document.getElementById("revenues"), data.revenues);
    animateCurrency(document.getElementById("expenses"), data.expenses);
    animateCurrency(document.getElementById("share-value"), data.shareValue);
    animateCurrency(document.getElementById("weekly-profit"), data.weeklyProfit);
    animateCurrency(document.getElementById("monthly-profit"), data.monthlyProfit);
    
    animateValue(document.getElementById("investors-count"), 0, data.investors, 1500);

    document.getElementById("sync-time").innerText = "Synced: " + timeString + " (Live)";
    document.getElementById("last-update").innerText = "🔄 Updated " + timeString;
    document.getElementById("system-alert").innerText = data.alertMessage;
}

// تشغيل جلب البيانات فور تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    fetchLiveSheetData();
});
