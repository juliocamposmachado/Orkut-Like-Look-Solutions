
import React, { useState, useCallback, useEffect } from 'react';
import type { User, Scrap, Testimonial, Community, CommunityTopic, FeedPost, Photo, MessageThread } from './types';
import { users, scraps, testimonials, communities, communityTopics, feedPosts, photos, messageThreads } from './constants';

// FIX: Add a global declaration for the 'google' object on the window to resolve TypeScript errors.
declare global {
  interface Window {
    google: any;
  }
}

// --- ICONS --- //
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.5 5.5a3 3 0 00-3 0V12a2 2 0 00-2 2v1a2 2 0 002 2h3.5a2 2 0 002-2v-1a2 2 0 00-2-2v-.5zM15 6a3 3 0 11-6 0 3 3 0 016 0zm1.5 5.5a3 3 0 00-3 0V12a2 2 0 00-2 2v1a2 2 0 002 2h3.5a2 2 0 002-2v-1a2 2 0 00-2-2v-.5z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
const CommentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0zm10 2H8v-2h4v2zm-2-3H8V7h2v2z" clipRule="evenodd" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>;
const GoogleIcon = () => <svg viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.638 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>;


// --- ENUMS --- //
enum Page {
  LOGIN, HOME, PROFILE, COMMUNITIES, FRIENDS, SCRAPS, TESTIMONIALS, PHOTOS, MESSAGES, COMMUNITY_DETAIL
}

// --- UTILS --- //
const findUserById = (id: number): User | undefined => users.find(u => u.id === id);

// Quick and dirty JWT decoder
const jwtDecode = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};


// --- PAGE COMPONENTS --- //

