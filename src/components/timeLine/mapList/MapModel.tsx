import { MapType } from "../../../types/MapType";

const mockData: MapType[] = [
  {
    id: 1,
    name: '서울 관광 명소 지도',
    address: '서울특별시 중구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '동대문시장 골목맛집',
    editors: [
      { id: 1, userId: 'editor1', img: 'https://via.placeholder.com/150', name: 'Editor One', following: false },
      { id: 2, userId: 'editor2', img: 'https://via.placeholder.com/150', name: 'Editor Two', following: false },
      { id: 3, userId: 'editor3', img: 'https://via.placeholder.com/150', name: 'Editor Three', following: false },
    ],
    discription:'서울 관광 명소에 대한 설명',
    mapKeyword:['서울','관광','명소'],
    owner:{ id: 1, userId: 'editor1', img: 'https://via.placeholder.com/150', name: 'Editor One', following: false }
  },
  {
    id: 2,
    name: '서울의 맛집과 명소 지도',
    address: '서울특별시 강남구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '동대문시장 골목맛집',
    editors: [
      { id: 4, userId: 'editor4', img: 'https://via.placeholder.com/150', name: 'Editor Four', following: false },
      { id: 5, userId: 'editor5', img: 'https://via.placeholder.com/150', name: 'Editor Five', following: false },
      { id: 6, userId: 'editor6', img: 'https://via.placeholder.com/150', name: 'Editor Six', following: false },
    ],
    discription:'서울의 맛집과 명소 지도에 대한 설명',
    mapKeyword:['서울','맛집','명소'],
    owner:{ id: 1, userId: 'editor1', img: 'https://via.placeholder.com/150', name: 'Editor One', following: false }
  },
  {
    id: 3,
    name: '서울 핫플레이스 지도',
    address: '서울특별시 홍익동',
    img: 'https://via.placeholder.com/400x300',
    keywords: '동대문시장 골목맛집',
    editors: [
      { id: 7, userId: 'editor7', img: 'https://via.placeholder.com/150', name: 'Editor Seven', following: false },
      { id: 8, userId: 'editor8', img: 'https://via.placeholder.com/150', name: 'Editor Eight', following: false },
      { id: 9, userId: 'editor9', img: 'https://via.placeholder.com/150', name: 'Editor Nine', following: false },
    ],
    discription:'서울 핫플레이스 지도에 대한 설명',
    mapKeyword:['서울','핫플레이스'],
    owner:{ id: 1, userId: 'editor1', img: 'https://via.placeholder.com/150', name: 'Editor One', following: false }
  },
  {
    id: 4,
    name: '서울 힐링 여행 지도',
    address: '서울특별시 강남구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '동대문시장 골목맛집',
    editors: [
      { id: 10, userId: 'editor10', img: 'https://via.placeholder.com/150', name: 'Editor Ten', following: false },
      { id: 11, userId: 'editor11', img: 'https://via.placeholder.com/150', name: 'Editor Eleven', following: false },
      { id: 12, userId: 'editor12', img: 'https://via.placeholder.com/150', name: 'Editor Twelve', following: false },
    ],
    discription:'서울 힐링 여행 지도에 대한 설명',
    mapKeyword:['서울','힐링','여행'],
    owner:{ id: 1, userId: 'editor1', img: 'https://via.placeholder.com/150', name: 'Editor One', following: false }
  },
  {
    id: 5,
    name: '서울 문화 탐방 지도',
    address: '서울특별시 삼성동',
    img: 'https://via.placeholder.com/400x300',
    keywords: '동대문시장 골목맛집',
    editors: [
      { id: 13, userId: 'editor13', img: 'https://via.placeholder.com/150', name: 'Editor Thirteen', following: false },
      { id: 14, userId: 'editor14', img: 'https://via.placeholder.com/150', name: 'Editor Fourteen', following: false },
      { id: 15, userId: 'editor15', img: 'https://via.placeholder.com/150', name: 'Editor Fifteen', following: false },
    ],
  },
  {
    id: 6,
    name: '서울 자연과 함께하는 지도',
    address: '서울특별시 동대문구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '서울 타워 야경 관람',
    editors: [
      { id: 16, userId: 'editor16', img: 'https://via.placeholder.com/150', name: 'Editor Sixteen', following: false },
      { id: 17, userId: 'editor17', img: 'https://via.placeholder.com/150', name: 'Editor Seventeen', following: false },
      { id: 18, userId: 'editor18', img: 'https://via.placeholder.com/150', name: 'Editor Eighteen', following: false },
    ],
  },
  {
    id: 7,
    name: '서울 여행 가이드 지도',
    address: '서울특별시 용산구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '서울 타워 야경 관람',
    editors: [
      { id: 19, userId: 'editor19', img: 'https://via.placeholder.com/150', name: 'Editor Nineteen', following: false },
      { id: 20, userId: 'editor20', img: 'https://via.placeholder.com/150', name: 'Editor Twenty', following: false },
      { id: 21, userId: 'editor21', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-One', following: false },
    ],
  },
  {
    id: 8,
    name: '서울 여행 스팟 지도',
    address: '서울특별시 마포구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '서울 타워 야경 관람',
    editors: [
      { id: 22, userId: 'editor22', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-Two', following: false },
      { id: 23, userId: 'editor23', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-Three', following: false },
      { id: 24, userId: 'editor24', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-Four', following: false },
    ],
  },
  {
    id: 9,
    name: '서울 도보 여행 지도',
    address: '서울특별시 서초구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '강남역 카페 투어',
    editors: [
      { id: 25, userId: 'editor25', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-Five', following: false },
      { id: 26, userId: 'editor26', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-Six', following: false },
      { id: 27, userId: 'editor27', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-Seven', following: false },
    ],
  },
  {
    id: 10,
    name: '서울 야경 명소 지도',
    address: '서울특별시 종로구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '코엑스 쇼핑몰 쇼핑 추천',
    editors: [
      { id: 28, userId: 'editor28', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-Eight', following: false },
      { id: 29, userId: 'editor29', img: 'https://via.placeholder.com/150', name: 'Editor Twenty-Nine', following: false },
      { id: 30, userId: 'editor30', img: 'https://via.placeholder.com/150', name: 'Editor Thirty', following: false },
    ],
  },
  {
    id: 11,
    name: '서울 대중교통 지도',
    address: '서울특별시 강북구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '지하철역 근처 맛집',
    editors: [
      { id: 31, userId: 'editor31', img: 'https://via.placeholder.com/150', name: 'Editor Thirty-One', following: false },
      { id: 32, userId: 'editor32', img: 'https://via.placeholder.com/150', name: 'Editor Thirty-Two', following: false },
      { id: 33, userId: 'editor33', img: 'https://via.placeholder.com/150', name: 'Editor Thirty-Three', following: false },
    ],
  },
  {
    id: 12,
    name: '서울 공원과 정원 지도',
    address: '서울특별시 성동구',
    img: 'https://via.placeholder.com/400x300',
    keywords: '서울숲 한강공원',
    editors: [
      { id: 34, userId: 'editor34', img: 'https://via.placeholder.com/150', name: 'Editor Thirty-Four', following: false },
      { id: 35, userId: 'editor35', img: 'https://via.placeholder.com/150', name: 'Editor Thirty-Five', following: false },
      { id: 36, userId: 'editor36', img: 'https://via.placeholder.com/150', name: 'Editor Thirty-Six', following: false },
    ],
  },
];

export default mockData;
