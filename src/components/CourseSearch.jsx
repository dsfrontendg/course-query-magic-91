import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, Loader2 } from 'lucide-react';
import { fetchCourseData } from '@/lib/api';

const CourseSearch = ({ onSubmit, showResults = false, initialParams = {}, isLoading = false }) => {
  const [searchParams, setSearchParams] = useState(initialParams);

  useEffect(() => {
    setSearchParams(initialParams);
  }, [initialParams]);

  const { data, isLoading: isQueryLoading, error, refetch } = useQuery({
    queryKey: ['courseData', searchParams],
    queryFn: () => fetchCourseData(searchParams),
    enabled: showResults,
    retry: false,
    onError: (error) => {
      console.log('CourseSearch: Error in useQuery', error);
      let errorMessage = "搜索失败，请重试";
      if (error.response) {
        console.log('CourseSearch: Error response', error.response);
        if (error.response.status === 429) {
          console.log('CourseSearch: Rate limit error');
          errorMessage = "请求过于频繁";
        } else if (error.response.status === 403) {
          errorMessage = "Token 无效";
        }
      } else {
        console.log('CourseSearch: Network error');
        errorMessage = "网络连接失败";
      }
      message.error({
        content: errorMessage,
        className: 'custom-message'
      });
    },
  });

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CourseSearch: handleSubmit called');
    if (!searchParams.token) {
      console.log('CourseSearch: Token is missing');
      message.error({
        content: "错误: Token 是必填项",
        className: 'custom-message'
      });
      return;
    }
    if (onSubmit) {
      console.log('CourseSearch: Calling onSubmit with params', searchParams);
      onSubmit(searchParams);
    } else {
      console.log('CourseSearch: Refetching data');
      refetch();
    }
  };

  console.log('CourseSearch: Rendering with showResults', showResults);

  return (
    <div>
      {!showResults && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="课程名称"
            value={searchParams.name}
            onChange={handleInputChange}
            className="bg-gray-700/50 backdrop-blur-lg border-gray-600 text-white placeholder-gray-400"
          />
          <Input
            type="text"
            name="teacher"
            placeholder="教师姓名"
            value={searchParams.teacher}
            onChange={handleInputChange}
            className="bg-gray-700/50 backdrop-blur-lg border-gray-600 text-white placeholder-gray-400"
          />
          <Input
            type="text"
            name="org"
            placeholder="学院"
            value={searchParams.org}
            onChange={handleInputChange}
            className="bg-gray-700/50 backdrop-blur-lg border-gray-600 text-white placeholder-gray-400"
          />
          <Input
            type="password"
            name="token"
            placeholder="Token (必填)"
            value={searchParams.token}
            onChange={handleInputChange}
            className="bg-gray-700/50 backdrop-blur-lg border-gray-600 text-white placeholder-gray-400"
            required
          />
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  搜索中...
                </>
              ) : (
                '搜索'
              )}
            </Button>
          </div>
        </form>
      )}

      {showResults && (
        <div>
          {isQueryLoading && <p className="text-gray-300 mt-4 text-center">加载中...</p>}
          
          {!isQueryLoading && error && (
            <p className="text-red-500 mt-4 text-center">搜索失败，请重试</p>
          )}
          
          {!isQueryLoading && !error && data && (
            <div className="mt-4 bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-300">课程名称</TableHead>
                    <TableHead className="text-gray-300">教师姓名</TableHead>
                    <TableHead className="text-gray-300">学院</TableHead>
                    <TableHead className="text-gray-300">学年学期</TableHead>
                    <TableHead className="text-gray-300">课程节次</TableHead>
                    <TableHead className="text-gray-300">链接</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((course, index) => (
                    <TableRow key={index} className="hover:bg-gray-700/50 transition-colors duration-200">
                      <TableCell className="text-gray-300">{course.course_name}</TableCell>
                      <TableCell className="text-gray-300">{course.tec_name}</TableCell>
                      <TableCell className="text-gray-300">{course.organ_name}</TableCell>
                      <TableCell className="text-gray-300">{course.year_term}</TableCell>
                      <TableCell className="text-gray-300">{course.leti_name}</TableCell>
                      <TableCell className="text-gray-300">
                        {course.url1 !== 'N/A' && (
                          <a href={course.url1} target="_blank" rel="noopener noreferrer" className="mr-2 text-purple-400 hover:text-purple-300">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {course.url2 !== 'N/A' && (
                          <a href={course.url2} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
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
      )}
    </div>
  );
};

export default CourseSearch;