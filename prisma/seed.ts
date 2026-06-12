import {prisma ,Diffculty} from "@/src/lib/prisma";

const problems = [
  // ─────────────────────────────────────────
  // ARRAYS
  // ─────────────────────────────────────────
  {
    title: "Two Sum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`. Each input has exactly one solution. You may not use the same element twice.

**Example:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[2,7,11,15]\n9",        expected_Output: "[0,1]",  is_Hidden: false },
      { input: "[3,2,4]\n6",            expected_Output: "[1,2]",  is_Hidden: false },
      { input: "[3,3]\n6",              expected_Output: "[0,1]",  is_Hidden: true  },
      { input: "[-1,-2,-3,-4]\n-6",     expected_Output: "[1,3]",  is_Hidden: true  },
      { input: "[1000000,1]\n1000001",  expected_Output: "[0,1]",  is_Hidden: true  },
    ],
  },
  {
    title: "Maximum Subarray",
    description: `Given an integer array \`nums\`, find the contiguous subarray with the largest sum and return its sum. (Kadane's Algorithm)

**Example:**
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected_Output: "6",  is_Hidden: false },
      { input: "[1]",                      expected_Output: "1",  is_Hidden: false },
      { input: "[-1]",                     expected_Output: "-1", is_Hidden: true  },
      { input: "[-2,-1]",                  expected_Output: "-1", is_Hidden: true  },
      { input: "[5,4,-1,7,8]",             expected_Output: "23", is_Hidden: true  },
    ],
  },
  {
    title: "Merge Intervals",
    description: `Given an array of intervals where \`intervals[i] = [start, end]\`, merge all overlapping intervals and return the resulting array.

**Example:**
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

**Constraints:**
- 1 <= intervals.length <= 10^4`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expected_Output: "[[1,6],[8,10],[15,18]]", is_Hidden: false },
      { input: "[[1,4],[4,5]]",                expected_Output: "[[1,5]]",                is_Hidden: false },
      { input: "[[1,4],[2,3]]",                expected_Output: "[[1,4]]",                is_Hidden: true  },
      { input: "[[1,4],[0,2],[3,5]]",           expected_Output: "[[0,5]]",                is_Hidden: true  },
      { input: "[[1,2],[3,4],[5,6]]",           expected_Output: "[[1,2],[3,4],[5,6]]",    is_Hidden: true  },
    ],
  },
  {
    title: "Product of Array Except Self",
    description: `Given an integer array \`nums\`, return an array where each element is the product of all other elements. Must run in O(n) without division.

**Example:**
Input: [1,2,3,4]
Output: [24,12,8,6]

**Constraints:**
- 2 <= nums.length <= 10^5`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,2,3,4]",     expected_Output: "[24,12,8,6]",      is_Hidden: false },
      { input: "[-1,1,0,-3,3]", expected_Output: "[0,0,9,0,0]",      is_Hidden: false },
      { input: "[2,3]",          expected_Output: "[3,2]",             is_Hidden: true  },
      { input: "[0,0]",          expected_Output: "[0,0]",             is_Hidden: true  },
      { input: "[1,2,3,4,5]",    expected_Output: "[120,60,40,30,24]", is_Hidden: true  },
    ],
  },
  {
    title: "Trapping Rain Water",
    description: `Given \`n\` non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.

**Example:**
Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

**Constraints:**
- n == height.length
- 0 <= height[i] <= 10^4`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected_Output: "6",  is_Hidden: false },
      { input: "[4,2,0,3,2,5]",              expected_Output: "9",  is_Hidden: false },
      { input: "[3,0,0,2,0,4]",              expected_Output: "10", is_Hidden: true  },
      { input: "[1,0,1]",                    expected_Output: "1",  is_Hidden: true  },
      { input: "[0,0,0]",                    expected_Output: "0",  is_Hidden: true  },
    ],
  },
  {
    title: "Sliding Window Maximum",
    description: `Given an array \`nums\` and integer \`k\`, return the max value in each sliding window of size k.

**Example:**
Input: nums=[1,3,-1,-3,5,3,6,7], k=3
Output: [3,3,5,5,6,7]

**Constraints:**
- Must run in O(n) using a deque`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,3,-1,-3,5,3,6,7]\n3", expected_Output: "[3,3,5,5,6,7]", is_Hidden: false },
      { input: "[1]\n1",                  expected_Output: "[1]",            is_Hidden: false },
      { input: "[9,11]\n2",               expected_Output: "[11]",           is_Hidden: true  },
      { input: "[4,-2]\n2",               expected_Output: "[4]",            is_Hidden: true  },
      { input: "[2,1,5,3,6,4,8,7]\n4",   expected_Output: "[5,6,6,8,8]",   is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // STRINGS
  // ─────────────────────────────────────────
  {
    title: "Valid Palindrome",
    description: `A phrase is a palindrome if after converting to lowercase and removing non-alphanumeric characters, it reads the same forward and backward.

**Example:**
Input: "A man, a plan, a canal: Panama"
Output: true

**Constraints:**
- 1 <= s.length <= 2 * 10^5`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "A man, a plan, a canal: Panama", expected_Output: "true",  is_Hidden: false },
      { input: "race a car",                     expected_Output: "false", is_Hidden: false },
      { input: " ",                              expected_Output: "true",  is_Hidden: true  },
      { input: "0P",                             expected_Output: "false", is_Hidden: true  },
      { input: "Was it a car or a cat I saw?",   expected_Output: "true",  is_Hidden: true  },
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

**Example:**
Input: "abcabcbb"
Output: 3

**Constraints:**
- 0 <= s.length <= 5 * 10^4`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "abcabcbb", expected_Output: "3", is_Hidden: false },
      { input: "bbbbb",    expected_Output: "1", is_Hidden: false },
      { input: "pwwkew",   expected_Output: "3", is_Hidden: true  },
      { input: "",         expected_Output: "0", is_Hidden: true  },
      { input: "dvdf",     expected_Output: "3", is_Hidden: true  },
    ],
  },
  {
    title: "Minimum Window Substring",
    description: `Given strings \`s\` and \`t\`, return the minimum window substring of \`s\` containing all characters of \`t\`. If none exists return "".

**Example:**
Input: s="ADOBECODEBANC", t="ABC"
Output: "BANC"

**Constraints:**
- Must run in O(m+n)`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "ADOBECODEBANC\nABC", expected_Output: "BANC", is_Hidden: false },
      { input: "a\na",              expected_Output: "a",    is_Hidden: false },
      { input: "a\naa",             expected_Output: "",     is_Hidden: true  },
      { input: "ab\nb",             expected_Output: "b",    is_Hidden: true  },
      { input: "cabwefgewcwaefgcf\ncae", expected_Output: "cwae", is_Hidden: true },
    ],
  },
  {
    title: "Longest Palindromic Substring",
    description: `Given a string \`s\`, return the longest palindromic substring.

**Example:**
Input: "babad"
Output: "bab"

**Constraints:**
- 1 <= s.length <= 1000
- Use expand around center approach O(n^2)`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "babad",   expected_Output: "bab",     is_Hidden: false },
      { input: "cbbd",    expected_Output: "bb",      is_Hidden: false },
      { input: "a",       expected_Output: "a",       is_Hidden: true  },
      { input: "racecar", expected_Output: "racecar", is_Hidden: true  },
      { input: "abacaba", expected_Output: "abacaba", is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // LINKED LIST
  // ─────────────────────────────────────────
  {
    title: "Reverse Linked List",
    description: `Given the head of a singly linked list, reverse it and return the reversed list.

**Example:**
Input: [1,2,3,4,5]
Output: [5,4,3,2,1]

**Constraints:**
- 0 <= number of nodes <= 5000
- Solve both iteratively and recursively`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,2,3,4,5]", expected_Output: "[5,4,3,2,1]", is_Hidden: false },
      { input: "[1,2]",       expected_Output: "[2,1]",        is_Hidden: false },
      { input: "[]",          expected_Output: "[]",           is_Hidden: true  },
      { input: "[1]",         expected_Output: "[1]",          is_Hidden: true  },
      { input: "[1,2,3]",     expected_Output: "[3,2,1]",      is_Hidden: true  },
    ],
  },
  {
    title: "Linked List Cycle",
    description: `Given the head of a linked list, determine if it has a cycle. Use Floyd's tortoise and hare algorithm.

**Example:**
Input: [3,2,0,-4], pos=1
Output: true

**Constraints:**
- Must run in O(1) space`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[3,2,0,-4]\n1", expected_Output: "true",  is_Hidden: false },
      { input: "[1,2]\n0",      expected_Output: "true",  is_Hidden: false },
      { input: "[1]\n-1",       expected_Output: "false", is_Hidden: true  },
      { input: "[1,2,3]\n-1",   expected_Output: "false", is_Hidden: true  },
      { input: "[1,2,3,4]\n2",  expected_Output: "true",  is_Hidden: true  },
    ],
  },
  {
    title: "Merge Two Sorted Lists",
    description: `Merge two sorted linked lists and return the merged sorted list.

**Example:**
Input: l1=[1,2,4], l2=[1,3,4]
Output: [1,1,2,3,4,4]

**Constraints:**
- 0 <= number of nodes <= 50`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", expected_Output: "[1,1,2,3,4,4]", is_Hidden: false },
      { input: "[]\n[]",           expected_Output: "[]",             is_Hidden: false },
      { input: "[]\n[0]",          expected_Output: "[0]",            is_Hidden: true  },
      { input: "[1,3,5]\n[2,4,6]", expected_Output: "[1,2,3,4,5,6]", is_Hidden: true  },
      { input: "[1]\n[2]",         expected_Output: "[1,2]",          is_Hidden: true  },
    ],
  },
  {
    title: "LRU Cache",
    description: `Design an LRU Cache with \`get(key)\` and \`put(key, value)\` both in O(1) time. Use a HashMap + Doubly Linked List.

**Example:**
capacity=2
put(1,1), put(2,2), get(1)→1, put(3,3), get(2)→-1

**Constraints:**
- 1 <= capacity <= 3000`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "2\n[[put,1,1],[put,2,2],[get,1],[put,3,3],[get,2],[put,4,4],[get,1],[get,3],[get,4]]", expected_Output: "[null,null,1,null,-1,null,1,3,4]", is_Hidden: false },
      { input: "1\n[[put,1,1],[get,1],[put,2,2],[get,1],[get,2]]",                                    expected_Output: "[null,1,null,-1,2]",               is_Hidden: false },
      { input: "2\n[[put,1,1],[put,2,2],[get,1],[put,3,3],[get,1],[get,2]]",                          expected_Output: "[null,null,1,null,1,-1]",           is_Hidden: true  },
      { input: "3\n[[put,1,1],[put,2,2],[put,3,3],[get,1],[put,4,4],[get,2]]",                        expected_Output: "[null,null,null,1,null,2]",         is_Hidden: true  },
      { input: "2\n[[put,2,1],[put,1,1],[put,2,3],[put,4,1],[get,1],[get,2]]",                        expected_Output: "[null,null,null,null,-1,3]",        is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // STACK & QUEUE
  // ─────────────────────────────────────────
  {
    title: "Valid Parentheses",
    description: `Given a string containing \`(\`, \`)\`, \`{\`, \`}\`, \`[\`, \`]\`, determine if it is valid. Open brackets must be closed in correct order.

**Example:**
Input: "()[]{}"
Output: true

**Constraints:**
- 1 <= s.length <= 10^4`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "()[]{}",  expected_Output: "true",  is_Hidden: false },
      { input: "(]",      expected_Output: "false", is_Hidden: false },
      { input: "{[]}",    expected_Output: "true",  is_Hidden: true  },
      { input: "([)]",    expected_Output: "false", is_Hidden: true  },
      { input: "",        expected_Output: "true",  is_Hidden: true  },
    ],
  },
  {
    title: "Daily Temperatures",
    description: `Given temperatures array, return array where each element is number of days until a warmer temperature. Use a monotonic stack.

**Example:**
Input: [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

**Constraints:**
- Must run in O(n)`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[73,74,75,71,69,72,76,73]", expected_Output: "[1,1,4,2,1,1,0,0]", is_Hidden: false },
      { input: "[30,40,50,60]",             expected_Output: "[1,1,1,0]",          is_Hidden: false },
      { input: "[30,60,90]",                expected_Output: "[1,1,0]",            is_Hidden: true  },
      { input: "[55,55,55]",                expected_Output: "[0,0,0]",            is_Hidden: true  },
      { input: "[89,62,70,58,47,47,46,76,100,70]", expected_Output: "[8,1,5,4,3,2,1,1,0,0]", is_Hidden: true },
    ],
  },
  {
    title: "Largest Rectangle in Histogram",
    description: `Given heights array representing histogram bars of width 1, return the area of the largest rectangle.

**Example:**
Input: [2,1,5,6,2,3]
Output: 10

**Constraints:**
- Use a stack-based O(n) approach`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[2,1,5,6,2,3]",     expected_Output: "10", is_Hidden: false },
      { input: "[2,4]",             expected_Output: "4",  is_Hidden: false },
      { input: "[1,1,1,1,1]",       expected_Output: "5",  is_Hidden: true  },
      { input: "[5,4,3,2,1]",       expected_Output: "9",  is_Hidden: true  },
      { input: "[6,7,5,2,4,5,9,3]", expected_Output: "16", is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // TREES
  // ─────────────────────────────────────────
  {
    title: "Maximum Depth of Binary Tree",
    description: `Given the root of a binary tree, return its maximum depth — number of nodes from root to farthest leaf.

**Example:**
Input: [3,9,20,null,null,15,7]
Output: 3

**Constraints:**
- Solve both recursively and iteratively (BFS)`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expected_Output: "3", is_Hidden: false },
      { input: "[1,null,2]",              expected_Output: "2", is_Hidden: false },
      { input: "[]",                      expected_Output: "0", is_Hidden: true  },
      { input: "[1]",                     expected_Output: "1", is_Hidden: true  },
      { input: "[1,2,3,4,5]",            expected_Output: "3", is_Hidden: true  },
    ],
  },
  {
    title: "Binary Tree Level Order Traversal",
    description: `Return level order traversal of binary tree node values (left to right, level by level). Use BFS with a queue.

**Example:**
Input: [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

**Constraints:**
- 0 <= nodes <= 2000`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expected_Output: "[[3],[9,20],[15,7]]", is_Hidden: false },
      { input: "[1]",                     expected_Output: "[[1]]",               is_Hidden: false },
      { input: "[]",                      expected_Output: "[]",                  is_Hidden: true  },
      { input: "[1,2,3,4,5]",            expected_Output: "[[1],[2,3],[4,5]]",   is_Hidden: true  },
      { input: "[0,2,4,1,null,3,-1,5,1,null,6,null,8]", expected_Output: "[[0],[2,4],[1,3,-1],[5,1,6,8]]", is_Hidden: true },
    ],
  },
  {
    title: "Validate Binary Search Tree",
    description: `Given the root of a binary tree, determine if it is a valid BST. Use min/max bounds approach.

**Example:**
Input: [2,1,3]
Output: true

**Constraints:**
- -2^31 <= node.val <= 2^31 - 1`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[2,1,3]",               expected_Output: "true",  is_Hidden: false },
      { input: "[5,1,4,null,null,3,6]", expected_Output: "false", is_Hidden: false },
      { input: "[1]",                   expected_Output: "true",  is_Hidden: true  },
      { input: "[2,2,2]",               expected_Output: "false", is_Hidden: true  },
      { input: "[5,4,6,null,null,3,7]", expected_Output: "false", is_Hidden: true  },
    ],
  },
  {
    title: "Binary Tree Maximum Path Sum",
    description: `A path is a sequence of connected nodes. Return the maximum path sum of any non-empty path. Path can start and end at any node.

**Example:**
Input: [-10,9,20,null,null,15,7]
Output: 42

**Constraints:**
- -1000 <= node.val <= 1000`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[-10,9,20,null,null,15,7]", expected_Output: "42", is_Hidden: false },
      { input: "[1,2,3]",                   expected_Output: "6",  is_Hidden: false },
      { input: "[-3]",                      expected_Output: "-3", is_Hidden: true  },
      { input: "[2,-1]",                    expected_Output: "2",  is_Hidden: true  },
      { input: "[5,4,8,11,null,13,4,7,2,null,null,null,1]", expected_Output: "48", is_Hidden: true },
    ],
  },
  {
    title: "Serialize and Deserialize Binary Tree",
    description: `Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.

**Example:**
Input: [1,2,3,null,null,4,5]
serialize → "1,2,3,null,null,4,5"
deserialize → [1,2,3,null,null,4,5]

**Constraints:**
- 0 <= nodes <= 10^4`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,2,3,null,null,4,5]", expected_Output: "[1,2,3,null,null,4,5]", is_Hidden: false },
      { input: "[]",                    expected_Output: "[]",                     is_Hidden: false },
      { input: "[1]",                   expected_Output: "[1]",                    is_Hidden: true  },
      { input: "[1,2]",                 expected_Output: "[1,2]",                  is_Hidden: true  },
      { input: "[1,null,2,null,3]",     expected_Output: "[1,null,2,null,3]",      is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // GRAPHS
  // ─────────────────────────────────────────
  {
    title: "Number of Islands",
    description: `Given an m×n grid of '1's (land) and '0's (water), return the number of islands. Use DFS or BFS.

**Example:**
Input: [["1","1","0"],["0","1","0"],["0","0","1"]]
Output: 2

**Constraints:**
- m, n >= 1`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: '[["1","1","0"],["0","1","0"],["0","0","1"]]', expected_Output: "2", is_Hidden: false },
      { input: '[["1","1","1"],["0","1","0"],["1","1","1"]]', expected_Output: "1", is_Hidden: false },
      { input: '[["0","0","0"]]',                             expected_Output: "0", is_Hidden: true  },
      { input: '[["1","0","1"],["0","1","0"],["1","0","1"]]', expected_Output: "5", is_Hidden: true  },
      { input: '[["1","1"],["1","1"]]',                       expected_Output: "1", is_Hidden: true  },
    ],
  },
  {
    title: "Course Schedule",
    description: `There are numCourses labeled 0 to n-1. Given prerequisites[i]=[a,b] meaning take b before a, return true if you can finish all courses. Detect cycle in directed graph.

**Example:**
Input: n=2, prerequisites=[[1,0]]
Output: true

**Constraints:**
- Use topological sort (Kahn's or DFS)`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "2\n[[1,0]]",              expected_Output: "true",  is_Hidden: false },
      { input: "2\n[[1,0],[0,1]]",        expected_Output: "false", is_Hidden: false },
      { input: "1\n[]",                   expected_Output: "true",  is_Hidden: true  },
      { input: "3\n[[0,1],[0,2],[1,2]]",  expected_Output: "true",  is_Hidden: true  },
      { input: "4\n[[1,0],[2,1],[3,2],[0,3]]", expected_Output: "false", is_Hidden: true },
    ],
  },
  {
    title: "Word Ladder",
    description: `Given beginWord, endWord and a wordList, return the number of words in the shortest transformation sequence. Each step changes exactly one letter and must exist in wordList.

**Example:**
Input: beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]
Output: 5

**Constraints:**
- Use BFS for shortest path`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: 'hit\ncog\n["hot","dot","dog","lot","log","cog"]', expected_Output: "5", is_Hidden: false },
      { input: 'hit\ncog\n["hot","dot","dog","lot","log"]',       expected_Output: "0", is_Hidden: false },
      { input: 'a\nc\n["a","b","c"]',                            expected_Output: "2", is_Hidden: true  },
      { input: 'hot\ndot\n["hot","dot"]',                        expected_Output: "2", is_Hidden: true  },
      { input: 'hot\ndog\n["hot","dog"]',                        expected_Output: "0", is_Hidden: true  },
    ],
  },
  {
    title: "Clone Graph",
    description: `Given a reference to a node in a connected undirected graph, return a deep copy of the graph. Use DFS or BFS with a visited HashMap.

**Example:**
Input: adjList=[[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]

**Constraints:**
- Use HashMap<Node, Node> to track cloned nodes`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[[2,4],[1,3],[2,4],[1,3]]", expected_Output: "[[2,4],[1,3],[2,4],[1,3]]", is_Hidden: false },
      { input: "[[]]",                       expected_Output: "[[]]",                       is_Hidden: false },
      { input: "[]",                         expected_Output: "[]",                         is_Hidden: true  },
      { input: "[[2],[1]]",                  expected_Output: "[[2],[1]]",                  is_Hidden: true  },
      { input: "[[2,3],[1,3],[1,2]]",        expected_Output: "[[2,3],[1,3],[1,2]]",        is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // DYNAMIC PROGRAMMING
  // ─────────────────────────────────────────
  {
    title: "Climbing Stairs",
    description: `You can climb 1 or 2 steps at a time. How many distinct ways to reach the top of n stairs? This is essentially Fibonacci.

**Example:**
Input: n=3
Output: 3 (1+1+1, 1+2, 2+1)

**Constraints:**
- 1 <= n <= 45`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "2",  expected_Output: "2",  is_Hidden: false },
      { input: "3",  expected_Output: "3",  is_Hidden: false },
      { input: "1",  expected_Output: "1",  is_Hidden: true  },
      { input: "5",  expected_Output: "8",  is_Hidden: true  },
      { input: "10", expected_Output: "89", is_Hidden: true  },
    ],
  },
  {
    title: "Coin Change",
    description: `Given coins of different denominations and an amount, return fewest coins to make up the amount. If not possible return -1.

**Example:**
Input: coins=[1,5,11], amount=15
Output: 3 (5+5+5) — note greedy fails here

**Constraints:**
- Must use bottom-up DP O(amount * coins)`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,5,11]\n15",  expected_Output: "3",  is_Hidden: false },
      { input: "[2]\n3",        expected_Output: "-1", is_Hidden: false },
      { input: "[1]\n0",        expected_Output: "0",  is_Hidden: true  },
      { input: "[1,2,5]\n11",   expected_Output: "3",  is_Hidden: true  },
      { input: "[186,419,83,408]\n6249", expected_Output: "20", is_Hidden: true },
    ],
  },
  {
    title: "Longest Common Subsequence",
    description: `Given two strings, return the length of their longest common subsequence. A subsequence maintains relative order but need not be contiguous.

**Example:**
Input: text1="abcde", text2="ace"
Output: 3

**Constraints:**
- Use 2D DP table O(m*n)`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "abcde\nace",   expected_Output: "3", is_Hidden: false },
      { input: "abc\nabc",     expected_Output: "3", is_Hidden: false },
      { input: "abc\ndef",     expected_Output: "0", is_Hidden: true  },
      { input: "oxcpqrsvwf\nshmtulqrypy", expected_Output: "2", is_Hidden: true },
      { input: "bsbininm\njmjkbkjkv",     expected_Output: "1", is_Hidden: true },
    ],
  },
  {
    title: "Edit Distance",
    description: `Given two strings word1 and word2, return the minimum operations (insert, delete, replace) to convert word1 to word2.

**Example:**
Input: word1="horse", word2="ros"
Output: 3

**Constraints:**
- Classic DP problem O(m*n)`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "horse\nros",          expected_Output: "3", is_Hidden: false },
      { input: "intention\nexecution",expected_Output: "5", is_Hidden: false },
      { input: "\n",                  expected_Output: "0", is_Hidden: true  },
      { input: "a\n",                 expected_Output: "1", is_Hidden: true  },
      { input: "zoologicoarchaeologist\nzoologist", expected_Output: "13", is_Hidden: true },
    ],
  },
  {
    title: "Burst Balloons",
    description: `Given n balloons with nums[i] on each, burst all and collect coins. Bursting balloon i gives nums[i-1]*nums[i]*nums[i+1] coins. Return max coins.

**Example:**
Input: [3,1,5,8]
Output: 167

**Constraints:**
- Use interval DP O(n^3)`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[3,1,5,8]", expected_Output: "167", is_Hidden: false },
      { input: "[1,5]",     expected_Output: "10",  is_Hidden: false },
      { input: "[1]",       expected_Output: "1",   is_Hidden: true  },
      { input: "[1,2,3,4]", expected_Output: "32",  is_Hidden: true  },
      { input: "[7,9,8,0,7,1,3,5,5,2,3]", expected_Output: "1654", is_Hidden: true },
    ],
  },
  {
    title: "House Robber",
    description: `Rob houses along a street. Cannot rob two adjacent houses. Given nums[i] = money in each house, return max you can rob.

**Example:**
Input: [2,7,9,3,1]
Output: 12

**Constraints:**
- O(n) time, O(1) space`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[2,7,9,3,1]", expected_Output: "12", is_Hidden: false },
      { input: "[1,2,3,1]",   expected_Output: "4",  is_Hidden: false },
      { input: "[0]",         expected_Output: "0",  is_Hidden: true  },
      { input: "[5,1,1,5]",   expected_Output: "10", is_Hidden: true  },
      { input: "[2,1,1,2]",   expected_Output: "4",  is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // HASHING
  // ─────────────────────────────────────────
  {
    title: "Contains Duplicate",
    description: `Given an integer array, return true if any value appears at least twice, false if every element is distinct.

**Example:**
Input: [1,2,3,1]
Output: true

**Constraints:**
- O(n) using HashSet`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,2,3,1]",   expected_Output: "true",  is_Hidden: false },
      { input: "[1,2,3,4]",   expected_Output: "false", is_Hidden: false },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expected_Output: "true", is_Hidden: true },
      { input: "[]",          expected_Output: "false", is_Hidden: true  },
      { input: "[1]",         expected_Output: "false", is_Hidden: true  },
    ],
  },
  {
    title: "Longest Consecutive Sequence",
    description: `Given an unsorted array, return the length of the longest consecutive elements sequence. Must run in O(n).

**Example:**
Input: [100,4,200,1,3,2]
Output: 4 (1,2,3,4)

**Constraints:**
- Use HashSet for O(1) lookups`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[100,4,200,1,3,2]",         expected_Output: "4", is_Hidden: false },
      { input: "[0,3,7,2,5,8,4,6,0,1]",     expected_Output: "9", is_Hidden: false },
      { input: "[]",                         expected_Output: "0", is_Hidden: true  },
      { input: "[1,2,0,1]",                  expected_Output: "3", is_Hidden: true  },
      { input: "[9,1,4,7,3,-1,0,5,8,-1,6]", expected_Output: "7", is_Hidden: true  },
    ],
  },
  {
    title: "Subarray Sum Equals K",
    description: `Given array nums and integer k, return total number of subarrays whose sum equals k. Use prefix sum + HashMap.

**Example:**
Input: nums=[1,1,1], k=2
Output: 2

**Constraints:**
- O(n) using prefix sum`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,1,1]\n2",   expected_Output: "2", is_Hidden: false },
      { input: "[1,2,3]\n3",   expected_Output: "2", is_Hidden: false },
      { input: "[1]\n0",       expected_Output: "0", is_Hidden: true  },
      { input: "[-1,-1,1]\n0", expected_Output: "1", is_Hidden: true  },
      { input: "[1,2,1,2,1]\n3", expected_Output: "4", is_Hidden: true },
    ],
  },
  {
    title: "Top K Frequent Elements",
    description: `Given array nums and integer k, return the k most frequent elements. Must be better than O(n log n) — use bucket sort.

**Example:**
Input: nums=[1,1,1,2,2,3], k=2
Output: [1,2]

**Constraints:**
- Use HashMap + bucket sort O(n)`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,1,1,2,2,3]\n2",      expected_Output: "[1,2]",   is_Hidden: false },
      { input: "[1]\n1",                 expected_Output: "[1]",     is_Hidden: false },
      { input: "[1,2]\n2",               expected_Output: "[1,2]",   is_Hidden: true  },
      { input: "[4,1,-1,2,-1,2,3]\n2",   expected_Output: "[-1,2]",  is_Hidden: true  },
      { input: "[5,5,5,3,3,1,1,1,1,1]\n3", expected_Output: "[1,5,3]", is_Hidden: true },
    ],
  },

  // ─────────────────────────────────────────
  // RECURSION & BACKTRACKING
  // ─────────────────────────────────────────
  {
    title: "Permutations",
    description: `Given an array of distinct integers, return all possible permutations using backtracking.

**Example:**
Input: [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

**Constraints:**
- 1 <= nums.length <= 6`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,2,3]", expected_Output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", is_Hidden: false },
      { input: "[0,1]",   expected_Output: "[[0,1],[1,0]]",                                      is_Hidden: false },
      { input: "[1]",     expected_Output: "[[1]]",                                              is_Hidden: true  },
      { input: "[1,2]",   expected_Output: "[[1,2],[2,1]]",                                      is_Hidden: true  },
      { input: "[1,2,3,4]", expected_Output: "24 permutations",                                  is_Hidden: true  },
    ],
  },
  {
    title: "Subsets",
    description: `Given an integer array of unique elements, return all possible subsets (the power set) using backtracking.

**Example:**
Input: [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

**Constraints:**
- 1 <= nums.length <= 10`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,2,3]", expected_Output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", is_Hidden: false },
      { input: "[0]",     expected_Output: "[[],[0]]",                                   is_Hidden: false },
      { input: "[1,2]",   expected_Output: "[[],[1],[2],[1,2]]",                         is_Hidden: true  },
      { input: "[]",      expected_Output: "[[]]",                                       is_Hidden: true  },
      { input: "[1,2,3,4]", expected_Output: "16 subsets",                               is_Hidden: true  },
    ],
  },
  {
    title: "N-Queens",
    description: `Place n queens on n×n chessboard so no two attack each other. Return all distinct board configurations. Q=queen, .=empty.

**Example:**
Input: n=4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

**Constraints:**
- 1 <= n <= 9`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "1", expected_Output: '[["Q"]]',                                                       is_Hidden: false },
      { input: "4", expected_Output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', is_Hidden: false },
      { input: "2", expected_Output: "[]",                                                            is_Hidden: true  },
      { input: "3", expected_Output: "[]",                                                            is_Hidden: true  },
      { input: "5", expected_Output: "10 solutions",                                                  is_Hidden: true  },
    ],
  },
  {
    title: "Regular Expression Matching",
    description: `Implement regex matching with '.' matching any single character and '*' matching zero or more of the preceding element.

**Example:**
Input: s="aab", p="c*a*b"
Output: true

**Constraints:**
- Use recursion with memoization`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "aa\na",      expected_Output: "false", is_Hidden: false },
      { input: "aa\na*",     expected_Output: "true",  is_Hidden: false },
      { input: "ab\n.*",     expected_Output: "true",  is_Hidden: true  },
      { input: "aab\nc*a*b", expected_Output: "true",  is_Hidden: true  },
      { input: "mississippi\nmis*is*p*.", expected_Output: "false", is_Hidden: true },
    ],
  },

  // ─────────────────────────────────────────
  // BINARY SEARCH
  // ─────────────────────────────────────────
  {
    title: "Binary Search",
    description: `Given a sorted array and a target, return the index of target. If not found return -1. Must run in O(log n).

**Example:**
Input: nums=[-1,0,3,5,9,12], target=9
Output: 4

**Constraints:**
- No duplicates in array`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[-1,0,3,5,9,12]\n9",  expected_Output: "4",  is_Hidden: false },
      { input: "[-1,0,3,5,9,12]\n2",  expected_Output: "-1", is_Hidden: false },
      { input: "[5]\n5",              expected_Output: "0",  is_Hidden: true  },
      { input: "[1,2,3,4,5]\n1",      expected_Output: "0",  is_Hidden: true  },
      { input: "[1,2,3,4,5]\n6",      expected_Output: "-1", is_Hidden: true  },
    ],
  },
  {
    title: "Search in Rotated Sorted Array",
    description: `Given a rotated sorted array with no duplicates and a target, return its index or -1 if not found. O(log n) required.

**Example:**
Input: nums=[4,5,6,7,0,1,2], target=0
Output: 4

**Constraints:**
- Must run in O(log n)`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[4,5,6,7,0,1,2]\n0", expected_Output: "4",  is_Hidden: false },
      { input: "[4,5,6,7,0,1,2]\n3", expected_Output: "-1", is_Hidden: false },
      { input: "[1]\n0",             expected_Output: "-1", is_Hidden: true  },
      { input: "[3,1]\n1",           expected_Output: "1",  is_Hidden: true  },
      { input: "[5,1,3]\n3",         expected_Output: "2",  is_Hidden: true  },
    ],
  },
  {
    title: "Median of Two Sorted Arrays",
    description: `Given two sorted arrays nums1 and nums2 of size m and n, return the median of the two sorted arrays. Must run in O(log(m+n)).

**Example:**
Input: nums1=[1,3], nums2=[2]
Output: 2.00000

**Constraints:**
- O(log(min(m,n))) using binary search on partition`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,3]\n[2]",       expected_Output: "2.00000", is_Hidden: false },
      { input: "[1,2]\n[3,4]",     expected_Output: "2.50000", is_Hidden: false },
      { input: "[0,0]\n[0,0]",     expected_Output: "0.00000", is_Hidden: true  },
      { input: "[]\n[1]",          expected_Output: "1.00000", is_Hidden: true  },
      { input: "[2]\n[]",          expected_Output: "2.00000", is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // TWO POINTERS
  // ─────────────────────────────────────────
  {
    title: "3Sum",
    description: `Given array nums, return all unique triplets that sum to zero. Sort + two pointers.

**Example:**
Input: [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

**Constraints:**
- No duplicate triplets in output`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expected_Output: "[[-1,-1,2],[-1,0,1]]", is_Hidden: false },
      { input: "[0,1,1]",          expected_Output: "[]",                    is_Hidden: false },
      { input: "[0,0,0]",          expected_Output: "[[0,0,0]]",             is_Hidden: true  },
      { input: "[-2,0,1,1,2]",     expected_Output: "[[-2,0,2],[-2,1,1]]",  is_Hidden: true  },
      { input: "[-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]", expected_Output: "[[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]", is_Hidden: true },
    ],
  },
  {
    title: "Container With Most Water",
    description: `Given heights array, find two lines that together with x-axis forms a container that holds the most water. Use two pointers.

**Example:**
Input: [1,8,6,2,5,4,8,3,7]
Output: 49

**Constraints:**
- O(n) two pointer approach`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expected_Output: "49", is_Hidden: false },
      { input: "[1,1]",               expected_Output: "1",  is_Hidden: false },
      { input: "[4,3,2,1,4]",         expected_Output: "16", is_Hidden: true  },
      { input: "[1,2,1]",             expected_Output: "2",  is_Hidden: true  },
      { input: "[2,3,4,5,18,17,6]",   expected_Output: "17", is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // HEAP / PRIORITY QUEUE
  // ─────────────────────────────────────────
  {
    title: "Kth Largest Element in Array",
    description: `Find the kth largest element in an unsorted array. Use a min-heap of size k or quickselect.

**Example:**
Input: nums=[3,2,1,5,6,4], k=2
Output: 5

**Constraints:**
- O(n log k) using min-heap`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[3,2,1,5,6,4]\n2",   expected_Output: "5", is_Hidden: false },
      { input: "[3,2,3,1,2,4,5,5,6]\n4", expected_Output: "4", is_Hidden: false },
      { input: "[1]\n1",             expected_Output: "1", is_Hidden: true  },
      { input: "[7,6,5,4,3,2,1]\n5", expected_Output: "3", is_Hidden: true  },
      { input: "[-1,-2,-3,-4,-5]\n2",expected_Output: "-2",is_Hidden: true  },
    ],
  },
  {
    title: "Merge K Sorted Lists",
    description: `Given an array of k sorted linked lists, merge all into one sorted list. Use a min-heap.

**Example:**
Input: [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]

**Constraints:**
- O(n log k) using priority queue`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", expected_Output: "[1,1,2,3,4,4,5,6]", is_Hidden: false },
      { input: "[]",                       expected_Output: "[]",                 is_Hidden: false },
      { input: "[[]]",                     expected_Output: "[]",                 is_Hidden: true  },
      { input: "[[1],[2],[3]]",            expected_Output: "[1,2,3]",            is_Hidden: true  },
      { input: "[[1,3],[2,5],[4,6]]",      expected_Output: "[1,2,3,4,5,6]",     is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // TRIE
  // ─────────────────────────────────────────
  {
    title: "Implement Trie",
    description: `Implement a Trie with insert(word), search(word), and startsWith(prefix) operations.

**Example:**
insert("apple"), search("apple")→true, search("app")→false, startsWith("app")→true

**Constraints:**
- 1 <= word.length <= 2000
- O(m) per operation where m = word length`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: '[[insert,"apple"],[search,"apple"],[search,"app"],[startsWith,"app"],[insert,"app"],[search,"app"]]', expected_Output: "[null,true,false,true,null,true]", is_Hidden: false },
      { input: '[[insert,"a"],[search,"a"]]',                                                                         expected_Output: "[null,true]",                    is_Hidden: false },
      { input: '[[insert,"abc"],[search,"ab"],[startsWith,"ab"]]',                                                    expected_Output: "[null,false,true]",               is_Hidden: true  },
      { input: '[[insert,"car"],[insert,"card"],[search,"card"],[search,"care"]]',                                    expected_Output: "[null,null,true,false]",           is_Hidden: true  },
      { input: '[[insert,"hello"],[startsWith,"hell"],[startsWith,"world"]]',                                         expected_Output: "[null,true,false]",               is_Hidden: true  },
    ],
  },
  {
    title: "Word Search II",
    description: `Given an m×n board of characters and a list of words, return all words that can be found in the board. Use Trie + DFS backtracking.

**Example:**
Input: board=[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words=["oath","pea","eat","rain"]
Output: ["eat","oath"]

**Constraints:**
- Use Trie for efficient prefix matching`,
    diffculty: Diffculty.hard,
    time_limit_ms: 2000,
    memory_limit_kb: 65536,
    testCases: [
      { input: '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]\n["oath","pea","eat","rain"]', expected_Output: '["eat","oath"]', is_Hidden: false },
      { input: '[["a","b"],["c","d"]]\n["abdc","abcd"]',                                                                 expected_Output: '["abcd"]',       is_Hidden: false },
      { input: '[["a"]]\n["a"]',                                                                                         expected_Output: '["a"]',           is_Hidden: true  },
      { input: '[["a","a"]]\n["aaa"]',                                                                                   expected_Output: '[]',              is_Hidden: true  },
      { input: '[["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]]\n["oa","oaa"]',                expected_Output: '["oa","oaa"]',    is_Hidden: true  },
    ],
  },

  // ─────────────────────────────────────────
  // BIT MANIPULATION
  // ─────────────────────────────────────────
  {
    title: "Single Number",
    description: `Given a non-empty array where every element appears twice except one, find that single one. Must use O(1) extra space.

**Example:**
Input: [4,1,2,1,2]
Output: 4

**Constraints:**
- Use XOR: a^a=0, a^0=a`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "[2,2,1]",     expected_Output: "1", is_Hidden: false },
      { input: "[4,1,2,1,2]", expected_Output: "4", is_Hidden: false },
      { input: "[1]",         expected_Output: "1", is_Hidden: true  },
      { input: "[0,1,0]",     expected_Output: "1", is_Hidden: true  },
      { input: "[17,12,17]",  expected_Output: "12",is_Hidden: true  },
    ],
  },
  {
    title: "Counting Bits",
    description: `Given an integer n, return an array ans of length n+1 where ans[i] is the number of 1s in the binary representation of i.

**Example:**
Input: n=5
Output: [0,1,1,2,1,2]

**Constraints:**
- O(n) DP: ans[i] = ans[i >> 1] + (i & 1)`,
    diffculty: Diffculty.easy,
    time_limit_ms: 1000,
    memory_limit_kb: 65536,
    testCases: [
      { input: "2", expected_Output: "[0,1,1]",         is_Hidden: false },
      { input: "5", expected_Output: "[0,1,1,2,1,2]",   is_Hidden: false },
      { input: "0", expected_Output: "[0]",              is_Hidden: true  },
      { input: "1", expected_Output: "[0,1]",            is_Hidden: true  },
      { input: "8", expected_Output: "[0,1,1,2,1,2,2,3,1]", is_Hidden: true },
    ],
  },
  {
    title: "Reverse Bits",
    description: `Reverse bits of a given 32-bit unsigned integer.

**Example:**
Input:  00000010100101000001111010011100
Output: 00111001011110000010100101000000 = 964176192

**Constraints:**
- Use bit manipulation, shift operators`,
    diffculty: Diffculty.medium,
    time_limit_ms: 1500,
    memory_limit_kb: 65536,
    testCases: [
      { input: "00000010100101000001111010011100", expected_Output: "964176192",  is_Hidden: false },
      { input: "11111111111111111111111111111101", expected_Output: "3221225471", is_Hidden: false },
      { input: "00000000000000000000000000000000", expected_Output: "0",          is_Hidden: true  },
      { input: "11111111111111111111111111111111", expected_Output: "4294967295", is_Hidden: true  },
      { input: "10000000000000000000000000000001", expected_Output: "2147483649", is_Hidden: true  },
    ],
  },
];

// ─────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────
async function seed() {
  console.log("🌱 Seeding 50 problems...\n");

  let count = 0;
  for (const p of problems) {
    const { testCases, ...problemData } = p;

    const created = await prisma.problem.create({
      data: {
        ...problemData,
        TestCases: {
          create: testCases.map((tc) => ({
            input: tc.input,
            expected_Output: tc.expected_Output,
            is_Hidden: tc.is_Hidden,
          })),
        },
      },
    });

    count++;
    console.log(`✅ [${count}/50] [${created.diffculty.toUpperCase()}] ${created.title}`);
  }

  console.log(`\n🎉 Done! Seeded ${count} problems with test cases.`);
  console.log(`
📊 Breakdown:
   Easy   → ${problems.filter(p => p.diffculty === Diffculty.easy).length} problems
   Medium → ${problems.filter(p => p.diffculty === Diffculty.medium).length} problems
   Hard   → ${problems.filter(p => p.diffculty === Diffculty.hard).length} problems

📚 Topics covered:
   Arrays, Strings, Linked List, Stack & Queue,
   Trees, Graphs, Dynamic Programming, Hashing,
   Recursion, Binary Search, Two Pointers,
   Heap, Trie, Bit Manipulation
  `);
}

seed()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });