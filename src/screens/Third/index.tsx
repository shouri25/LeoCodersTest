import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { heightPercentageToDP } from 'react-native-responsive-screen'

interface Subject {
  subject_name: string;
  obtained_mark: number;
  toal_mark: number;
  time_spent_min: number;
  test_type: 'Online' | 'Offline';
}

const Subjects: Subject[] = [
  {
    subject_name: 'Math',
    obtained_mark: 10,
    toal_mark: 20,
    time_spent_min: 10,
    test_type: 'Online',
  },
  {
    subject_name: 'Physics',
    obtained_mark: 10,
    toal_mark: 20,
    time_spent_min: 10,
    test_type: 'Online',
  },
  {
    subject_name: 'Chemistry',
    obtained_mark: 10,
    toal_mark: 20,
    time_spent_min: 10,
    test_type: 'Online',
  },
];

interface TabProps {
  tab: Subject;
  onPress: (tab: Subject) => void;
  selectedTab?: Subject;
}

const Tabs = ({tab, onPress, selectedTab}: TabProps) => {
  const onClickTab = useCallback(() => {
    onPress(tab);
  }, [tab, onPress]);

  const isSelected = useMemo(
    () => selectedTab?.subject_name === tab.subject_name,
    [selectedTab, tab],
  );

  return (
    <TouchableOpacity
      style={[styles.tab, isSelected && styles.selectedTab]}
      onPress={onClickTab}>
      <Text>{tab.subject_name}</Text>
    </TouchableOpacity>
  );
};

interface FieldProps {
  title: string;
  value: string;
  editable: boolean;
  field: string;
  onChangeValue: (field: string, val: string) => void;
}
const Field = ({title, value, editable, field, onChangeValue}: FieldProps) => {
  const onChangeText = useCallback(
    (val: string) => {
      onChangeValue(field, val);
    },
    [field],
  );
  return (
    <View style={styles.fieldContainer}>
      <Text>{title}</Text>
      <TextInput
        value={value}
        editable={editable}
        style={styles.input}
        onChangeText={onChangeText}
        inputMode="numeric"
      />
    </View>
  );
};

const Third = () => {
  const [subjectsList, setSubjectsList] = useState<Subject[]>(Subjects);
  const [updatedData,setUpdatedData] = useState<Subject[]>(Subjects);
  const [selectedTab, setSelectedTab] = useState<number>();
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(()=>{
    setSubjectsList(updatedData)
  },[updatedData])

  const onSelectTab = useCallback(
    (tab: Subject) => {
      setEditable(false);
      const index = updatedData.findIndex(
        item => item.subject_name === tab.subject_name,
      );
      if(index!==undefined) {
        setSelectedTab(index);
        setSubjectsList(updatedData)
      }
    },
    [subjectsList,updatedData],
  );

  const onPressApply = useCallback(() => {
    setEditable(true);

  }, []);

  const selectedSubject = useMemo(
    () => (selectedTab !== undefined ? subjectsList?.[selectedTab] : undefined),
    [selectedTab,subjectsList],
  );

  const onChangeObjtainedMark = useCallback(
    (field: string, val: string) => {
      if (selectedTab !== undefined) {
        const data = [...subjectsList];
        data.map((item)=>{
            if(item.subject_name === selectedSubject?.subject_name) {
                item.obtained_mark = +val;
            }
            return item;
        })
        setSubjectsList(data)
      }
    },
    [subjectsList, selectedTab,selectedSubject],
  );
  const onChangeTime = useCallback(
    (field: string, val: string) => {
      if (selectedTab !== undefined) {
        const data = [...subjectsList];
        data.map((item)=>{
            if(item.subject_name === selectedSubject?.subject_name) {
                item.time_spent_min = +val;
            }
            return item;
        })
        setSubjectsList(data)
      }
    },
    [subjectsList, selectedTab,selectedSubject],
  );
  const onChangeTotalMark = useCallback(
    (field: string, val: string) => {
        console.log("VAL",selectedTab,val)
      if (selectedTab !== undefined) {
        const data = [...subjectsList];
        data.map((item)=>{
            if(item.subject_name === selectedSubject?.subject_name) {
                item.toal_mark = +val;
            }
            return item;
        })
        setSubjectsList(data)
      }
    },
    [subjectsList, selectedTab,selectedSubject],
  );
  console.log("SELECTED TAV",selectedTab)

  const onPressSave = useCallback(() => {
    setEditable(false);
    setUpdatedData([...subjectsList]);
  }, [subjectsList]);

  const { obtainedMarks,timeSpent,totalMarks } = useMemo(()=>{
    let totalMarks = 0;
    let obtainedMarks = 0;
    let timeSpent = 0;
    updatedData.forEach((item)=>{
        totalMarks+=item.toal_mark;
        obtainedMarks+=item.obtained_mark;
       timeSpent +=item.time_spent_min;
    })
    return {totalMarks,obtainedMarks,timeSpent}
  },[updatedData])

  return (
    <View>
      <View style={styles.tabContainer}>
        {subjectsList.map(item => {
          return (
            <Tabs
              tab={item}
              key={item.subject_name}
              onPress={onSelectTab}
              selectedTab={selectedSubject}
            />
          );
        })}
      </View>
      {selectedSubject && (
        <View style={{
            padding: 12
        }}>
          <Field
            title="Obtainer mark"
            value={selectedSubject.obtained_mark.toString()}
            editable={editable}
            onChangeValue={onChangeObjtainedMark}
            field={selectedSubject.subject_name}
          />
          <Field
            title="Total mark"
            value={selectedSubject.toal_mark.toString()}
            editable={editable}
            onChangeValue={onChangeTotalMark}
            field={selectedSubject.subject_name}
          />
          <Field
            title="Time spent"
            value={selectedSubject.time_spent_min.toString()}
            editable={editable}
            onChangeValue={onChangeTime}
            field={selectedSubject.subject_name}
          />
          <View style={styles.buttonContainer}>
          {editable ? (
            <Button title="Save" onPress={onPressSave} />
          ) : (
            <Button title="Apply" onPress={onPressApply} />
          )}
          </View>
        </View>
      )}

      <View style={{
        padding: 12
      }}>
        <Text style={styles.title}>Final Scores</Text>
        <Text>Total Marks: {totalMarks}</Text>
        <Text>Obtained Marks: {obtainedMarks}</Text>
        <Text>TIme Spent: {timeSpent}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tab: {
    padding: 12,
  },
  selectedTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  input: {
    padding: 0,
    margin: 0,
  },
  title:{
    color: '#000',
    fontSize: RFValue(18)
  },
  buttonContainer: {
    // height: heightPercentageToDP(40),
    // backgroundColor:'red'
  }
});
export default Third;
