import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  selectedDate?: string;
  title?: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onDateSelect,
  selectedDate,
  title = 'Select Date',
}) => {
  const [currentSelected, setCurrentSelected] = useState(selectedDate || new Date().toISOString().split('T')[0]);
  const [initialMonth, setInitialMonth] = useState(currentSelected.slice(0, 7)); // 'YYYY-MM'

  // Update selected date when modal opens or selectedDate changes
  useEffect(() => {
    if (visible) {
      const defaultDate = selectedDate || new Date().toISOString().split('T')[0];
      setCurrentSelected(defaultDate);
      setInitialMonth(defaultDate.slice(0, 7));
    }
  }, [visible, selectedDate]);

  const handleConfirm = () => {
    onDateSelect(currentSelected);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <Calendar
            current={initialMonth}
            onDayPress={(day) => setCurrentSelected(day.dateString)}
            markedDates={{
              [currentSelected]: {
                selected: true,
                selectedColor: '#4977F9',
              },
            }}
            theme={{
              backgroundColor: '#fff',
              calendarBackground: '#fff',
              textSectionTitleColor: '#757575',
              selectedDayBackgroundColor: '#4977F9',
              selectedDayTextColor: '#fff',
              dayTextColor: '#212121',
              arrowColor: '#4977F9',
              monthTextColor: '#212121',
              textMonthFontWeight: 'bold',
              textMonthFontSize: 18,
            }}
            style={{ borderRadius: 16, marginBottom: 18 }}
          />

          {/* Continue Button */}
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(40,40,40,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    elevation: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#212121',
  },
  close: {
    fontSize: 28,
    fontWeight: '400',
    color: '#757575',
    padding: 4,
  },
  button: {
    marginTop: 4,
    width: '96%',
    backgroundColor: '#4977F9',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
