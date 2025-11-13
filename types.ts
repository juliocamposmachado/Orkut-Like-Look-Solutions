
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
  avatarUrl: string;
  profilePictureUrl: string;
  status: 'online' | 'offline';
  personalQuote: string;
  aboutMe: string;
  whatMakesMeHappy: string;
  favoriteMovies: string;
  favoriteMusic: string;
  relationshipStatus: string;
  interests: string;
  friendIds: number[];
}

export interface Scrap {
  id: number;
  authorId: number;
  text: string;
  imageUrl?: string;
  timestamp: string;
}

export interface Testimonial {
  id: number;
  authorId: number;
  text: string;
  timestamp: string;
  status: 'approved' | 'pending';
}

export interface Community {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  memberCount: number;
  members: number[];
}

export interface CommunityTopic {
    id: number;
    communityId: number;
    authorId: number;
    title: string;
    createdAt: string;
}

export interface FeedPost {
  id: number;
  authorId: number;
  text: string;
  imageUrl?: string;
  likes: number;
  comments: { authorId: number; text: string }[];
  timestamp: string;
}

export interface Photo {
  id: number;
  albumId: number;
  url: string;
  caption: string;
  comments: { authorId: number; text: string }[];
}

export interface Message {
    id: number;
    authorId: number;
    text: string;
    timestamp: string;
}

export interface MessageThread {
    id: number;
    participantIds: number[];
    messages: Message[];
}
