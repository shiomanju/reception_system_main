class Person {
  constructor(room) {
    this.room = room;
    this.status = 'reception';
    const date = new Date;
    this.startTime = date;
  }
  /**
 * ステータス変更
 * @param newStatus 変更するステータス
 * @param number 変更する人
 */
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

  /**
 * allList取得
 */
  static allList() {
    let list = fileOutput();
    let text = [];
    //リストの0番を表示しないため
    for (let i = 1; i < list.length; i++) {
      text[i-1] = i+'番,'+list[i].room + ',' + list[i].status;
    }
    return text;

  }
}
/**
 * 人の追加
 * @param {*} room 割り当てられた部屋
 */
function add(room) {
  a=fileOutput();
  a.push(new Person(room));
  fileInput(a);
}

const fs = require('fs');
function fileInput(list) {
  const a = JSON.stringify(list);
  fs.writeFileSync('listFile', a);
}

function fileOutput() {
  const a = fs.readFileSync('listFile')
  const b = JSON.parse(a || "null");
  return b;
}

function fileInput(list) {
  const a = JSON.stringify(list || "null");
  fs.writeFileSync('listFile', a);
}


module.exports.changeStatus=Person.changeStatus;
module.exports.changeRoom=Person.changeRoom;
module.exports.allList=Person.allList;
module.exports.add=add;
module.exports.fileOutput=fileOutput;

function fileReset(){
  let a=[new Person('0')];
  let b=JSON.stringify(a);
  fs.writeFileSync('listFile',b);
}
fileReset();
