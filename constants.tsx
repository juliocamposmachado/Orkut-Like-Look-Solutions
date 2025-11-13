
import type { User, Scrap, Testimonial, Community, CommunityTopic, FeedPost, Photo, MessageThread } from './types';

export const users: User[] = [
  {
    id: 1,
    name: "Ana Clara",
    email: "ana@orkut.com",
    age: 28,
    city: "São Paulo, SP",
    avatarUrl: "https://picsum.photos/seed/ana/100/100",
    profilePictureUrl: "https://picsum.photos/seed/anaprofile/400/400",
    status: 'online',
    personalQuote: "Vivendo, aprendendo e evoluindo. 🌻",
    aboutMe: "Sou uma pessoa que adora novas experiências, viajar pelo mundo e conhecer novas culturas. Amo um bom café e um livro.",
    whatMakesMeHappy: "O som da chuva, abraços apertados e chocolate quente.",
    favoriteMovies: "Clube da Luta, O Fabuloso Destino de Amélie Poulain, Forrest Gump.",
    favoriteMusic: "MPB, Rock clássico e um pouco de Indie.",
    relationshipStatus: "Namorando",
    interests: "Fotografia, Culinária, Yoga",
    friendIds: [2, 3, 4]
  },
  {
    id: 2,
    name: "Bruno Silva",
    email: "bruno@orkut.com",
    age: 32,
    city: "Rio de Janeiro, RJ",
    avatarUrl: "https://picsum.photos/seed/bruno/100/100",
    profilePictureUrl: "https://picsum.photos/seed/brunoprofile/400/400",
    status: 'online',
    personalQuote: "A vida é curta demais pra não ser aproveitada.",
    aboutMe: "Carioca da gema, apaixonado por praia, futebol e uma cerveja gelada com os amigos. Trabalho com design e nas horas vagas arrisco umas ondas no surf.",
    whatMakesMeHappy: "Um dia de sol na praia.",
    favoriteMovies: "Pulp Fiction, Cidade de Deus.",
    favoriteMusic: "Samba, Reggae.",
    relationshipStatus: "Solteiro",
    interests: "Surf, Futebol, Design Gráfico",
    friendIds: [1, 3]
  },
  {
    id: 3,
    name: "Carlos Eduardo",
    email: "carlos@orkut.com",
    age: 29,
    city: "Belo Horizonte, MG",
    avatarUrl: "https://picsum.photos/seed/carlos/100/100",
    profilePictureUrl: "https://picsum.photos/seed/carlosprofile/400/400",
    status: 'offline',
    personalQuote: "Keep it simple.",
    aboutMe: "Desenvolvedor de software que ama o que faz. Gosto de desafios lógicos, videogames e de descobrir novos restaurantes na cidade.",
    whatMakesMeHappy: "Código compilando de primeira.",
    favoriteMovies: "Matrix, A Origem.",
    favoriteMusic: "Eletrônica, Lo-fi.",
    relationshipStatus: "Em um relacionamento sério",
    interests: "Programação, Games, Gastronomia",
    friendIds: [1, 2, 4]
  },
    {
    id: 4,
    name: "Daniela Alves",
    email: "daniela@orkut.com",
    age: 27,
    city: "Salvador, BA",
    avatarUrl: "https://picsum.photos/seed/daniela/100/100",
    profilePictureUrl: "https://picsum.photos/seed/danielaprofile/400/400",
    status: 'online',
    personalQuote: "Seja a energia que você quer atrair.",
    aboutMe: "Artista plástica e amante do carnaval. Minha vida é movida a arte, música e axé. Acredito no poder do sorriso e da positividade.",
    whatMakesMeHappy: "Dançar até o sol raiar.",
    favoriteMovies: "Central do Brasil.",
    favoriteMusic: "Axé, MPB.",
    relationshipStatus: "Solteira",
    interests: "Pintura, Dança, Cultura afro-brasileira",
    friendIds: [1, 3]
  },
];

export const scraps: Scrap[] = [
    { id: 1, authorId: 2, text: "E aí, Ana! Tudo bem? Saudades das nossas conversas!", timestamp: "2 horas atrás" },
    { id: 2, authorId: 3, text: "Oie! Passando pra deixar um oi! 😊", timestamp: "5 horas atrás", imageUrl: "https://picsum.photos/seed/scrap/200/100" },
    { id: 3, authorId: 4, text: "Amiga, vamos marcar aquele café semana que vem?", timestamp: "1 dia atrás" },
];

