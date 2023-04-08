import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("PUT to the database");
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readwrite");
    const store = tx.objectStore("todojate");
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  } catch (error) {
    console.error(error, "PUT to the database error");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.error("Get from database");
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readonly");
    // open up the desired object
    const store = tx.objectStore("jate");
    // get all method to get all data in database
    const request = store.getAll();
    // get confirmation of the request
    const result = await request;
    console.log("result.value", result);
    return result;
  } catch (error) {
    console.error(error, "Get from database error");
  }
};

initdb();
