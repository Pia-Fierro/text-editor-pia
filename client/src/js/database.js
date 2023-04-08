import { openDB } from "idb";

const initdb = async () =>
  // create datebase "jate"
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

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log("PUT to the database");
  // create connection with database
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  // use of put method
  const request = store.put({ id: id, jate: content });
  // confirmation of the request
  const result = await request;
  console.log("data saved to the database", result);
  return result;
};
export const getDb = async () => {
  console.log("GET from the database");
  const jatetDb = await openDB("jate", 1);
  const tx = jatetDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// start the database
initdb();
