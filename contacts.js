const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const res = data.find(({ id }) => id === contactId);
  return res;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const deleteContact = data[index];
  data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deleteContact;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const id = nanoid();
  const newContact = {
    name,
    email,
    phone,
    id,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
