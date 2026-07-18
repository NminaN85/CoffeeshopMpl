// 🔗 رابط التصدير السريع والمباشر بصيغة CSV لورقة العمل الثانية
const SHEET_URL = "https://docs.google.com/spreadsheets/d/11-u2UCKiW1VmYhm3X8MhD_f4PhyfdXi0DtJG41zdHT8/export?format=csv&gid=1116639595";

async function fetchLiveSheetData() {
    try {
        const response = await fetch(SHEET_URL);
        const dataText = await response.text();
        
        // تحويل نص الـ CSV إلى سطور وأعمدة
        const rows = dataText.split("\n").map(row => row.split(","));
        
        let totalRevenues = 0;
        let totalExpenses = 0;

        // 🔄 اللف على السطور بدءاً من السطر الثاني (index 1) لتجميع الأرقام
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row && row.length >= 3) {
                // تنظيف الأرقام من أي مسافات أو علامات غريبة
                const revVal = parseFloat(row[1]?.replace(/[^0-9.-]/g, ""));
                const expVal = parseFloat(row[2]?.replace(/[^0-9.-]/g, ""));

                if (!isNaN(revVal)) totalRevenues += revVal;
                if (!isNaN(expVal)) totalExpenses += expVal;
            }
        }

        // الحسابات
        const totalProfits = totalRevenues - totalExpenses;

        const liveData = {
            totalProfits: totalProfits,
            revenues: totalRevenues,
            expenses: totalExpenses,
            investors: 42, // ثابت حالياً
            shareValue: 1.25, // ثابت حالياً
            weeklyProfit: totalProfits,
            monthlyProfit: totalProfits,
            alertMessage: "Live Dynamic Tracking Active."
        };

        updateDashboardWithLiveData(liveData);

    } catch (error) {
        console.error("Error syncing with CSV Sheet:", error);
        document.getElementById("sync-time").innerText = "⚠️ Connection Refused";
    }
}

function updateDashboardWithLiveData(data) {
    const timeString = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
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

document.addEventListener("DOMContentLoaded", () => {
    fetchLiveSheetData();
});
