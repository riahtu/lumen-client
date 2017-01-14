import { schema } from 'normalizr';




export const dbElement = new schema.Entity('dbElements');

export const dbStream = new schema.Entity('dbStreams',
  { elements: [dbElement] });

export const dbFolder = new schema.Entity('dbFolders',
  {}, {
    processStrategy: (entity) => {
      if ('subfolders' in entity) {
        entity.shallow = false;
      } else {
        entity.shallow = true
      }
      return entity;
    }
  });
export const dbFolders = new schema.Array(dbFolder);
dbFolder.define({
  subfolders: dbFolders,
  streams: [dbStream]
});

export const db = new schema.Entity('dbs',
  { contents: dbFolder });

export const nilm = new schema.Entity('nilms',
  { db: db });
export const nilms = new schema.Array(nilm);
