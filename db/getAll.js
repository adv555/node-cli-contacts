const fs = require('fs').promises;
const contactsPath = require('./contactsPath');

const getAll = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAll;
