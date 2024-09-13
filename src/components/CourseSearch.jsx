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
          className="bg-white/20 backdrop-blur-lg border-white/30 text-white placeholder-white/70"
        />
        <Input
          type="text"
          name="teacher"
          placeholder="教师姓名"
          value={searchParams.teacher}
          onChange={handleInputChange}
          className="bg-white/20 backdrop-blur-lg border-white/30 text-white placeholder-white/70"
        />
        <Input
          type="text"
          name="org"
          placeholder="学院"
          value={searchParams.org}
          onChange={handleInputChange}
          className="bg-white/20 backdrop-blur-lg border-white/30 text-white placeholder-white/70"
        />
        <Input
          type="password"
          name="token"
          placeholder="Token"
          value={searchParams.token}
          onChange={handleInputChange}
          className="bg-white/20 backdrop-blur-lg border-white/30 text-white placeholder-white/70"
        />
        <div className="flex justify-center">
          <Button type="submit" className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300">
            搜索
          </Button>
        </div>
      </form>

      {isLoading && <p className="text-white mt-4 text-center">加载中...</p>}
      
      {isSearchTriggered && !isLoading && !error && data && (
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">课程名称</TableHead>
                <TableHead className="text-white">教师姓名</TableHead>
                <TableHead className="text-white">学院</TableHead>
                <TableHead className="text-white">学年学期</TableHead>
                <TableHead className="text-white">课程节次</TableHead>
                <TableHead className="text-white">链接</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((course, index) => (
                <TableRow key={index} className="hover:bg-white/20 transition-colors duration-200">
                  <TableCell className="text-white">{course.course_name}</TableCell>
                  <TableCell className="text-white">{course.tec_name}</TableCell>
                  <TableCell className="text-white">{course.organ_name}</TableCell>
                  <TableCell className="text-white">{course.year_term}</TableCell>
                  <TableCell className="text-white">{course.leti_name}</TableCell>
                  <TableCell className="text-white">
                    {course.url1 !== 'N/A' && (
                      <a href={course.url1} target="_blank" rel="noopener noreferrer" className="mr-2 text-white hover:text-purple-200">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {course.url2 !== 'N/A' && (
                      <a href={course.url2} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-200">
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