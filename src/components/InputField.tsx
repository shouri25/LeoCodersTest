import {StyleSheet, Text, TextInput, View} from 'react-native';

interface InputFieldProps {
  title: string;
  placeholder: string;
  onChangeValue?: (val: string) => void;
  value?: string;
}
const InputField = ({
  placeholder,
  title,
  onChangeValue,
  value,
}: InputFieldProps) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeValue}
        style={styles.input}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  field: {
    marginVertical: 8,
  },
  label: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    margin: 0,
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    padding: 12,
    borderRadius: 3,
  },
});
export default InputField;