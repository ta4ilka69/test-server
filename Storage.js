class Storage {
  constructor() {
    this.items = [];
    this.id = 1;
  }
  add(s) {
    this.items.unshift({ value: s, id: this.id });
    this.id += 1;
  }

  edit(value, ind) {
    const i = this.items.findIndex(el => el.id === ind);
    this.items[i].value = value;
  }

  delete(id) {
    const i = this.items.findIndex(el => el.id === id);
    this.items.splice(i, 1);
  }

  list() {
    let temps = "<ul>";
    for (let i = 0; i < this.items.length; i++) {
      let id = this.items[i].id;
      temps +=
          `<li>` +
          this.items[i].value +
        `  ` +
        `<a href="/edit?id=${id}">Edit</a>` +
        `  ` +
        `<a href="/delete?id=${id}">Delete</a>` +
        `</li>`;
    }
    temps += "</ul>";
    return temps;
    }
    hasid(id) {
        return this.items.findIndex((item) => item.id === id) >= 0;
  }
}

module.exports = Storage;
