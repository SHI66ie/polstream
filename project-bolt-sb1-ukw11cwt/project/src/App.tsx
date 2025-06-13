import * as React from 'react';
import { Music, Users, TrendingUp, Wallet, Play, Heart, Share2, Plus, Search, Bell, Settings } from 'lucide-react';
import WalletConnect from './WalletConnect';

interface Artist {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  earnings: number;
  content: Content[];
}

interface Content {
  id: string;
  title: string;
  type: 'music' | 'video' | 'podcast';
  duration: string;
  plays: number;
  earnings: number;
  thumbnail: string;
}

interface Subscription {
  artistId: string;
  tier: 'basic' | 'premium' | 'exclusive';
  price: number;
  active: boolean;
}

function App() {
  const [currentView, setCurrentView] = React.useState<'browse' | 'artist-dashboard' | 'profile'>('browse');
  const [selectedArtist, setSelectedArtist] = React.useState<Artist | null>(null);
  const [userType, setUserType] = React.useState<'fan' | 'artist'>('fan');

  const mockArtists: Artist[] = [
    {
      id: '1',
      name: 'Luna Beats',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      followers: 12400,
      earnings: 2.45,
      content: [
        { id: '1', title: 'Midnight Vibes', type: 'music', duration: '3:42', plays: 8900, earnings: 0.89, thumbnail: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=300' },
        { id: '2', title: 'Electric Dreams', type: 'music', duration: '4:15', plays: 5600, earnings: 0.56, thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300' }
      ]
    },
    {
      id: '2',
      name: 'Cyber Phoenix',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      followers: 8900,
      earnings: 3.21,
      content: [
        { id: '3', title: 'Digital Sunrise', type: 'video', duration: '6:30', plays: 4200, earnings: 1.24, thumbnail: 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=300' }
      ]
    }
  ];

  const BrowseView = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">PolygonPlay</span>
              </div>
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search artists, tracks..."
                  className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-80"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentView('artist-dashboard')}
                className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
              >
                <Wallet className="w-4 h-4 inline mr-2" />
                Connect Wallet
              </button>
              <button 
                onClick={() => setUserType(userType === 'fan' ? 'artist' : 'fan')}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Switch to {userType === 'fan' ? 'Artist' : 'Fan'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Amazing 
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent"> Creators</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Support your favorite artists directly on the blockchain and get exclusive access to their latest content
          </p>
        </div>

        {/* Featured Artists */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArtists.map((artist) => (
              <div key={artist.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                   onClick={() => setSelectedArtist(artist)}>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{artist.name}</h3>
                    <p className="text-gray-400">{artist.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-teal-400 font-medium">{artist.earnings} MATIC earned</span>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Content */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Latest Releases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockArtists.flatMap(artist => artist.content).map((content) => (
              <div key={content.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="relative">
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </button>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-lg px-2 py-1 rounded text-xs text-white">
                    {content.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{content.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{content.plays.toLocaleString()} plays</span>
                    <span className="text-teal-400">{content.earnings} MATIC</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ArtistDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('browse')}
                className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
              >
                <Music className="w-6 h-6" />
                <span className="font-bold">PolygonPlay</span>
              </button>
              <div className="text-gray-400">|</div>
              <span className="text-white font-medium">Artist Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">This Month</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">5.67 MATIC</div>
            <div className="text-sm text-teal-400">+23% from last month</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-teal-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Subscribers</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">1,247</div>
            <div className="text-sm text-teal-400">+15 this week</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Play className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Total Plays</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">23.4K</div>
            <div className="text-sm text-teal-400">+8% this week</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Management */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Your Content</h2>
                <button className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Upload New</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {mockArtists[0].content.map((content) => (
                  <div key={content.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{content.title}</h3>
                        <p className="text-sm text-gray-400">{content.type} • {content.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{content.plays.toLocaleString()} plays</div>
                        <div className="text-sm text-teal-400">{content.earnings} MATIC earned</div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Upload Content</span>
                </button>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-lg transition-colors flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Manage Subscribers</span>
                </button>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Subscription Tiers</h3>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Basic</span>
                    <span className="text-teal-400">0.5 MATIC/month</span>
                  </div>
                  <p className="text-sm text-gray-400">Standard access</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Premium</span>
                    <span className="text-teal-400">1.5 MATIC/month</span>
                  </div>
                  <p className="text-sm text-gray-400">Early access + bonus content</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Exclusive</span>
                    <span className="text-teal-400">3.0 MATIC/month</span>
                  </div>
                  <p className="text-sm text-gray-400">Direct access + live sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <WalletConnect />
      {currentView === 'browse' && <BrowseView />}
      {currentView === 'artist-dashboard' && <ArtistDashboard />}
    </div>
  );
}

export default App;