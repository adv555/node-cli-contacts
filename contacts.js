const fs = require('fs').promises;
const path = require('path');
const { customAlphabet } = require('nanoid/async');
const nanoid = customAlphabet('1234567890', 10);

const contactsPath = path.resolve('db/contacts.json');
console.log(contactsPath);

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    console.table(contacts);
  } catch (err) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const contact = contacts.filter(contact => contact.id === contactId);

    return console.table(contact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const updatedContactList = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactList, null, '\t'), 'utf8');

    console.log('The contact has been deleted!');
    console.table(updatedContactList);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  // ...твой код
  const newContact = { id: await nanoid(), name, email, phone };
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contactsList = JSON.parse(data);

    const contacts = [...contactsList, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    console.log('The contact has been saved!');
    return console.table(contacts);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
