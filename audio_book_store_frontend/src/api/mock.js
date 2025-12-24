/**
 * Simple mock API that returns static JSON and a stable sample audio URL
 * so the app is fully functional without a backend.
 */
const sampleAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const mockBooks = [
  {
    id: '1',
    title: 'The Ocean Between',
    author: 'Ava Winters',
    description:
      'A captivating journey through distant shores and personal growth.',
    cover:
      'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop',
    price: 14.99,
    category: 'Fiction',
    duration: 36000,
    tracks: [
      { id: 't1', title: 'Chapter 1: Tides', duration: 600, previewUrl: sampleAudio },
      { id: 't2', title: 'Chapter 2: Drift', duration: 740, previewUrl: sampleAudio },
    ],
  },
  {
    id: '2',
    title: 'Mastering Focus',
    author: 'Jon Parker',
    description: 'Practical strategies to regain attention in a noisy world.',
    cover:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop',
    price: 19.99,
    category: 'Self-Help',
    duration: 28800,
    tracks: [
      { id: 't1', title: 'Intro', duration: 300, previewUrl: sampleAudio },
      { id: 't2', title: 'Clarity', duration: 920, previewUrl: sampleAudio },
    ],
  },
  {
    id: '3',
    title: 'Deep Space Diaries',
    author: 'Mina Cho',
    description: 'An astronaut’s log of wonder, peril, and discovery.',
    cover:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
    price: 17.49,
    category: 'Sci-Fi',
    duration: 40000,
    tracks: [
      { id: 't1', title: 'Launch', duration: 480, previewUrl: sampleAudio },
      { id: 't2', title: 'Starlit Silence', duration: 840, previewUrl: sampleAudio },
    ],
  },
  {
    id: '4',
    title: 'Calm Waters',
    author: 'Layla Noor',
    description: 'Mindfulness meditations inspired by the sea.',
    cover:
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=800&auto=format&fit=crop',
    price: 9.99,
    category: 'Wellness',
    duration: 18000,
    tracks: [
      { id: 't1', title: 'Breath of Tide', duration: 600, previewUrl: sampleAudio },
      { id: 't2', title: 'Shoreline Stillness', duration: 720, previewUrl: sampleAudio },
    ],
  },
];

let mockPurchases = [];

function delay(ms = 250) {
  return new Promise((r) => setTimeout(r, ms));
}

// PUBLIC_INTERFACE
export const mockApi = {
  async get(path) {
    await delay();
    if (path === '/audiobooks') return { items: mockBooks, total: mockBooks.length };
    if (path.startsWith('/audiobooks/')) {
      const id = path.split('/')[2];
      const book = mockBooks.find((b) => b.id === id);
      if (!book) throw new Error('Not found');
      if (path.endsWith('/preview')) {
        return { url: sampleAudio };
      }
      return book;
    }
    if (path === '/purchases') {
      return { items: mockPurchases };
    }
    throw new Error(`Unknown GET path in mock: ${path}`);
  },
  async post(path, body) {
    await delay();
    if (path === '/checkout') {
      const { cart, user } = body || {};
      const purchased = (cart?.items || []).map((ci) => ({
        id: ci.id,
        title: ci.title,
        author: ci.author,
        cover: ci.cover,
        tracks: ci.tracks,
      }));
      mockPurchases = [...purchased, ...mockPurchases];
      return { success: true, orderId: String(Date.now()), user };
    }
    throw new Error(`Unknown POST path in mock: ${path}`);
  },
};
