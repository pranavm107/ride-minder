
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import UserTypeSelector from '@/components/UserTypeSelector';
import { Bus, Clock, MapPin, User } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-brand-500" />,
      title: 'Real-Time Tracking',
      description: 'GPS-enabled buses provide live location updates with accurate ETAs.',
    },
    {
      icon: <Bus className="h-6 w-6 text-brand-500" />,
      title: 'Smart Routing',
      description: 'AI-optimized routes reduce travel time and maximize efficiency.',
    },
    {
      icon: <Clock className="h-6 w-6 text-brand-500" />,
      title: 'Instant Notifications',
      description: 'Get alerts about delays, route changes, and bus arrivals.',
    },
    {
      icon: <User className="h-6 w-6 text-brand-500" />,
      title: 'Personalized Experience',
      description: 'Custom schedules and settings based on your campus routine.',
    },
  ];
  
  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main>
        <Hero />
        
        <UserTypeSelector />
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Why Choose RideMinder
              </span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">Designed for Campus Life</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers innovative solutions tailored to the unique transportation needs of college campuses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <div 
                  key={feature.title}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="bg-brand-50 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Testimonials
              </span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">What Our Users Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The real-time tracking has been a game changer. I never have to wait in the cold for a bus that's running late.",
                  author: "Jamie Chen",
                  role: "Computer Science Student"
                },
                {
                  quote: "As a driver, the navigation system helps me optimize my route. The student pickup list keeps everything organized.",
                  author: "Marcus Johnson",
                  role: "Campus Bus Driver"
                },
                {
                  quote: "Our transportation costs have decreased significantly since implementing RideMinder's route optimization features.",
                  author: "Dr. Lisa Williams",
                  role: "Campus Transportation Director"
                }
              ].map((testimonial, i) => (
                <div 
                  key={i}
                  className="glass p-8 rounded-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 h-20 w-20 opacity-10 -rotate-12">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-full h-full text-brand-400" viewBox="0 0 24 24">
                      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.01.24-.496.128-.916.208-1.27.24-.35.033-.69.033-1.027 0-.338-.032-.77-.112-1.268-.24-.492-.128-.834-.208-.99-.24-.507-.112-1.03-.104-1.588.028-.558.13-1 .4-1.328.812-.46.6-.69 1.34-.69 2.22 0 .683.138 1.265.413 1.748.275.492.644.845 1.098 1.058.438.213.888.35 1.352.413.46.064.97.096 1.526.096.557 0 1.066-.032 1.527-.096.46-.062.914-.2 1.353-.413.447-.212.814-.566 1.098-1.058.275-.483.413-1.066.413-1.748zm11.96 0c0-.88-.23-1.618-.69-2.217-.326-.412-.77-.683-1.327-.812-.56-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.01.24-.495.128-.916.208-1.27.24-.354.033-.692.033-1.028 0-.336-.032-.77-.112-1.268-.24-.492-.128-.834-.208-.99-.24-.507-.112-1.03-.104-1.588.028-.557.13-1 .4-1.327.812-.46.6-.69 1.34-.69 2.22 0 .683.138 1.265.413 1.748.275.492.645.845 1.098 1.058.438.213.89.35 1.352.413.46.064.97.096 1.526.096.558 0 1.067-.032 1.528-.096.46-.062.913-.2 1.353-.413.445-.212.813-.566 1.097-1.058.274-.483.413-1.066.413-1.748z" />
                    </svg>
                  </div>
                  <p className="text-gray-800 mb-6 relative z-10">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-brand-200 flex items-center justify-center">
                      <span className="text-brand-700 font-medium text-sm">
                        {testimonial.author[0]}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-500 to-brand-600 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your campus transit?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join hundreds of schools improving their transportation systems with RideMinder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="px-8 py-3 rounded-full bg-white text-brand-600 font-medium hover:bg-gray-100 transition-colors shadow-md"
              >
                Request Demo
              </a>
              <a 
                href="#" 
                className="px-8 py-3 rounded-full bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
                  <Bus className="h-4 w-4" />
                </div>
                <span className="font-semibold text-lg">RideMinder</span>
              </div>
              <p className="text-sm">
                Revolutionizing campus transportation through innovative technology.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Features', 'Solutions', 'Pricing', 'Updates']
              },
              {
                title: 'Company',
                links: ['About', 'Careers', 'Contact', 'Partners']
              },
              {
                title: 'Resources',
                links: ['Blog', 'Help Center', 'Guides', 'API Docs']
              }
            ].map(section => (
              <div key={section.title}>
                <h3 className="font-medium text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2023 RideMinder. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
