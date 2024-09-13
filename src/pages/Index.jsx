import React from 'react';
import CourseSearch from '@/components/CourseSearch';
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">课程查询系统</h1>
          <CourseSearch />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;