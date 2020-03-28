class Storage {
  constructor() {
    this.items = [];
    this.Days_Names = ["Воскресенье","Понедельник","Вторник", "Среда", "Четверг","Пятница", "Суббота"];
    this.Months_Names = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    this.id = 1;
  }

  add(s) {
    this.items.unshift({ value: s, id: this.id });
    this.id += 1;
  }

  edit(value, ind) {
    if(this.hasId(ind)){
    const i = this.find_Index(ind);
    this.items[i].value = value;
    return true;
    }
    return false;
  }

  delete(id) {
    if(this.hasId(id))
    { 
    const i = this.find_Index(id);
    this.items.splice(i, 1);
    return true;
    }
    return false;
  }

  list() {
    let temps = [];
    for (let i = 0; i < this.items.length; i += 1) {
      const { id , value} = this.items[i];
      temps[i] = {value:value, id:id};
    }
    return temps;
  }
  find_Index(id){
    return this.items.findIndex((item) => item.id === id);
  }

  hasId(id) {
    return this.items.findIndex((item) => item.id === id) >= 0;
  }

  getDay_byNumder(i){
    return this.Days_Names[i];
  }
  getMonth_byNumber(i){
    return this.Months_Names[i];
  }
}


module.exports = Storage;
