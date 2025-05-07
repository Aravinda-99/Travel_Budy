import React from 'react';
import { Compass, PlusCircle } from 'lucide-react';

const PageHeader = ({ onOpenForm }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-3">
        <Compass className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Hotel Recommendations</h1>
          <p className="text-gray-500 mt-1">Discover and share amazing places to stay around the world</p>
        </div>
      </div>
      
      <button
        onClick={onOpenForm}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-sm"
      >
        <PlusCircle className="h-5 w-5" />
        <span>Add Recommendation</span>
      </button>
    </div>
  );
};

export default PageHeader;