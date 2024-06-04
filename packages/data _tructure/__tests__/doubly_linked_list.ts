import { DoublyLinkedList } from '@/code/doubly_linked_list';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<object>;

  beforeEach(() => {
    list = new DoublyLinkedList({ head: null, tail: null });
  });

  test('append', () => {
    // 对空链表的链表进行测试
    const node = list.append({ value: 1 });
    expect(list.tailNode).toBe(node);
    // 对有节点的链表进行测试
    const obj = { value: 2 };
    list.append(obj);
    expect(list.tailNode?.value).toBe(obj);
  });

  test('prepend', () => {
    // 对空链表的链表进行测试
    const node = list.prepend({ value: 1 });
    expect(list.headNode).toBe(node);
    // 对有节点的链表进行测试
    const obj = { value: 2 };

    list.prepend(obj);
    expect(list.headNode?.value).toBe(obj);
  });

  test('find', () => {
    const val1 = { value: 1 };
    const val2 = { value: 2 };
    const val3 = { value: 3 };
    const node = list.append(val1);
    list.append(val2);
    list.append(val3);
    expect(list.find(val1)).toBe(node);
  });

  test('delete', () => {
    const val1 = { value: 1 };
    const val2 = { value: 2 };
    const val3 = { value: 3 };
    list.append(val1);
    list.append(val2);
    list.append(val3);

    list.delete(val1);
    expect(list.find({ value: 1 })).toBeNull();
    list.delete(val2);
    list.delete(val3);
    expect(list.headNode).toBeNull();
    expect(list.tailNode).toBeNull();
  });

  test('insertAfter', () => {
    const val1 = { value: 1 };
    const val2 = { value: 2 };
    const val3 = { value: 3 };
    const node1 = list.append(val1);
    list.append(val2);
    list.append(val3);
    const val4 = { value: 4 };
    // 插入中间
    const node4 = list.insertAfter(val4, val1);
    expect(node1.next).toBe(node4);
    // 插入到尾节点之后
    const val5 = { value: 5 };
    const node5 = list.insertAfter(val5, val3);
    expect(list.tailNode).toBe(node5);
  });

  test('insertBefore', () => {
    const val1 = { value: 1 };
    const val2 = { value: 2 };
    const val3 = { value: 3 };
    list.append(val1);
    const node2 = list.append(val2);
    const node3 = list.append(val3);
    const val4 = { value: 4 };
    // 插入中间
    const node4 = list.insertBefore(val4, val3);
    expect(node3.prev).toBe(node4);
    expect(node2.next).toBe(node4);
    // 插入到头节点之前
    const val5 = { value: 5 };
    const node5 = list.insertBefore(val5, val1);
    expect(list.headNode).toBe(node5);
  });
});
