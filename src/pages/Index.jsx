import React, { useState, useEffect } from 'react';
import { message, ConfigProvider } from 'antd';
import CourseSearch from '@/components/CourseSearch';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { fetchCourseData } from '@/lib/api';

const Index = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return { name: '', teacher: '', org: '', token: savedToken || '' };
  });

  const handleSearchSubmit = async (params) => {
    console.log('Index: handleSearchSubmit called with params', params);
    if (!params.token) {
      console.log('Index: Token is missing');
      message.error({
        content: "错误: Token 是必填项",
        className: 'custom-message'
      });
      return;
    }
    setIsLoading(true);
    setSearchParams(params);
    localStorage.setItem('token', params.token);
    sessionStorage.setItem('searchParams', JSON.stringify(params));
    
    try {
      console.log('Index: Fetching course data');
      const response = await fetchCourseData(params);
      console.log('Index: Fetch response', response);
      if (response && response.length > 0) {
        setShowSearch(false);
        setShowResults(true);
      } else {
        console.log('Index: No matching courses found');
        message.error({
          content: "没有找到匹配的课程",
          className: 'custom-message'
        });
      }
    } catch (error) {
      console.error('Index: Search error:', error);
      let errorMessage = "搜索失败，请重试";
      if (error.response) {
        console.log('Index: Error response', error.response);
        if (error.response.status === 403) {
          errorMessage = "Token 无效";
        } else if (error.response.status === 429) {
          errorMessage = "请求过于频繁";
        }
      } else if (error.request) {
        console.log('Index: No response received');
        errorMessage = "网络连接失败";
      }
      console.log('Index: Showing error message', errorMessage);
      message.error({
        content: errorMessage,
        className: 'custom-message'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSearch = () => {
    console.log('Index: Toggling search');
    if (!showSearch) {
      const savedParams = sessionStorage.getItem('searchParams');
      if (savedParams) {
        setSearchParams(JSON.parse(savedParams));
      }
    }
    setShowSearch(!showSearch);
    setShowResults(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Message: {
            contentBg: '#1f2937',
            contentColor: '#ffffff',
          },
        },
      }}
    >
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4 relative">
        {showSearch && (
          <Card className="w-full max-w-md shadow-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-6 text-center text-white">课程录播查询</h1>
              <CourseSearch onSubmit={handleSearchSubmit} initialParams={searchParams} isLoading={isLoading} />
            </CardContent>
          </Card>
        )}
        
        {showResults && (
          <Card className="w-full max-w-[95%] shadow-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center text-white">搜索结果</h2>
              <CourseSearch showResults={true} initialParams={searchParams} />
            </CardContent>
          </Card>
        )}
        
        <Button
          className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
          onClick={toggleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Search className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default Index;