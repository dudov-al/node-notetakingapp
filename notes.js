const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => {
  return "Your Notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note added"));
  } else {
    console.log(chalk.red.inverse("Note is exists"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const readNote = notes.find((note) => note.title === title);
  if (readNote) {
    console.log(
      chalk.inverse("Title") +
        " " +
        readNote.title +
        "\n" +
        chalk.inverse.cyan("Description:") +
        " " +
        readNote.body
    );
  } else {
    console.log(chalk.bgRed.black("There is no such Note!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    console.log(chalk.blue.inverse("Note has been removed"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.yellow.inverse("No Note found"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.magenta.inverse("Your Notes"));
  notes.forEach((element) => {
    console.log(chalk.inverse.bold.white("Title:") + " " + element.title);
  });
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
