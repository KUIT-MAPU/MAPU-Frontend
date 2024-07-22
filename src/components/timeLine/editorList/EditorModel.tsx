import { EditorType } from "../../../types/EditorType";

const mockData: EditorType[] = [
  {
    id: 1,
    userId: 'alice123',
    img: 'https://via.placeholder.com/150',
    name: 'Alice',
    follower: [],
    map: [
      // Add map data relevant to Alice here if needed
    ],
  },
  {
    id: 2,
    userId: 'bob456',
    img: 'https://via.placeholder.com/150',
    name: 'Bob',
    follower: [],
    map: [
      // Add map data relevant to Bob here if needed
    ],
  },
  {
    id: 3,
    userId: 'charlie789',
    img: 'https://via.placeholder.com/150',
    name: 'Charlie',
    follower: [
      {
        id: 1,
        userId: 'alice123',
        img: 'https://via.placeholder.com/150',
        name: 'Alice',
        follower: [],
        map: []
      },
      {
        id: 2,
        userId: 'bob456',
        img: 'https://via.placeholder.com/150',
        name: 'Bob',
        follower: [],
        map: []
      }
    ],
    map: [
      // Add map data relevant to Charlie here if needed
    ],
  },
  {
    id: 4,
    userId: 'david101',
    img: 'https://via.placeholder.com/150',
    name: 'David',
    follower: [
      {
        id: 3,
        userId: 'charlie789',
        img: 'https://via.placeholder.com/150',
        name: 'Charlie',
        follower: [
          {
            id: 1,
            userId: 'alice123',
            img: 'https://via.placeholder.com/150',
            name: 'Alice',
            follower: [],
            map: []
          }
        ],
        map: []
      }
    ],
    map: [
      // Add map data relevant to David here if needed
    ],
  },
  {
    id: 5,
    userId: 'eva202',
    img: 'https://via.placeholder.com/150',
    name: 'Eva',
    follower: [
      {
        id: 1,
        userId: 'alice123',
        img: 'https://via.placeholder.com/150',
        name: 'Alice',
        follower: [],
        map: []
      }
    ],
    map: [
      // Add map data relevant to Eva here if needed
    ],
  },
];

export default mockData;