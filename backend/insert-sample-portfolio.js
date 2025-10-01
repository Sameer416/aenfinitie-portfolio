node server.jsconst mongoose = require('mongoose');

// Replace with your actual MongoDB connection string
const mongoUri = 'mongodb+srv://root:root@cluster0.ljr0sfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const portfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  gradient: String,
  icon: String,
  tags: [{ text: String, color: String }],
  image: String
});

const PortfolioItem = mongoose.model('PortfolioItem', portfolioSchema);

const sampleItems = [
  {
    title: "Custom & CMS Development",
    description: "Bespoke websites and CMS solutions tailored for business needs, including WordPress, Shopify, and custom platforms.",
    category: "cms",
    gradient: "from-blue-400 to-purple-500",
    icon: '<svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path></svg>',
    tags: [
      { text: "WordPress", color: "bg-blue-100 text-blue-800" },
      { text: "Shopify", color: "bg-green-100 text-green-800" },
      { text: "Custom", color: "bg-purple-100 text-purple-800" },
      { text: "React", color: "bg-yellow-100 text-yellow-800" },
      { text: "Etc", color: "bg-orange-100 text-orange-800" }
    ],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "UI/UX Designing & Branding",
    description: "Creative design solutions including UI/UX, branding, and visual identity for digital products and businesses.",
    category: "uiux",
    gradient: "from-indigo-400 to-pink-500",
    icon: '<svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
    tags: [
      { text: "UI/UX", color: "bg-pink-100 text-pink-800" },
      { text: "Branding", color: "bg-orange-100 text-orange-800" },
      { text: "Web design", color: "bg-purple-100 text-purple-800" },
      { text: "Graphics design", color: "bg-blue-100 text-blue-800" },
      { text: "Trade show booth design", color: "bg-green-100 text-green-800" }
    ],
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Marketing & Digital Solutions",
    description: "Boosted organic traffic, lead generation, and brand awareness for SaaS and e-commerce companies.",
    category: "marketing",
    gradient: "from-pink-400 to-red-500",
    icon: '<svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path></svg>',
    tags: [
      { text: "SEO", color: "bg-purple-100 text-purple-800" },
      { text: "Digital Marketing", color: "bg-pink-100 text-pink-800" },
      { text: "PPC", color: "bg-green-100 text-green-800" },
      { text: "Paid ads", color: "bg-blue-100 text-blue-800" }
    ],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
  }
];

async function insertSamples() {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await PortfolioItem.deleteMany({}); // Optional: clear existing items
    await PortfolioItem.insertMany(sampleItems);
    console.log('Sample portfolio items inserted!');
    process.exit(0);
  } catch (err) {
    console.error('Error inserting sample items:', err);
    process.exit(1);
  }
}

insertSamples();
