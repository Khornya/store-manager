import PouchDB from 'pouchdb';

export const initializeDB = () => {
    dbInstance = new PouchDB("store-manager");
    let remoteDb = new PouchDB(
      "http://localhost:5984/store-manager", { skip_setup: true, auth: { username: 'admin', password: 'admin' } }
    );
    syncInstance = dbInstance.sync(remoteDb, {
      live: true,
      retry: true
    });
};

export let dbInstance = null;
export let syncInstance = null;


