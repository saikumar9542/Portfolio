/**
 * Google Apps Script Web App — Portfolio contact form → Google Sheet
 * ------------------------------------------------------------------
 * SETUP
 * 1. Create a Google Sheet (any name). Note its ID from the URL:
 *    https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
 * 2. Extensions → Apps Script → paste this whole file into Code.gs.
 * 3. (Optional) Set SPREADSHEET_ID below; leave "" if this script is
 *    bound to the sheet (Extensions → Apps Script from inside the sheet).
 * 4. Deploy → New deployment → Type: Web app
 *      Execute as:      Me
 *      Who has access:  Anyone
 * 5. Copy the /exec URL into src/lib/contact.ts (GOOGLE_APPS_SCRIPT_URL).
 *
 * Re-deploy ("Manage deployments" → edit → New version) after any edit,
 * otherwise the old code keeps serving.
 */

/** Leave empty when the script is bound to the spreadsheet. */
var SPREADSHEET_ID = '';

/** Sheet tab used to store submissions (created automatically). */
var SHEET_NAME = 'Contacts';

var HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message'];

/** ---------------------------------------------------------------- */

function getSheet_() {
  var ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error('Spreadsheet not found. Set SPREADSHEET_ID in code.gs.');
  }

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj, status) {
  return ContentService.createTextOutput(
    JSON.stringify(Object.assign({ status: status || 'success' }, obj)),
  ).setMimeType(ContentService.MimeType.JSON);
}

/** Parses JSON body, form-encoded body, or query params. */
function parsePayload_(e) {
  if (e && e.postData && e.postData.contents) {
    var raw = e.postData.contents;
    try {
      return JSON.parse(raw);
    } catch (err) {
      // fall through to form-encoded parameters
    }
  }
  return (e && e.parameter) || {};
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
}

/** Handles the actual submission (POST). */
function doPost(e) {
  try {
    var d = parsePayload_(e);

    var name = String(d.name || '').trim();
    var email = String(d.email || '').trim();
    var phone = String(d.phone || '').trim();
    var subject = String(d.subject || '').trim();
    var message = String(d.message || '').trim();

    var missing = [];
    if (!name) missing.push('name');
    if (!email) missing.push('email');
    if (!subject) missing.push('subject');
    if (!message) missing.push('message');

    if (missing.length) {
      return json_({ message: 'Missing required fields: ' + missing.join(', ') }, 'error');
    }
    if (!isValidEmail_(email)) {
      return json_({ message: 'Invalid email address.' }, 'error');
    }

    var timestamp = d.timestamp ? new Date(d.timestamp) : new Date();
    if (isNaN(timestamp.getTime())) timestamp = new Date();

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      getSheet_().appendRow([timestamp, name, email, phone, subject, message]);
    } finally {
      lock.releaseLock();
    }

    return json_({ message: 'Message stored successfully.' });
  } catch (err) {
    return json_({ message: (err && err.message) || String(err) }, 'error');
  }
}

/** Simple health check / CORS-friendly GET. */
function doGet() {
  return json_({ message: 'Portfolio contact endpoint is live.' });
}

/**
 * CORS note: Apps Script web apps deployed with access "Anyone" reply with
 * Access-Control-Allow-Origin: * on their responses, but they do NOT answer
 * CORS preflight (OPTIONS) requests. The frontend therefore sends a "simple"
 * request (Content-Type: text/plain) which never triggers a preflight.
 */
function doOptions() {
  return json_({ message: 'ok' });
}
