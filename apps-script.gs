// ============================================================
//  hsrpebook.online — Google Apps Script
//  Paste this entire file into the Apps Script editor.
//  Deploy as Web App: Execute as YOU, Access = Anyone.
// ============================================================

const SHEET_NAME = 'Bookings'; // Tab name in your Google Sheet

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // ── Honeypot check ──────────────────────────────────────
    // If the hidden field has any value, it's a bot. Drop silently.
    if (data.honeypot && data.honeypot.trim() !== '') {
      return jsonResponse({ status: 'ok' }); // pretend success
    }

    // ── Get or create sheet ─────────────────────────────────
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add header row on first creation
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Mobile',
        'Email',
        'State',
        'Application Type',
        'Vehicle Type',
        'Reg No',
        'Chassis No',
        'Engine No',
        'Address',
        'Pin Code',
        'Transaction ID',
        'Amount (₹)',
      ]);
      // Style header row
      const header = sheet.getRange(1, 1, 1, 14);
      header.setFontWeight('bold');
      header.setBackground('#1a3c6e');
      header.setFontColor('#ffffff');
    }

    // ── Append booking row ──────────────────────────────────
    sheet.appendRow([
      new Date(data.timestamp || new Date()),
      data.fullName        || '',
      data.mobile          || '',
      data.email           || '',
      data.state           || '',
      data.applicationType || '',
      data.vehicleType     || '',
      data.regNo           || '',
      data.chassisNo       || '',
      data.engineNo        || '',
      data.address         || '',
      data.pinCode         || '',
      data.transactionId   || '',
      data.amount          || '',
    ]);

    return jsonResponse({ status: 'success' });

  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

// Also handle GET (for testing the endpoint is live)
function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'hsrpebook.online script is running.' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
