import { SERVICE_ACC_EMAIL, SERVICE_ACC_KEY, SS_ID } from '$env/static/private';
import { google } from 'googleapis';

const auth = new google.auth.JWT({
  email: SERVICE_ACC_EMAIL,
  key: SERVICE_ACC_KEY.replace(/\\n/g, '\n'), // Fix escaped newlines
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function load({ params }) {
  const sheets = google.sheets({ version: 'v4', auth }).spreadsheets;
  const { data: { values } } = await sheets.values.get({
    spreadsheetId: SS_ID,
    range: 'qr!A:Z',
  });

  const targetRow = values.find(row => row[0].toLowerCase().trim() === params.id.toLowerCase().trim());

  if (!targetRow) throw error(404, 'Certificate not found');

  // Map headers to values
  const keys = values[0].slice(1);
  return Object.fromEntries(keys.map((k, i) => [k, targetRow[i + 1]]));
}
