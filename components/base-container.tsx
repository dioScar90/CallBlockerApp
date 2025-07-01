import { PropsWithChildren } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContactsContext, useContactsContext } from '../hooks/use-contacts';
import { ContactNumbersList } from './phone-numbers-list';

function ContactsContextProvider({ children }: PropsWithChildren) {
  const values = useContactsContext()
  
  if (!values) {
    throw new Error('useErrorHandler must be used within an ErrorHandlerProvider');
  }
  
  return (
    <ContactsContext
      value={{
        ...values
      }}
    >
      {children}
    </ContactsContext>
  )
}

export default function ContactsNumbers() {
  const { hasPermission } = useContactsContext()!
  
  return (
    <ContactsContextProvider>
      <View style={styles.view}>
        <Text style={styles.text}>
          App de Bloqueio de Chamadas (somente interface)
        </Text>

        <Text>{hasPermission ? 'Permissão concedida' : 'Solicitando permissão...'}</Text>

        <ContactNumbersList />
      </View>
    </ContactsContextProvider>
  )
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
})
