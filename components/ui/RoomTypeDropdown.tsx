import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function RoomTypeDropdown() {
  const [roomType, setRoomType] = useState('Economy Room');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roomTypes = [
    { label: 'Economy Room', value: 'Economy Room' },
    { label: 'Premium Room', value: 'Premium Room' },
    { label: 'Suite', value: 'Suite' },
  ];

  const handleSelectRoomType = (value) => {
    setRoomType(value);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      
      {/* Dropdown Trigger */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownText}>{roomType}</Text>
        <Icon name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Room Type</Text>
            
            <FlatList
              data={roomTypes}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    roomType === item.value && styles.optionItemSelected,
                  ]}
                  onPress={() => handleSelectRoomType(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      roomType === item.value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {roomType === item.value && (
                    <Icon name="check" size={20} color="#4B75E9" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#232323',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffffff',
    borderRadius: 25,
    paddingHorizontal: 26,
    paddingVertical: 5,
    borderWidth: 1,
    height:28,
    borderColor: '#ffffffff',
  },
  dropdownText: {
    fontSize: 15,
    color: '#232323',
    fontFamily: 'Inter',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#232323',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
  },
  optionItemSelected: {
    backgroundColor: '#F0F4FF',
  },
  optionText: {
    fontSize: 16,
    color: '#232323',
    fontFamily: 'Inter',
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#4B75E9',
  },
});