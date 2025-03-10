
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BatteryDetailHeader: React.FC = () => {
  return (
    <div className="mb-8 animate-slide-down">
      <Link to="/database" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Database
      </Link>
    </div>
  );
};

export default BatteryDetailHeader;
