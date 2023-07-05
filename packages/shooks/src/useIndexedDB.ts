/* eslint-disable @typescript-eslint/promise-function-async */

import { shallowReadonly, shallowRef, type ShallowRef } from 'vue'
import { type Obj } from '.'

const useIndexedDB = <D extends Obj>(options: {
  database: {
    name: string
    version?: number
  }
  store: {
    name: string
    autoIncrement?: boolean
    keyPath?: string | string[] | null
    indexes?: Array<{
      name: string
      keyPath: string | string[]
      options?: {
        unique?: boolean
        multiEntry?: boolean
      }
    }>
  }
  onDatabaseAbort?: (e: Event) => void
  onDatabaseClose?: (e: Event) => void
  onDatabaseError?: (e: Event) => void
  onDatabaseVersionChange?: (e: IDBVersionChangeEvent) => void
}): {
  database: Readonly<ShallowRef<IDBDatabase | null>>
  store: Readonly<ShallowRef<IDBObjectStore | null>>
  createDatabase: () => Promise<IDBDatabase>
  closeDatabase: () => Promise<Event>
  deleteDatabase: () => Promise<Event>
  enumDatabases: () => Promise<IDBDatabaseInfo[]>
  compareOperationKey: (first: unknown, second: unknown) => number
  insertData: (data: D) => Promise<Event>
  updateData: (data: D) => Promise<Event>
  deleteData: (query: IDBValidKey | IDBKeyRange) => Promise<Event>
  selectData: (query: IDBValidKey | IDBKeyRange) => Promise<Event>
  selectAllData: (query?: IDBValidKey | IDBKeyRange) => Promise<Event>
  selectDataByIndex: (name: string, query: IDBValidKey | IDBKeyRange) => Promise<Event>
  traverseData: (onData: (data: D) => void, query?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection) => Promise<null>
  traverseDataByIndex: (name: string, onData: (data: D) => void, query?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection) => Promise<null>
  countData: (query?: IDBValidKey | IDBKeyRange) => Promise<Event>
  clearData: () => Promise<Event>
} => {
  const { database: db, store: os, onDatabaseAbort, onDatabaseClose, onDatabaseError, onDatabaseVersionChange } = options

  const database = shallowRef<IDBDatabase | null>(null)

  const store = shallowRef<IDBObjectStore | null>(null)

  const createDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(db.name, db.version)

      request.addEventListener('success', (e) => {
        const db = (e.target as IDBOpenDBRequest).result

        database.value = db

        if (onDatabaseAbort !== undefined) {
          db.addEventListener('abort', onDatabaseAbort)
        }
        if (onDatabaseClose !== undefined) {
          db.addEventListener('close', onDatabaseClose)
        }
        if (onDatabaseError !== undefined) {
          db.addEventListener('error', onDatabaseError)
        }
        if (onDatabaseVersionChange !== undefined) {
          db.addEventListener('versionchange', onDatabaseVersionChange)
        }

        resolve(db)
      })

      request.addEventListener('error', (e) => {
        reject(e)
      })

      request.addEventListener('upgradeneeded', (e) => {
        const { name, autoIncrement = true, keyPath = 'id', indexes = [] } = os

        const db = (e.target as IDBOpenDBRequest).result

        const object = db.createObjectStore(name, {
          autoIncrement,
          keyPath,
        })

        indexes.forEach((index) => {
          const { name, keyPath, options } = index

          object.createIndex(name, keyPath, options)
        })
      })
    })
  }

  const closeDatabase = (): Promise<Event> => {
    return new Promise((resolve) => {
      database.value?.close()

      database.value?.addEventListener('close', (e) => {
        database.value = null
        store.value = null
        resolve(e)
      })
    })
  }

  const deleteDatabase = (): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(db.name)

      request.addEventListener('success', (e) => {
        database.value = null
        store.value = null
        resolve(e)
      })

      request.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const enumDatabases = window.indexedDB.databases

  const compareOperationKey = window.indexedDB.cmp

  const insertData = (data: D): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readwrite').objectStore(os.name).add(data)

      request?.addEventListener('success', (e) => {
        resolve(e)
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const updateData = (data: D): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readwrite').objectStore(os.name).put(data)

      request?.addEventListener('success', (e) => {
        resolve(e)
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const deleteData = (query: IDBValidKey | IDBKeyRange): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readwrite').objectStore(os.name).delete(query)

      request?.addEventListener('success', (e) => {
        resolve(e)
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const selectData = (query: IDBValidKey | IDBKeyRange): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readonly').objectStore(os.name).get(query)

      request?.addEventListener('success', (e) => {
        resolve(e)
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const selectAllData = (query?: IDBValidKey | IDBKeyRange, count?: number): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readonly').objectStore(os.name).getAll(query, count)

      request?.addEventListener('success', (e) => {
        resolve(e)
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const selectDataByIndex = (name: string, query: IDBValidKey | IDBKeyRange): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readonly').objectStore(os.name).index(name).get(query)

      request?.addEventListener('success', (e) => {
        resolve(e)
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const traverseData = (onData: (data: D) => void, query?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection): Promise<null> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readonly').objectStore(os.name).openCursor(query, direction)

      request?.addEventListener('success', (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue | null>).result
        if (cursor !== null) {
          onData(cursor.value)
          cursor.continue()
        } else {
          resolve(null)
        }
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const traverseDataByIndex = (name: string, onData: (data: D) => void, query?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection): Promise<null> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readonly').objectStore(os.name).index(name).openCursor(query, direction)

      request?.addEventListener('success', (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue | null>).result
        if (cursor !== null) {
          onData(cursor.value)
          cursor.continue()
        } else {
          resolve(null)
        }
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const countData = (query?: IDBValidKey | IDBKeyRange): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readonly').objectStore(os.name).count(query)

      request?.addEventListener('success', (e) => {
        resolve(e)
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  const clearData = (): Promise<Event> => {
    return new Promise((resolve, reject) => {
      const request = database.value?.transaction(os.name, 'readwrite').objectStore(os.name).clear()

      request?.addEventListener('success', (e) => {
        resolve(e)
      })

      request?.addEventListener('error', (e) => {
        reject(e)
      })
    })
  }

  return {
    database: shallowReadonly(database),
    store: shallowReadonly(store),
    createDatabase,
    closeDatabase,
    deleteDatabase,
    enumDatabases,
    compareOperationKey,
    insertData,
    updateData,
    deleteData,
    selectData,
    selectAllData,
    selectDataByIndex,
    traverseData,
    traverseDataByIndex,
    countData,
    clearData,
  }
}

export default useIndexedDB
