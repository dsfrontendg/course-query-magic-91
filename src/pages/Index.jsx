import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>课程查询系统</CardTitle>
          <CardDescription>点击下方按钮开始搜索课程</CardDescription>
        </CardHeader>
        <CardContent>
          <p>输入课程名称、教师姓名、学院和token来查询课程信息。</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearchClick} className="w-full">开始搜索</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;