import { createContext, useContext, useEffect, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import Contacts from 'react-native-contacts'

export function useInitValuesContacts() {
  const [hasPermission, setHasPermission] = useState(false)
  const [contactNumbers, setContactNumbers] = useState<{ name: string, number: string }[]>([])
  
  useEffect(() => {
    async function requestPermission() {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true)
        }
      } else {
        Contacts.checkPermission().then(permission => {
          if (permission === 'authorized') {
            setHasPermission(true)
          }
        })
      }
    }
    
    requestPermission()
  }, [])
  
  useEffect(() => {
    if (hasPermission) {
      Contacts.getAll().then(contacts => {
        const numbers = contacts.flatMap(contact =>
          // (contact.phoneNumbers || []).map(p => p.number.replace(/\D/g, ''))
          (contact.phoneNumbers || []).map(p => ({ name: p.label, number: p.number.replace(/\D/g, '') }))
        )
        setContactNumbers(numbers)
      })
    }
  }, [hasPermission])
  
  return {
    hasPermission,
    contactNumbers,
  }
}

export const ContactsContext = createContext<ReturnType<typeof useInitValuesContacts> | null>(null)

export const useContactsContext = () => useContext(ContactsContext)!
