
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import BatteryCard from '@/components/BatteryCard';
import { Battery, ChevronRight, Database, Layers } from 'lucide-react';
import { getBatteryGroupByName } from '@/services/BatteryGroups';
import { useToast } from '@/hooks/use-toast';

const BatteryGroupDetail = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [groupName, setGroupName] = useState<string>('');
  const [batteries, setBatteries] = useState<any[]>([]);
  
  useEffect(() => {
    if (name) {
      const decodedName = decodeURIComponent(name);
      setGroupName(decodedName);
      
      const group = getBatteryGroupByName(decodedName);
      
      if (group) {
        setBatteries(group.batteries);
      } else {
        toast({
          title: "Group Not Found",
          description: "The battery group you're looking for doesn't exist.",
          variant: "destructive"
        });
        navigate('/groups');
      }
    }
  }, [name, navigate, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-container">
          <div className="text-center mb-10 animate-fade-in">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-3">
              Group Detail
            </span>
            <h1 className="text-3xl md:text-4xl font-medium mb-4">{groupName}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Viewing all batteries in the {groupName} series.
            </p>
          </div>
          
          <div className="flex items-center mb-6">
            <Link to="/database" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <Database className="h-4 w-4 mr-1" />
              <span>Database</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <Link to="/groups" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <Layers className="h-4 w-4 mr-1" />
              <span>Groups</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-sm font-medium">{groupName}</span>
          </div>
          
          {batteries.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {batteries.map((battery, index) => (
                <div key={battery.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <BatteryCard battery={battery} isGroupView={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No batteries found in this group</p>
            </div>
          )}
          
          <div className="flex justify-center mt-8">
            <Link to="/groups" className="btn-secondary">
              Back to Groups
            </Link>
          </div>
        </div>
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

export default BatteryGroupDetail;
