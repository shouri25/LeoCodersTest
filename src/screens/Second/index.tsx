import axios from 'axios';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';

const URL = 'https://jsonplaceholder.typicode.com/todos';

interface Todo {
  userId: string;
  id: number;
  title: string;
}

const Second = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [page, setPage] = useState<number>(1);

  const getData = useCallback(async () => {
    try {
      const result = await axios.get(URL);
      setTodo(result.data);
    } catch (e) {}
  }, []);
  useEffect(() => {
    getData();
  }, []);

  const newData = useMemo(() => {
    return page < todo.length / 10 ? [...todo].splice(0, 10 + 10 * page) : todo;
  }, [todo, page]);

  const onEndReached = useCallback(() => {
    if (page < todo.length / 10) setPage(page + 1);
  }, [page, todo]);

  const onPressDelete = useCallback((id: number) => {
    const filteredData = todo.filter((item)=>item.id!==id)
    setTodo(filteredData);
  }, [todo]);

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={newData}
        keyExtractor={(item: Todo) => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <View style={styles.content}>
                <Text>{index}. </Text>
                <Text>{item.title}</Text>
              </View>
              <Button title="Delete" color={'red'} onPress={()=>onPressDelete(item.id)} />
            </View>
          );
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
export default Second;
