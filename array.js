let users = [];
let loggedInUser = [];
let activeUserTasks = [];
let contacts = [
  {
    email: "anna@dev.com",
    id: "OGMwWIk1wZRNpgViWj1",
    color: "#45A7B2",
    createdAt: "2025-01-12T00:37:50.096Z",
    name: "Anna",
    password: "anna",
    phone: "234567891098",
  },
  {
    email: "bob@dev.com",
    id: "OGMwWIk1wZRNpgViWj2",
    color: "#A7B245",
    createdAt: "2025-01-12T00:38:50.096Z",
    name: "Bob",
    password: "bob",
    phone: "234567811111",
  },
  {
    email: "charlie@dev.com",
    id: "OGMwWIk1wZRNpgViWj3",
    color: "#B245A7",
    createdAt: "2025-01-12T00:39:50.096Z",
    name: "Charlie",
    password: "charlie",
    phone: "234567822222",
  },
  {
    email: "david@dev.com",
    id: "OGMwWIk1wZRNpgViWj4",
    color: "#45B2A7",
    createdAt: "2025-01-12T00:40:50.096Z",
    name: "David",
    password: "david",
    phone: "234567833333",
  },
  {
    email: "eva@dev.com",
    id: "OGMwWIk1wZRNpgViWj5",
    color: "#B2A745",
    createdAt: "2025-01-12T00:41:50.096Z",
    name: "Eva",
    password: "eva",
    phone: "234567844444",
  },
  {
    email: "frank@dev.com",
    id: "OGMwWIk1wZRNpgViWj6",
    color: "#A745B2",
    createdAt: "2025-01-12T00:42:50.096Z",
    name: "Frank",
    password: "frank",
    phone: "234567855555",
  },
  {
    email: "grace@dev.com",
    id: "OGMwWIk1wZRNpgViWj7",
    color: "#B2B245",
    createdAt: "2025-01-12T00:43:50.096Z",
    name: "Grace",
    password: "grace",
    phone: "234567866666",
  },
  {
    email: "henry@dev.com",
    id: "OGMwWIk1wZRNpgViWj8",
    color: "#45A745",
    createdAt: "2025-01-12T00:44:50.096Z",
    name: "Henry",
    password: "henry",
    phone: "234567877777",
  },
  {
    email: "ivy@dev.com",
    id: "OGMwWIk1wZRNpgViWj9",
    color: "#A745A7",
    createdAt: "2025-01-12T00:45:50.096Z",
    name: "Ivy",
    password: "ivy",
    phone: "234567888888",
  },
  {
    email: "jack@dev.com",
    id: "OGMwWIk1wZRNpgViWj10",
    color: "#B24545",
    createdAt: "2025-01-12T00:46:50.096Z",
    name: "Jack",
    password: "jack",
    phone: "234567899999",
  },
];

let tasks = [
  {
    id: "abc123",
    title: "Task 1",
    description: "Random description...",
    assigned_to: [contacts[5], contacts[7], contacts[3]],
    category: "technical-tasks",
    creator: "guest",
    due_date: "2025-01-11",
    prio: "urgent",
    state: "awaitFeedback",
    subtasks: [
      { id: "1", content: "Subtask 1 for Task 1", status: "open" },
      { id: "2", content: "Subtask 2 for Task 1", status: "closed" },
    ],
  },
  {
    id: "def456",
    title: "Task 2",
    description: "Another random description...",
    assigned_to: [contacts[2], contacts[3], contacts[4]],
    category: "user-story",
    creator: "guest",
    due_date: "2025-02-15",
    prio: "medium",
    state: "inProgress",
    subtasks: [{ id: "1", content: "Subtask 1 for Task 2", status: "open" }],
  },
  {
    id: "ghi789",
    title: "Task 3",
    description: "Yet another random description...",
    assigned_to: [contacts[5]],
    category: "technical-tasks",
    creator: "guest",
    due_date: "2025-03-20",
    prio: "low",
    state: "done",
    subtasks: [
      { id: "1", content: "Subtask 1 for Task 3", status: "open" },
      { id: "2", content: "Subtask 2 for Task 3", status: "open" },
      { id: "3", content: "Subtask 3 for Task 3", status: "closed" },
    ],
  },
  {
    id: "jkl012",
    title: "Task 4",
    description: "Description here...",
    assigned_to: [contacts[6], contacts[7]],
    category: "user-story",
    creator: "guest",
    due_date: "2025-04-10",
    prio: "urgent",
    state: "awaitFeedback",
    subtasks: [],
  },
  {
    id: "mno345",
    title: "Task 5",
    description: "Some description...",
    assigned_to: [contacts[8]],
    category: "technical-tasks",
    creator: "guest",
    due_date: "2025-05-30",
    prio: "medium",
    state: "inProgress",
    subtasks: [{ id: "1", content: "Subtask 1 for Task 5", status: "closed" }],
  },
  {
    id: "pqr678",
    title: "Task 6",
    description: "Random text...",
    assigned_to: [contacts[9]],
    category: "user-story",
    creator: "guest",
    due_date: "2025-06-15",
    prio: "low",
    state: "done",
    subtasks: [],
  },
  {
    id: "stu901",

    title: "Task 7",
    description: "Another description...",
    assigned_to: [contacts[0], contacts[1], contacts[2]],
    category: "technical-tasks",
    creator: "guest",
    due_date: "2025-07-25",
    prio: "urgent",
    state: "awaitFeedback",
    subtasks: [{ id: "1", content: "Subtask 1 for Task 7", status: "open" }],
  },
  {
    id: "vwx234",
    title: "Task 8",
    description: "New task description...",
    assigned_to: [contacts[3]],
    category: "user-story",
    creator: "guest",
    due_date: "2025-08-15",
    prio: "medium",
    state: "toDo",
    subtasks: [],
  },
  {
    id: "yzab567",
    title: "Task 9",
    description: "Another new task description...",
    assigned_to: [contacts[4], contacts[5]],
    category: "technical-tasks",
    creator: "guest",
    due_date: "2025-09-30",
    prio: "low",
    state: "toDo",
    subtasks: [
      { id: "1", content: "Subtask 1 for Task 9", status: "open" },
      { id: "2", content: "Subtask 2 for Task 9", status: "closed" },
    ],
  },
  {
    id: "cdef890",
    title: "Task 10",
    description: "Yet another new task description...",
    assigned_to: [contacts[6], contacts[7], contacts[8]],
    category: "user-story",
    creator: "guest",
    due_date: "2025-10-20",
    prio: "urgent",
    state: "toDo",
    subtasks: [],
  },
];
