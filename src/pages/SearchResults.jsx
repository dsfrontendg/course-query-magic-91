import React from 'react';
import CourseSearch from '@/components/CourseSearch';

const SearchResults = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">课程查询系统</h1>
        <CourseSearch />
      </div>
    </div>
  );
};

export default SearchResults;