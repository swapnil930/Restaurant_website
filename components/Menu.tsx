'use client'
import { Utensils } from "lucide-react";

const MenuSection = () => {
  const menuCategories = [
    {
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      items: [
        { name: 'Crispy Calamari', desc: 'Fresh squid with tangy aioli', price: '$12' },
        { name: 'Bruschetta', desc: 'Toasted bread with tomatoes & basil', price: '$8' },
        { name: 'Soup of the Day', desc: "Chef's special creation", price: '$7' }
      ]
    },
    {
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      items: [
        { name: 'Grilled Salmon', desc: 'Atlantic salmon with herb butter', price: '$28' },
        { name: 'Beef Tenderloin', desc: 'Premium cut with truffle sauce', price: '$35' },
        { name: 'Vegetable Risotto', desc: 'Creamy arborio rice with seasonal veggies', price: '$22' }
      ]
    },
    {
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
      items: [
        { name: 'Tiramisu', desc: 'Classic Italian coffee dessert', price: '$9' },
        { name: 'Chocolate Lava Cake', desc: 'Warm cake with molten center', price: '$10' },
        { name: 'Crème Brûlée', desc: 'Vanilla custard with caramelized sugar', price: '$8' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="text-center mb-16">
        <Utensils className="w-12 h-12 text-orange-500 mx-auto mb-4" />
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h2>
        <p className="text-slate-400 text-lg">Crafted with passion, served with love</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {menuCategories.map((section, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300 border border-slate-700 hover:border-orange-500/50"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={section.image} 
                alt={section.category}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-orange-500">{section.category}</h3>
              <div className="space-y-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-b border-slate-700 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <span className="text-orange-500 font-bold">{item.price}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default  MenuSection;