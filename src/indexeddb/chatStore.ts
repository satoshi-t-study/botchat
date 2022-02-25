import Dexie from 'dexie'

export interface chatStoreRecord {
  name: string
  text: string
  isOwner: boolean
  isProcessed: boolean
  datetime: string
}

const database = new Dexie('chatbot')
database.version(1).stores({ chatStore: '&datetime' })
const chatStore: Dexie.Table<chatStoreRecord, string> = database.table('chatStore')

export const putMsg = async (name: string, text: string, isOwner: boolean, isProcessed: boolean): Promise<void> => {
  const datetime = new Date().toISOString()
  await chatStore.put({ name, text, isOwner, isProcessed, datetime })
}
export const updateMsg = async (name: string, text: string, isOwner: boolean, isProcessed: boolean, datetime: string): Promise<void> => {
  await chatStore.put({ name, text, isOwner, isProcessed, datetime })
}
export const getMsg = (): Promise<chatStoreRecord[]> => {
  return chatStore.orderBy('datetime')
    .reverse()
    .toArray()
}

export const getNotProcessedMsg = (): Promise<chatStoreRecord[]> => {
  return chatStore.filter(it => it.isProcessed == false && it.isOwner == true).first().then()

}
