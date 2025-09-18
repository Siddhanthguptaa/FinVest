// src/components/landing/MarketTicker.tsx
'use client';

const marketData = [
  { name: 'NIFTY 50', price: '23,516.00', change: '+183.45', changePercent: '+0.78%' },
  { name: 'SENSEX', price: '77,337.59', change: '+308.37', changePercent: '+0.40%' },
  { name: 'RELIANCE', price: '2,959.00', change: '-21.55', changePercent: '-0.72%' },
  { name: 'TCS', price: '3,845.00', change: '+32.10', changePercent: '+0.84%' },
  { name: 'CRUDE OIL', price: '$80.52', change: '+$0.19', changePercent: '+0.24%' },
  { name: 'GOLD', price: '$2,325.80', change: '-$3.40', changePercent: '-0.15%' },
  { name: 'NASDAQ', price: '17,857.02', change: '+52.34', changePercent: '+0.29%' },
];

const TickerItem = ({ item, onInsightClick }: { item: typeof marketData[0], onInsightClick: Function }) => (
    <button 
        onClick={() => {
            const title = `✨ AI Analysis: ${item.name}`;
            const prompt = `Act as a senior financial analyst. Provide a brief, one-paragraph summary of the recent news, performance, and outlook for ${item.name}. Keep it concise and suitable for a quick overview.`;
            onInsightClick(title, prompt, 'display');
        }}
        className="flex items-center space-x-3 text-left p-2 rounded-lg hover:bg-gray-200/80 transition-colors duration-200 cursor-pointer"
    >
        <span className="text-gray-600 text-sm">{item.name}</span>
        <div className="flex flex-col items-end">
            <span className="text-slate-900 font-medium text-sm">{item.price}</span>
            <span className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {item.change} ({item.changePercent})
            </span>
        </div>
    </button>
);

export default function MarketTicker({ onInsightClick }: { onInsightClick: Function }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm py-2 border-y border-gray-200 overflow-hidden">
        <div className="w-full flex animate-marquee">
            <div className="flex items-center space-x-8 mx-4 flex-shrink-0">
                {marketData.map((item, index) => <TickerItem key={index} item={item} onInsightClick={onInsightClick} />)}
            </div>
            <div className="flex items-center space-x-8 mx-4 flex-shrink-0" aria-hidden="true">
                {marketData.map((item, index) => <TickerItem key={index + marketData.length} item={item} onInsightClick={onInsightClick} />)}
            </div>
        </div>
    </div>
  );
};