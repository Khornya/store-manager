import PouchDB from 'pouchdb';

export const initializeDB = () => {
    dbInstance = new PouchDB("store-manager");
    remoteInstance = new PouchDB(
      "http://localhost:5984/store-manager", { skip_setup: true, auth: { username: 'admin', password: 'admin' } }
    );
    syncInstance = dbInstance.sync(remoteInstance, {
      live: true,
      retry: true
    });
};

export let remoteInstance = null;
export let dbInstance = null;
export let syncInstance = null;


