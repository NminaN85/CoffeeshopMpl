// 🔗 الرابط المتزامن مباشرة مع الـ Google Sheet الخاص بك
const SHEET_URL = "https://docs.google.com/spreadsheets/d/11-u2UCKiW1VmYhm3X8MhD_f4PhyfdXi0DtJG41zdHT8/gviz/tq?tqx=out:json";

async function fetchLiveSheetData() {
    try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        
        // تنظيف البيانات وتحويلها لـ JSON صريح يفهمه المتصفح
        const jsonData = JSON.parse(text.substr(47).slice(0, -2));
        const rows = jsonData.table.rows;

        // 💡 الكود يفترض أن الأرقام الـ 8 موجودة بالترتيب في الصف الأول (Row 0) من العمود A إلى H
        // إذا كانت الداتا في خلايا مختلفة، يمكنك تعديل الترتيب أدناه [0], [1], [2]... إلخ
        const liveData = {
            totalProfits: parseFloat(rows[0].c[0]?.v) || 0,   // العمود A (إجمالي الأرباح)
            revenues: parseFloat(rows[0].c[1]?.v) || 0,       // العمود B (الإيرادات)
            expenses: parseFloat(rows[0].c[2]?.v) || 0,       // العمود C (المصروفات)
            investors: parseInt(rows[0].c[3]?.v) || 0,        // العمود D (عدد المستثمرين)
            shareValue: parseFloat(rows[0].c[4]?.v) || 0,      // العمود E (قيمة السهم)
            weeklyProfit: parseFloat(rows[0].c[5]?.v) || 0,    // العمود F (أرباح الأسبوع)
            monthlyProfit: parseFloat(rows[0].c[6]?.v) || 0,   // العمود G (أرباح الشهر)
            alertMessage: rows[0].c[7]?.v || "Systems Stable. Payouts Secure.", // العمود H (رسالة النظام)
        };

        // تحديث لوحة التحكم والأرقام المتحركة بالبيانات الحقيقية
        updateDashboardWithLiveData(liveData);

    } catch (error) {
        console.error("Error syncing with Google Sheets:", error);
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
    
    // تحريك عداد المستثمرين كعدد صحيح
    animateValue(document.getElementById("investors-count"), 0, data.investors, 1500);

    // تحديث التوقيت نصوص الحالة
    document.getElementById("sync-time").innerText = "Synced: " + timeString + " (Live)";
    document.getElementById("last-update").innerText = "🔄 Updated " + timeString;
    document.getElementById("system-alert").innerText = data.alertMessage;
}

// تشغيل دالة سحب البيانات بمجرد فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
    fetchLiveSheetData();
});
