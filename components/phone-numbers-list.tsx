import { useContactsContext } from "../hooks/use-contacts"
import { View, Text, StyleSheet, FlatList } from 'react-native'

export function ContactNumbersList() {
  const { hasPermission, contactNumbers } = useContactsContext()!

  if (!hasPermission) {
    return '...'
  }
  
  const top10Contacts = contactNumbers.slice(0, 10)
  
  return (
    <View style={styles.container}>
      <Text>Contatos carregados: {contactNumbers.length}</Text>
      <FlatList
        data={top10Contacts}
        keyExtractor={(item, index) => `${item.number}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.number}>{item.number}</Text>
          </View>
        )}
      />
      ...
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
  },
  number: {
    fontSize: 14,
    color: '#666',
  },
})
