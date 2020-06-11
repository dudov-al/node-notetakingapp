const chalk = require("chalk");
const fs = require("fs");
const notes = require("./notes");
const yargs = require("yargs");

// fs.appendFileSync("notes.txt", " Остановился на 14ом уроке")

yargs.version("1.0.1");

//Create add command

yargs.command({
  command: "add",
  describe: "Добавление заметки",
  builder: {
    title: {
        describe: "Note title",
        demandOption: true,
        type: 'string'
    },
    body: {
        describe: 'Описание заметки',
        demandOption: true,
        type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  },
});
// Create remove command
yargs.command({
  command: "remove",
  describe: "Удаление заметки",
  builder:{
    title: {
      decribe: "Удаление замекти",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    console.log(chalk.bgRed("Removing note..."));
    notes.removeNote(argv.title)
  },
});

yargs.command({
  command: "list",
  describe: "Список заметок",
  handler() {
    notes.listNotes()
  },
});

yargs.command({
  command: "read",
  describe: "Чтение заметки",
  builder:{
    title: {
      decribe: "Чтение замекти",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  },
});

yargs.parse()
