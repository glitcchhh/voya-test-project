import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  selectedDate?: string;
  title?: string;
  initialMonth?: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onDateSelect,
  selectedDate,
  title = 'Select Date',
  initialMonth = new Date().toISOString().slice(0, 7), // 'YYYY-MM'
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>
          <Calendar
            current={initialMonth}
            onDayPress={day => onDateSelect(day.dateString)}
            markedDates={
              selectedDate ? {
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#4977F9',
                },
              } : undefined
            }
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
          <TouchableOpacity style={styles.button} onPress={onClose}>
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
