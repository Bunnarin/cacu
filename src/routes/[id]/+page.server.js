import {SERVICE_ACC_EMAIL, SERVICE_ACC_KEY, SS_ID} from '$env/static/private';
import { google } from 'googleapis';

export const prerender = true;

const auth = new google.auth.JWT({
  email: SERVICE_ACC_EMAIL,
  key: SERVICE_ACC_KEY.replace(/\\n/g, '\n'), // Fix escaped newlines
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function load({params}) {
    const sheets = google.sheets({ version: 'v4', auth });
    const { data: indices } = await sheets.spreadsheets.values.get({
      spreadsheetId: SS_ID,
      range: 'qr!A:A',
    });

    // first we find the index of the row first
    const rowIndex = indices.values.findIndex(([row]) => row === params.id);
    const { data } = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: SS_ID,
      ranges: [
        `qr!A1:Z1`,
        `qr!A${rowIndex + 1}:Z${rowIndex + 1}`
      ],
    });
    let [{ values: keys }, { values: values }] = data.valueRanges;
    keys = keys[0].slice(1);
    values = values[0].slice(1);
    return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
}
