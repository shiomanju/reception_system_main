class Person {
  constructor(number, room) {
    this.number = number;
    this.room = room;
    this.status = '受付';
    const date = new Date;
    this.startTime = date;
  }
  /**
 * ルーム変更
 * @param newroom 変更する部屋
 * @param number 変更する人
 */
  static changeRoom(number, newroom) {
    let list = fileOutput();
    list[number].room = newroom;
    fileInput(list);
  }

  /**
 * ステータス変更
 * @param newStatus 変更するステータス
 * @param number 変更する人
 */
  static changeStatus(number, newStatus) {
    let list = fileOutput();
    list[number].status = newStatus;
    fileInput(list)
  }


}

let callList = [];
class called {
  constructor(number, room) {
    this.number = number;
    this.room = room;
  }
}
let kari = false;
function call(number) {
  let a = fileOutput();
  let place;
  if (a[number].status === '会計') {
    place = '会計';
  } else {
    place = a[number].room;
  }
  kari=false;
  for (let i = 0; i < callList.length; i++) {
    if (callList[i].room == place && callList[i].number == number) {
      console.log('53');
      callList.splice(i,1);
    }
  }
  if (kari) {

  } else {
    callList.push(new called(number, place));
  }
  return callList;
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


module.exports.changeStatus = Person.changeStatus;
module.exports.changeRoom = Person.changeRoom;
module.exports.allList = allList;
module.exports.add = add;
module.exports.fileOutput = fileOutput;
module.exports.call = call;
function fileReset() {
  let a = [];
  a[0] = new Person(0, 0);
  let b = JSON.stringify(a);
  fs.writeFileSync('listFile', b);
}
const cron=require('node-cron');
cron.schedule('0 0 8 * * *',fileReset);
