const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = contacts => {
  fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(item => String(item.id) === String(contactId));
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const newContacs = contacts.filter(item => String(item.id) !== contactId);

  await updateContacts(newContacs);
  return newContacs;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };
  contacts.push(newContact);

  await updateContacts(contacts);
  return contacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => String(item.id) === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id: contactId };

  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
