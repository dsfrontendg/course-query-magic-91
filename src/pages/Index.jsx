import React, { useState, useEffect } from 'react';
import CourseSearch from '@/components/CourseSearch';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Index = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [searchParams, setSearchParams] = useState(() => {
    const savedParams = localStorage.getItem('searchParams');
    return savedParams ? JSON.parse(savedParams) : { name: '', teacher: '', org: '', token: '' };
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setSearchParams(prev => ({ ...prev, token: savedToken }));
    }
  }, []);

  const handleSearchSubmit = (params) => {
    setSearchParams(params);
    localStorage.setItem('searchParams', JSON.stringify(params));
    if (params.token) {
      localStorage.setItem('token', params.token);
    }
    setShowSearch(false);
    setShowResults(true);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setShowResults(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4 relative">
      {showSearch && (
        <Card className="w-full max-w-md shadow-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">课程查询系统</h1>
            <CourseSearch onSubmit={handleSearchSubmit} initialParams={searchParams} />
          </CardContent>
        </Card>
      )}
      
      {showResults && (
        <Card className="w-full max-w-4xl shadow-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">搜索结果</h2>
            <CourseSearch showResults={true} initialParams={searchParams} />
          </CardContent>
        </Card>
      )}
      
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
        onClick={toggleSearch}
      >
        <Search className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default Index;