import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from 'lucide-react';
import { fetchCourseData } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";

const CourseSearch = () => {
  const [searchParams, setSearchParams] = useState({ name: '', teacher: '', org: '', token: '' });
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['courseData', searchParams],
    queryFn: () => fetchCourseData(searchParams),
    enabled: false,
    retry: false,
    onError: (error) => {
      if (error.response) {
        if (error.response.status === 429) {
          toast({
            title: "错误",
            description: "请求过多，请稍后再试",
            variant: "destructive",
          });
        } else {
          toast({
            title: "错误",
            description: error.response.data.message || "发生未知错误",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "错误",
          description: "无法连接到服务器",
          variant: "destructive",
        });
      }
    },
  });

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearchTriggered(true);
    refetch();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="课程名称"
          value={searchParams.name}
          onChange={handleInputChange}
          className="bg-white/30 backdrop-blur-lg border-white/50 text-gray-800 placeholder-gray-600"
        />
        <Input
          type="text"
          name="teacher"
          placeholder="教师姓名"
          value={searchParams.teacher}
          onChange={handleInputChange}
          className="bg-white/30 backdrop-blur-lg border-white/50 text-gray-800 placeholder-gray-600"
        />
        <Input
          type="text"
          name="org"
          placeholder="学院"
          value={searchParams.org}
          onChange={handleInputChange}
          className="bg-white/30 backdrop-blur-lg border-white/50 text-gray-800 placeholder-gray-600"
        />
        <Input
          type="password"
          name="token"
          placeholder="Token"
          value={searchParams.token}
          onChange={handleInputChange}
          className="bg-white/30 backdrop-blur-lg border-white/50 text-gray-800 placeholder-gray-600"
        />
        <div className="flex justify-center">
          <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300">
            搜索
          </Button>
        </div>
      </form>

      {isLoading && <p className="text-gray-800 mt-4 text-center">加载中...</p>}
      
      {isSearchTriggered && !isLoading && !error && data && (
        <div className="mt-8 bg-white/20 backdrop-blur-lg rounded-lg p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-800">课程名称</TableHead>
                <TableHead className="text-gray-800">教师姓名</TableHead>
                <TableHead className="text-gray-800">学院</TableHead>
                <TableHead className="text-gray-800">学年学期</TableHead>
                <TableHead className="text-gray-800">课程节次</TableHead>
                <TableHead className="text-gray-800">链接</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((course, index) => (
                <TableRow key={index} className="hover:bg-white/30 transition-colors duration-200">
                  <TableCell className="text-gray-800">{course.course_name}</TableCell>
                  <TableCell className="text-gray-800">{course.tec_name}</TableCell>
                  <TableCell className="text-gray-800">{course.organ_name}</TableCell>
                  <TableCell className="text-gray-800">{course.year_term}</TableCell>
                  <TableCell className="text-gray-800">{course.leti_name}</TableCell>
                  <TableCell className="text-gray-800">
                    {course.url1 !== 'N/A' && (
                      <a href={course.url1} target="_blank" rel="noopener noreferrer" className="mr-2 text-purple-600 hover:text-purple-800">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {course.url2 !== 'N/A' && (
                      <a href={course.url2} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CourseSearch;