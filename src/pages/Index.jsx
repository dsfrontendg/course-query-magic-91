import React from 'react';
import CourseSearch from '@/components/CourseSearch';
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg bg-white/10 backdrop-blur-lg">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">课程查询系统</h1>
          <CourseSearch />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;