// 给T设置默认值
class DoublyLinkedNode<T extends object> {
  prev: DoublyLinkedNode<T> | null;
  next: DoublyLinkedNode<T> | null;
  value: T;
  constructor(params: { prev: DoublyLinkedNode<T> | null; next: DoublyLinkedNode<T> | null; value: T }) {
    this.prev = params.prev;
    this.next = params.next;
    this.value = params.value;
  }
}

/**
 * 双向链表
 * head.prev指向null,tail.next指向null
 * 只有一个节点时，head和tail指向同一个节点
 * @class DoublyLinkedList
 * @template T
 */
class DoublyLinkedList<T extends object> {
  private head: DoublyLinkedNode<T> | null;
  private tail: DoublyLinkedNode<T> | null;
  constructor(params?: { head: DoublyLinkedNode<T> | null; tail: DoublyLinkedNode<T> | null }) {
    this.head = params?.head || null;
    this.tail = params?.tail || null;
  }
  get headNode() {
    return this.head;
  }
  get tailNode() {
    return this.tail;
  }
  append(value: T): DoublyLinkedNode<T> {
    const _node = new DoublyLinkedNode({ prev: this.tail, next: null, value });

    if (this.tail) {
      this.tail.next = _node;
      this.tail = _node;
    } else {
      this.head = _node;
      this.tail = _node;
    }
    return _node;
  }
  prepend(value: T): DoublyLinkedNode<T> {
    const _node = new DoublyLinkedNode({ prev: null, next: this.head, value });

    if (this.head) {
      this.head.prev = _node;
      this.head = _node;
    } else {
      this.head = _node;
      this.tail = _node;
    }
    return _node;
  }
  find(value: T): DoublyLinkedNode<T> | null {
    let node = this.head;
    while (node && node.value !== value) {
      node = node.next;
    }
    return node;
  }
  delete(value: T): void {
    if (!this.head || !this.tail) {
      // 空链表
      return;
    } else if (this.head.value === value) {
      // 删除头节点
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        // 单个节点，删除之后就是空链表
        this.tail = null;
      }
    } else if (this.tail.value === value) {
      // 删除尾节点
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        // 单个节点，删除之后就是空链表
        this.head = null;
      }
    } else {
      let node: DoublyLinkedNode<T> | null = this.head.next;
      while (node) {
        if (node.value === value) {
          // 因为node不是head和tail，所以node.prev和node.next一定存在
          node.prev!.next = node.next;
          node.next!.prev = node.prev;
          break;
        }
        node = node.next;
      }
    }
  }
  /**
   * 插入到指定节点之后
   *
   * @param {T} value
   * @param {T} afterValue
   * @return {*}  {(DoublyLinkedNode<T> | null)}
   * @memberof DoublyLinkedList
   */
  insertAfter(value: T, afterValue: T): DoublyLinkedNode<T> | null {
    const node = this.find(afterValue);
    if (node) {
      const _node = new DoublyLinkedNode({ prev: node, next: node.next, value });
      node.next = _node;
      if (_node.next) {
        _node.next.prev = _node;
      } else {
        this.tail = _node;
      }
      return _node;
    }
    return null;
  }
  /**
   * 插入到指定节点之前
   *
   * @param {T} value
   * @param {T} beforeValue
   * @return {*}  {(DoublyLinkedNode<T> | null)}
   * @memberof DoublyLinkedList
   */
  insertBefore(value: T, beforeValue: T): DoublyLinkedNode<T> | null {
    const node = this.find(beforeValue);
    if (node) {
      const _node = new DoublyLinkedNode({ prev: node.prev, next: node, value });
      node.prev = _node;
      if (_node.prev) {
        _node.prev.next = _node;
      } else {
        this.head = _node;
      }
      return _node;
    }
    return null;
  }
  // 打印链表
  print() {
    let node = this.head;
    const result = [];
    while (node) {
      result.push(JSON.stringify(node.value));
      node = node.next;
    }
    console.log(result.join(' <-> '));
  }
}

export { DoublyLinkedList, DoublyLinkedNode };
