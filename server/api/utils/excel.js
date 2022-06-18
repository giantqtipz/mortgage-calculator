const xlsx = require('xlsx');
const { saveAs } = require('file-saver');

const wb = xlsx.utils.book_new();

wb.Props = {
  Title: 'Mortgage Calculator',
  Subject: '',
  Author: 'giantqtipz from www.palessie.com',
  CreatedDate: new Date(2017, 12, 19),
};

wb.SheetNames.push('Main');

const ws_data = [['hello', 'world']]; // a row with 2 columns

const ws = xlsx.utils.aoa_to_sheet(ws_data);

wb.Sheets.Main = ws;

const wbout = xlsx.write(wb, { bookType: 'xlsx', type: 'binary' });

const s2ab = (s) => {
  const buffer = new ArrayBuffer(s.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buffer;
};

const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

const downloadFile = (
  purchasePrice: number,
  loanAmount: number,
  term: number,
  rate: number,
  downpayment:number
): any => saveAs(blob, 'Mortgage Calculator.xlsx');

export default downloadFile;
