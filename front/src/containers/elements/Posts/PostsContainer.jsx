import React from 'react';
import { /* useInfiniteQuery,  */useQuery } from 'react-query';
import Posts from '../../../components/elements/Posts/Posts';
import { getPosts } from '../../../services/posts';
import PostsLoading from '../../../components/elements/PostsLoading/PostsLoading';
// import { getUserById } from '../../../services/users';

function PostsContainer() {
  const { isLoading, isError, data } = useQuery('get posts', () => getPosts());
  /* const { isLoading, isError, data } = useInfiniteQuery('posts', ({ pageParam = 1 }) => getPosts(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      console.log(pages);
      return lastPage.info.page + 1;
    }
  }); */
  const posts = data?.data || [];

  /* React.useEffect(() => {
    let isFetching = false;
    function onScroll(event) {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

      if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        isFetching = true;
        console.log('hi');
        isFetching = false;
      }
    }

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []); */

  if (isLoading || isError) return (<PostsLoading />);
  // TODO: если нет постов - отображать соответствующий текст
  return (<Posts posts={posts} />);
}

export default PostsContainer;
