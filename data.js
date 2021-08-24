class Person {
  constructor(number, room) {
    this.number = number;
    this.room = room;
    this.status = '受付';
    this.call = false;
    const date = new Date;
    this.startTime = date;
  }


}

/**
* ルーム変更
* @param newroom 変更する部屋
* @param number 変更する人
*/
function changeRoom(number, newroom) {
  let list = fileOutput();
  list[number].room = newroom;
  fileInput(list);
}

/**
* ステータス変更
* @param newStatus 変更するステータス
* @param number 変更する人
*/
function changeStatus(number, newStatus) {
  let list = fileOutput();
  list[number].status = newStatus;
  fileInput(list)
}

function changeCall(number, newStatus) {
  let list = fileOutput();
  list[number].call = newStatus;
  fileInput(list);
}


function call(meth, number) {
  let a = fileOutput();
  switch (meth) {
    case 'add':
      let r = {};
      if (a[number].status === '会計') {
        r.place = '会計'
      } else if (a[number].status === '受付') {
        r.place = a[number].room;
      }
      changeCall(number, true);
      r.num = number;
      return r;
    case 'dell':
      changeCall(number, false);
  }
}



/**
* allList取得
*/
function allList() {
  let list = fileOutput();
  let text = [];
  //リストの0番を表示しないため
  for (let i = 1; i < list.length; i++) {
    text[i - 1] = i + '番,' + list[i].room + ',' + list[i].status;
  }
  return text;

}

/**
 * 人の追加
 * @param {*} room 割り当てられた部屋
 */
let numb = 1;
function add(room) {
  a = fileOutput();
  a.push(new Person(a[0].number + 1, room));
  //numb=numb+1;
  a[0].number++;
  fileInput(a);
  return a[0].number;
}

/**
 * ファイルインプット
 */
const fs = require('fs');
function fileInput(list) {
  const a = JSON.stringify(list);
  fs.writeFileSync('listFile', a);
}

/**
 * ファイルアウトプット
 */
function fileOutput() {
  const a = fs.readFileSync('listFile')
  const b = JSON.parse(a);
  return b;
}

function InTeOUT() {
  const a = fs.readFileSync('infoTextTemp');
  const b = JSON.parse(a);
  return b;
}
module.exports.changeStatus = changeStatus;
module.exports.changeRoom = changeRoom;
module.exports.changeCall = changeCall;
module.exports.allList = allList;
module.exports.add = add;
module.exports.fileOutput = fileOutput;
module.exports.call = call;
module.exports.InTeOUT = InTeOUT;
function fileReset() {
  let a = [];
  a[0] = new Person(0, 0);
  let b = JSON.stringify(a);
  fs.writeFileSync('listFile', b);
}
fileReset();
const cron = require('node-cron');
cron.schedule('0 0 8 * * *', fileReset);
