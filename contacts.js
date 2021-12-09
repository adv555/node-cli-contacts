const { customAlphabet } = require('nanoid/async');
const nanoid = customAlphabet('1234567890', 10);
const getAll = require('./db/getAll');
const updateAll = require('./db/updateAll');

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const contacts = await getAll();
    console.table(contacts);
  } catch (err) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getAll();

    const contactById = contacts.filter(contact => contact.id === contactId);
    return console.table(contactById);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getAll();

    const newContacts = contacts.filter(contact => contact.id !== contactId);

    await updateAll(newContacts);

    console.log('The contact has been deleted!');
    return console.table(newContacts);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: await nanoid(), name, email, phone };
  try {
    const contacts = await getAll();

    const newContacts = [...contacts, newContact];

    await updateAll(newContacts);

    console.log('The contact has been saved!');
    return console.table(newContacts);
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
