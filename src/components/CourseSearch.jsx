import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from 'lucide-react';
import { fetchCourseData } from '@/lib/api';

const CourseSearch = () => {
  const [searchParams, setSearchParams] = useState({ name: '', teacher: '', org: '', token: '' });
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['courseData', searchParams],
    queryFn: () => fetchCourseData(searchParams),
    enabled: isSearchTriggered,
  });

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearchTriggered(true);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="课程名称"
          value={searchParams.name}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="teacher"
          placeholder="教师姓名"
          value={searchParams.teacher}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="org"
          placeholder="学院"
          value={searchParams.org}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          name="token"
          placeholder="Token"
          value={searchParams.token}
          onChange={handleInputChange}
        />
        <Button type="submit">搜索</Button>
      </form>

      {isLoading && <p>加载中...</p>}
      {error && <p>发生错误: {error.message}</p>}
      
      {data && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>课程名称</TableHead>
              <TableHead>教师姓名</TableHead>
              <TableHead>学院</TableHead>
              <TableHead>学年学期</TableHead>
              <TableHead>课程节次</TableHead>
              <TableHead>链接</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.course_name}</TableCell>
                <TableCell>{course.tec_name}</TableCell>
                <TableCell>{course.organ_name}</TableCell>
                <TableCell>{course.year_term}</TableCell>
                <TableCell>{course.leti_name}</TableCell>
                <TableCell>
                  {course.url1 !== 'N/A' && (
                    <a href={course.url1} target="_blank" rel="noopener noreferrer" className="mr-2">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {course.url2 !== 'N/A' && (
                    <a href={course.url2} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CourseSearch;