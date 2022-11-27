const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId);
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const findContact = contacts.find(contact => contact.id === contactId);
  if (findContact) {
    const newContactList = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContactList));
    return findContact;
  } else {
    return null;
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const contactsOperations = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
module.exports = contactsOperations;