const LoginPage: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLogin = () => {
    // In a real app, you'd have auth logic. Here we just log in as the first user.
    const user = users[0];
    if (user) {
      onLogin(user);
    }
  };

  const handleGoogleLogin = useCallback((response: any) => {
    const userObject = jwtDecode(response.credential);
    if (!userObject) return;

    // Create a new user profile based on Google's data
    const newUser: User = {
        id: new Date().getTime(), // A simple unique ID
        name: userObject.name,
        email: userObject.email,
        avatarUrl: userObject.picture,
        profilePictureUrl: userObject.picture,
        age: 0,
        city: 'Não especificado',
        status: 'online',
        personalQuote: 'Novo no Orkut Nostalgia!',
        aboutMe: '',
        whatMakesMeHappy: '',
        favoriteMovies: '',
        favoriteMusic: '',
        relationshipStatus: 'Não especificado',
        interests: '',
        friendIds: [],
    };
    onLogin(newUser);
  }, [onLogin]);


  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
        console.error("Google Client ID not found. Make sure you have set the REACT_APP_GOOGLE_CLIENT_ID environment variable.");
        const buttonContainer = document.getElementById("googleSignInButton");
        if(buttonContainer) {
            buttonContainer.innerHTML = '<p class="text-red-500 text-xs">Login com Google não configurado.</p>';
        }
        return;
    }

    if (window.google) {
        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleLogin,
        });

        window.google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large", text: "continue_with", shape: "pill", width: "320"}
        );
    }
  }, [handleGoogleLogin, GOOGLE_CLIENT_ID]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#B9D3EE]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-700" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          orkut nostalgia <span className="text-blue-500">💙</span>
        </h1>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-300 focus:border-pink-300 focus:z-10 sm:text-sm" placeholder="E-mail" defaultValue="ana@orkut.com" />
            </div>
            <div>
              <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-300 focus:border-pink-300 focus:z-10 sm:text-sm" placeholder="Senha" defaultValue="password" />
            </div>
          </div>
          <button type="button" onClick={handleLogin} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E6B0AA] hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
            Entrar
          </button>
          <div className="text-sm text-center">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Criar uma conta
            </a>
          </div>
        </form>

        <div className="flex items-center justify-center space-x-2">
            <hr className="w-full border-gray-300"/>
            <span className="text-gray-500 text-xs">OU</span>
            <hr className="w-full border-gray-300"/>
        </div>
        
        <div id="googleSignInButton" className="flex justify-center"></div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Lembre-se: quem você é importa. Seja você mesmo e espalhe amor.
        </p>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Atualizações dos amigos</h2>
            <div className="space-y-4">
                {feedPosts.map(post => {
                    const author = findUserById(post.authorId);
                    return (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex items-center mb-2">
                                <img src={author?.avatarUrl} alt={author?.name} className="w-10 h-10 rounded-full mr-3"/>
                                <div>
                                    <p className="font-bold text-blue-600">{author?.name}</p>
                                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                                </div>
                            </div>
                            <p className="text-gray-800 mb-3">{post.text}</p>
                            {post.imageUrl && <img src={post.imageUrl} alt="Post" className="rounded-lg w-full object-cover"/>}
                            <div className="flex items-center justify-start space-x-4 mt-3 text-gray-600">
                                <button className="flex items-center space-x-1 hover:text-[#E6B0AA]">
                                    <HeartIcon /> <span>{post.likes} Curtir</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-blue-500">
                                    <CommentIcon /> <span>{post.comments.length} Comentar</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ProfilePage: React.FC<{ user: User }> = ({ user }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            <img src={user.profilePictureUrl} alt={user.name} className="w-40 h-40 rounded-lg border-4 border-white shadow-md"/>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">{user.city}</p>
                <p className="text-gray-600">{user.age > 0 ? `${user.age} anos` : ''}</p>
                <p className="italic text-[#E6B0AA] mt-2">"{user.personalQuote}"</p>
            </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded"><strong>Relacionamento:</strong> {user.relationshipStatus}</div>
            <div className="bg-blue-50 p-3 rounded"><strong>Interesses:</strong> {user.interests}</div>
            <div className="bg-blue-50 p-3 rounded col-span-1 md:col-span-2"><strong>Quem sou eu:</strong> {user.aboutMe}</div>
            <div className="bg-pink-50 p-3 rounded col-span-1 md:col-span-2"><strong>O que me faz feliz:</strong> {user.whatMakesMeHappy}</div>
            <div className="bg-blue-50 p-3 rounded col-span-1 md:col-span-2"><strong>Filmes favoritos:</strong> {user.favoriteMovies}</div>
            <div className="bg-blue-50 p-3 rounded col-span-1 md:col-span-2"><strong>Músicas favoritas:</strong> {user.favoriteMusic}</div>
        </div>
    </div>
);

const CommunitiesPage: React.FC<{ navigateTo: (page: Page, data?: any) => void }> = ({ navigateTo }) => (
    <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Comunidades</h2>
        <div className="space-y-3">
            {communities.map(community => (
                <div key={community.id} className="bg-white p-3 rounded-lg shadow flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={community.imageUrl} alt={community.name} className="w-16 h-16 rounded mr-4"/>
                        <div>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(Page.COMMUNITY_DETAIL, community); }} className="font-bold text-blue-600 hover:underline">{community.name}</a>
                            <p className="text-xs text-gray-500">{community.memberCount.toLocaleString()} membros</p>
                        </div>
                    </div>
                    <button className="bg-[#B9D3EE] text-gray-700 font-semibold py-1 px-3 rounded-full text-sm hover:bg-blue-300">Participar</button>
                </div>
            ))}
        </div>
    </div>
);

const CommunityDetailPage: React.FC<{ community: Community }> = ({ community }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
                <img src={community.imageUrl} alt={community.name} className="w-20 h-20 rounded-lg mr-4"/>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{community.name}</h2>
                    <p className="text-gray-600">{community.description}</p>
                    <p className="text-sm text-gray-500">{community.memberCount.toLocaleString()} membros</p>
                </div>
            </div>
            <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-700">Tópicos de discussão</h3>
                    <button className="bg-[#E6B0AA] text-white font-bold py-2 px-4 rounded-full text-sm">Criar novo tópico</button>
                </div>
                <div className="space-y-2">
                    {communityTopics.filter(t => t.communityId === community.id).map(topic => {
                        const author = findUserById(topic.authorId);
                        return (
                            <div key={topic.id} className="p-3 bg-gray-50 rounded-md">
                                <p className="font-semibold text-blue-700">{topic.title}</p>
                                <p className="text-xs text-gray-500">por {author?.name} em {topic.createdAt}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const FriendsPage: React.FC = () => (
    <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Amigos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {users.filter(u => u.id !== 1).map(friend => (
                <div key={friend.id} className="text-center">
                    <div className="relative">
                        <img src={friend.avatarUrl} alt={friend.name} className="w-24 h-24 rounded-lg mx-auto shadow-md"/>
                        {friend.status === 'online' && <span className="absolute bottom-1 right-1 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>}
                    </div>
                    <p className="text-sm font-medium text-blue-600 mt-2">{friend.name}</p>
                </div>
            ))}
        </div>
    </div>
);

const ScrapsPage: React.FC = () => (
    <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Recados</h2>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-300 focus:border-pink-300" rows={3} placeholder="Deixe um recado..."></textarea>
            <div className="flex justify-end mt-2">
                <button className="bg-[#E6B0AA] text-white font-bold py-2 px-4 rounded-full text-sm">Enviar Recado</button>
            </div>
        </div>
        <div className="space-y-4">
            {scraps.map(scrap => {
                const author = findUserById(scrap.authorId);
                return (
                    <div key={scrap.id} className="bg-white p-4 rounded-lg shadow flex items-start space-x-3">
                        <img src={author?.avatarUrl} alt={author?.name} className="w-12 h-12 rounded-full"/>
                        <div className="flex-1">
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold text-blue-600">{author?.name}</p>
                                <p className="text-xs text-gray-400">{scrap.timestamp}</p>
                            </div>
                            <p className="text-gray-800 mt-1">{scrap.text}</p>
                            {scrap.imageUrl && <img src={scrap.imageUrl} alt="scrap" className="mt-2 rounded-lg"/>}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

const TestimonialsPage: React.FC = () => (
    <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Depoimentos</h2>
         <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="font-bold text-gray-700 mb-2">Escrever depoimento</h3>
            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-300 focus:border-pink-300" rows={3} placeholder="Escreva algo legal sobre esta pessoa..."></textarea>
            <div className="flex justify-end mt-2">
                <button className="bg-[#E6B0AA] text-white font-bold py-2 px-4 rounded-full text-sm">Enviar</button>
            </div>
        </div>
        
        <div className="space-y-4">
            {testimonials.map(testimonial => {
                const author = findUserById(testimonial.authorId);
                return (
                    <div key={testimonial.id} className="bg-white p-4 rounded-lg shadow">
                         <div className="flex items-start space-x-3">
                            <img src={author?.avatarUrl} alt={author?.name} className="w-12 h-12 rounded-full"/>
                            <div className="flex-1">
                                <p className="font-bold text-blue-600">{author?.name} <span className="font-normal text-gray-600">disse:</span></p>
                                <p className="italic text-gray-800 mt-1">"{testimonial.text}"</p>
                            </div>
                        </div>
                        {testimonial.status === 'pending' && (
                            <div className="flex justify-end space-x-2 mt-2">
                                <button className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">Aprovar</button>
                                <button className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full">Rejeitar</button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
);

const PhotosPage: React.FC = () => (
    <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Fotos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map(photo => (
                <div key={photo.id} className="aspect-w-1 aspect-h-1">
                    <img src={photo.url} alt={photo.caption} className="object-cover w-full h-full rounded-lg shadow-md cursor-pointer hover:opacity-80 transition-opacity"/>
                </div>
            ))}
        </div>
    </div>
);

const MessagesPage: React.FC = () => {
    const [currentThread, setCurrentThread] = useState<MessageThread | null>(messageThreads[0] || null);
    
    return (
        <div className="flex h-[calc(100vh-200px)]">
            <div className="w-1/3 border-r border-gray-200 bg-white rounded-l-lg overflow-y-auto">
                 <h2 className="text-xl font-bold text-gray-700 p-4 border-b">Mensagens</h2>
                {messageThreads.map(thread => {
                    const otherParticipant = findUserById(thread.participantIds.find(id => id !== 1) || 0);
                    return (
                        <div key={thread.id} onClick={() => setCurrentThread(thread)} className={`p-4 cursor-pointer flex items-center space-x-3 ${currentThread?.id === thread.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
                           <img src={otherParticipant?.avatarUrl} alt={otherParticipant?.name} className="w-12 h-12 rounded-full"/>
                           <div>
                                <p className="font-bold text-gray-800">{otherParticipant?.name}</p>
                                <p className="text-sm text-gray-500 truncate">{thread.messages[thread.messages.length - 1].text}</p>
                           </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-2/3 flex flex-col bg-white rounded-r-lg">
                {currentThread ? (
                     <>
                        <div className="p-4 border-b border-gray-200">
                             <h3 className="font-bold text-lg text-gray-800">{findUserById(currentThread.participantIds.find(id => id !== 1) || 0)?.name}</h3>
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                            {currentThread.messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.authorId === 1 ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.authorId === 1 ? 'bg-pink-200 text-gray-800' : 'bg-blue-200 text-gray-800'}`}>
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <input type="text" placeholder="Digite uma mensagem..." className="w-full p-2 border border-gray-300 rounded-full focus:ring-pink-300 focus:border-pink-300"/>
                        </div>
                    </>
                ) : <div className="flex-1 flex items-center justify-center text-gray-500">Selecione uma conversa para começar</div>}
            </div>
        </div>
    );
};


// --- MAIN APP & LAYOUT --- //

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>(Page.LOGIN);
  const [pageData, setPageData] = useState<any>(null);

  const navigateTo = useCallback((newPage: Page, data: any = null) => {
    setPage(newPage);
    setPageData(data);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    navigateTo(Page.HOME);
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo(Page.LOGIN);
  };

  const renderPage = () => {
    if (!currentUser) return null;
    switch (page) {
      case Page.HOME: return <HomePage />;
      case Page.PROFILE: return <ProfilePage user={currentUser} />;
      case Page.COMMUNITIES: return <CommunitiesPage navigateTo={navigateTo} />;
      case Page.COMMUNITY_DETAIL: return <CommunityDetailPage community={pageData} />;
      case Page.FRIENDS: return <FriendsPage />;
      case Page.SCRAPS: return <ScrapsPage />;
      case Page.TESTIMONIALS: return <TestimonialsPage />;
      case Page.PHOTOS: return <PhotosPage />;
      case Page.MESSAGES: return <MessagesPage />;
      default: return <HomePage />;
    }
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#DDE9F6] font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            orkut nostalgia <span className="text-blue-500">💙</span>
          </h1>
          <div className="hidden md:flex items-center space-x-4">
            <input type="text" placeholder="Busca..." className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:ring-pink-300 focus:border-pink-300"/>
            <nav className="flex items-center space-x-4 text-sm font-medium text-gray-600">
              <a href="#" onClick={() => navigateTo(Page.HOME)} className="flex items-center space-x-1 hover:text-[#E6B0AA]"><HomeIcon/><span>Home</span></a>
              <a href="#" onClick={() => navigateTo(Page.PROFILE)} className="flex items-center space-x-1 hover:text-[#E6B0AA]"><UserIcon/><span>Perfil</span></a>
              <a href="#" onClick={() => navigateTo(Page.MESSAGES)} className="flex items-center space-x-1 hover:text-[#E6B0AA]"><ChatIcon/><span>Mensagens</span></a>
              <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-[#E6B0AA]"><LogoutIcon/><span>Sair</span></button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-24 h-24 rounded-full mx-auto border-4 border-[#E6B0AA]"/>
            <h3 className="mt-2 font-bold text-lg text-blue-600">{currentUser.name}</h3>
            <p className="text-sm text-gray-500">{currentUser.city}</p>
          </div>
          <nav className="bg-white p-2 rounded-lg shadow">
            <ul className="space-y-1">
              {[
                { label: 'Perfil', page: Page.PROFILE, icon: <UserIcon/> },
                { label: 'Recados', page: Page.SCRAPS, icon: <ChatIcon/> },
                { label: 'Fotos', page: Page.PHOTOS, icon: <CameraIcon/> },
                { label: 'Depoimentos', page: Page.TESTIMONIALS, icon: <HeartIcon/> },
                { label: 'Amigos', page: Page.FRIENDS, icon: <UsersIcon/> },
                { label: 'Comunidades', page: Page.COMMUNITIES, icon: <UsersIcon/> },
              ].map(item => (
                <li key={item.label}>
                  <a href="#" onClick={() => navigateTo(item.page)} className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-[#B9D3EE] rounded-md transition-colors">
                    <span className="text-[#E6B0AA]">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Center Content */}
        <div className="lg:col-span-2">
            {renderPage()}
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
           <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-gray-700 mb-2">Sugestões de amigos</h4>
                <ul className="space-y-2">
                    {users.slice(1, 4).map(user => (
                        <li key={user.id} className="flex items-center space-x-2 text-sm">
                            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full"/>
                            <span className="text-blue-600">{user.name}</span>
                        </li>
                    ))}
                </ul>
           </div>
           <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-gray-700 mb-2">Comunidades populares</h4>
                 <ul className="space-y-2">
                    {communities.slice(0,3).map(c => (
                        <li key={c.id} className="flex items-center space-x-2 text-sm">
                             <img src={c.imageUrl} alt={c.name} className="w-8 h-8 rounded"/>
                             <span className="text-blue-600">{c.name}</span>
                        </li>
                    ))}
                 </ul>
           </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-600">
        <p>orkut nostalgia — feito com 💙 para quem sente saudade.</p>
        <p>O mundo é melhor com amigos 💙</p>
      </footer>
    </div>
  );
}
