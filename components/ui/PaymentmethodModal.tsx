import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaymentMethodModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (method: string) => void;
}

const PAYMENT_METHODS = ['MasterCard', 'Visa', 'PayPal', 'Google Pay', 'Apple Pay'];

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ visible, onClose, onSelect }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Payment Method</Text>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method}
              style={styles.methodButton}
              onPress={() => {
                onSelect(method);
                onClose();
              }}
            >
              <Text style={styles.methodText}>{method}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentMethodModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modal: { width: '80%', backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  methodButton: { paddingVertical: 12, width: '100%', alignItems: 'center', borderBottomWidth: 1, borderColor: '#EEE' },
  methodText: { fontSize: 16 },
  cancelButton: { marginTop: 12, paddingVertical: 12, width: '100%', alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 8 },
  cancelText: { fontSize: 16, color: '#333' },
});