export const testimonials: Testimonial[] = [
    { id: 1, authorId: 2, text: "Ana é uma pessoa incrível, super parceira e com uma energia contagiante. Sorte de quem tem ela por perto!", timestamp: "3 dias atrás", status: 'approved' },
    { id: 2, authorId: 3, text: "Conheci a Ana na faculdade e desde então é uma amizade pra vida. Sempre disposta a ajudar e com os melhores conselhos.", timestamp: "1 semana atrás", status: 'approved' },
    { id: 3, authorId: 4, text: "Uma pessoa iluminada! Recomendo a amizade haha ❤️", timestamp: "2 semanas atrás", status: 'pending' },
];

export const communities: Community[] = [
    { id: 1, name: "Eu Odeio Acordar Cedo", description: "Comunidade para todos que apertam o botão 'soneca' pelo menos 5 vezes.", imageUrl: "https://picsum.photos/seed/com1/80/80", memberCount: 134567, members: [1,2,3,4] },
    { id: 2, name: "Discografias Que Vc Mais Ouve", description: "Compartilhe e descubra novas discografias completas.", imageUrl: "https://picsum.photos/seed/com2/80/80", memberCount: 89042, members: [1,3] },
    { id: 3, name: "Eu amo Viajar", description: "Para os apaixonados por colocar o pé na estrada e conhecer o mundo.", imageUrl: "https://picsum.photos/seed/com3/80/80", memberCount: 254321, members: [1,4] },
    { id: 4, name: "Fãs de Cinema dos Anos 90", description: "Relembre os clássicos que marcaram uma geração.", imageUrl: "https://picsum.photos/seed/com4/80/80", memberCount: 56789, members: [2,3] },
];

export const communityTopics: CommunityTopic[] = [
    { id: 1, communityId: 1, authorId: 2, title: "Qual o seu recorde de 'sonecas'?", createdAt: "2024-07-28" },
    { id: 2, communityId: 1, authorId: 4, title: "Dicas para ter mais energia de manhã", createdAt: "2024-07-27" },
];


export const feedPosts: FeedPost[] = [
    { id: 1, authorId: 2, text: "Dia incrível na praia hoje! ☀️🌊 #Rio #Verão", imageUrl: "https://picsum.photos/seed/feed1/500/300", likes: 15, comments: [{authorId: 1, text: "Que foto linda!"}], timestamp: "30 minutos atrás" },
    { id: 2, authorId: 3, text: "Finalmente terminei aquele projeto gigante no trabalho. Sensação de dever cumprido! 💻🚀", likes: 22, comments: [], timestamp: "2 horas atrás" },
    { id: 3, authorId: 4, text: "Explorando as cores e sabores de Salvador. Bahia, sua linda! ❤️", imageUrl: "https://picsum.photos/seed/feed2/500/300", likes: 34, comments: [], timestamp: "1 dia atrás" },
];

export const photos: Photo[] = [
    { id: 1, albumId: 1, url: "https://picsum.photos/seed/photo1/600/400", caption: "Viagem para a Chapada Diamantina", comments: [] },
    { id: 2, albumId: 1, url: "https://picsum.photos/seed/photo2/600/400", caption: "Cachoeira da Fumaça", comments: [{ authorId: 2, text: "Lugar mágico!"}] },
    { id: 3, albumId: 1, url: "https://picsum.photos/seed/photo3/600/400", caption: "Pôr do sol no Morro do Pai Inácio", comments: [] },
    { id: 4, albumId: 2, url: "https://picsum.photos/seed/photo4/600/400", caption: "Com os amigos", comments: [] },
    { id: 5, albumId: 2, url: "https://picsum.photos/seed/photo5/600/400", caption: "Aniversário do Bruno", comments: [] },
    { id: 6, albumId: 2, url: "https://picsum.photos/seed/photo6/600/400", caption: "Festa junina", comments: [] },
];

export const messageThreads: MessageThread[] = [
    {
        id: 1,
        participantIds: [1, 2],
        messages: [
            { id: 1, authorId: 2, text: "Opa, tudo certo por aí?", timestamp: "10:30" },
            { id: 2, authorId: 1, text: "Tudo ótimo! E com você?", timestamp: "10:31" },
            { id: 3, authorId: 2, text: "Tudo tranquilo tb. Vi sua foto na praia, que inveja! haha", timestamp: "10:32" },
        ]
    },
    {
        id: 2,
        participantIds: [1, 4],
        messages: [
            { id: 1, authorId: 4, text: "Amigaaa, vamos no show sábado?", timestamp: "Ontem" },
            { id: 2, authorId: 1, text: "Opa, qual show??", timestamp: "Ontem" },
        ]
    }
];
