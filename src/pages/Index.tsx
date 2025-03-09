
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Battery, Database, Plus, Search } from 'lucide-react';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24">
          <div className="max-container">
            <div className="flex flex-col items-center text-center animate-fade-in">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-6">
                <Battery className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl mb-6">
                Your Ultimate Cell Battery Database
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                Track, compare, and find the perfect batteries for your devices with our comprehensive database.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/database" className="btn-primary px-6 py-3 text-base">
                  Browse Database
                </Link>
                <Link to="/add" className="btn-secondary px-6 py-3 text-base">
                  Add New Battery
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-muted/50">
          <div className="max-container">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-12 animate-slide-up">What You Can Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Database className="h-8 w-8" />,
                  title: "Battery Database",
                  description: "Access a comprehensive collection of battery specifications and details."
                },
                {
                  icon: <Search className="h-8 w-8" />,
                  title: "Search & Filter",
                  description: "Find the exact battery you need with advanced search and filtering options."
                },
                {
                  icon: <Plus className="h-8 w-8" />,
                  title: "Add Batteries",
                  description: "Contribute to the database by adding new battery information."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24">
          <div className="max-container">
            <div className="flex flex-col items-center text-center space-y-6 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-medium">Ready to Explore?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Dive into our comprehensive battery database and find the perfect power solution.
              </p>
              <Link to="/database" className="btn-primary px-6 py-3 text-base flex items-center space-x-2">
                <span>Browse Batteries</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8">
        <div className="max-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-primary mb-4 md:mb-0">
              <Battery className="h-5 w-5" />
              <span className="font-medium">BatteryDB</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BatteryDB. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
