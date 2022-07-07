import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../models/IPost";
// Используем RTK Query

export const postAPI = createApi({
  // ключ, который определяет текущий сервис
  reducerPath: "postAPI",
  // URL на который сервис будет отправлять запросы
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Post"],
  // Здесь описываем все эндпоинты,
  // в которые мы будем отправлять запросы
  // и как-то изменять наше состояние
  endpoints: (build) => ({
    // название метода: результат метода query || mutation
    // query - получает данные от сервера: GET
    // mutation - изменяет данные от сервера: POST/PUT
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit: number = 5) => ({
        url: `/posts`,
        params: {
          // добавит _limit в URL, и получим: https://jsonplaceholder.typicode.com/posts?_limit=5
          _limit: limit,
        },
      }),
      // Указываем, что данный эндпоинт работает с данным тегом
      // при получении данных указываем, этот эндпоинт обеспечивает доставку данных
      providesTags: (result) => ['Post'],
    }),
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts`,
        method: 'POST',
        body: post,
      }),
      // при создании поста указываем, что данные становятся не актуальными
      // соответственно RTK query должен эти данные получить
      // пост отрендерится, не требуя перезапуска страницы
      invalidatesTags: ['Post'],
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post,
        
      }),
      invalidatesTags: ['Post'],

    }),
    deletePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});
