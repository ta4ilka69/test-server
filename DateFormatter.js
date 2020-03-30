const DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const MONTHS = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

class DateFormatter {
  constructor(date = new Date()) {
    this.date = date;
  }

  formatDay() {
    return this.date.getDate();
  }

  formatDayOfWeek() {
    return DAYS[this.date.getUTCDay()];
  }

  formatMonth() {
    return MONTHS[this.date.getMonth()];
  }
}

module.exports = DateFormatter;
