import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import styles from './Follow.module.scss';
import FilledButton from '../FilledButton/FilledButton';
import { getUserFollowers, updateFollowers, updateFollowing } from '../../../services/users';
import { setFollowing } from '../../../redux/slices/userSlice';

function Follow({
  // eslint-disable-next-line react/prop-types
  children, customClassName, followTo, action
}) {
  const followStyles = customClassName
    ? `${styles.follow} ${customClassName}`
    : styles.follow;

  const [isLoadingFollowing, setIsLoadingFollowing] = React.useState(false);
  const [isLoadingFollowers, setIsLoadingFollowers] = React.useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const { data: followToFollowers } = useQuery(['getUserFollowers', followTo], () => getUserFollowers(followTo));
  const followToFollowersData = followToFollowers?.data || [];

  const mutateHookFollowing = useMutation(
    ['updateFollowing', user.userId],
    (data) => updateFollowing(data),
    {
      onSuccess(res) {
        const following = res.data;
        dispatch(setFollowing(following));
        setIsLoadingFollowing(false);
      },
      onError() {
        setIsLoadingFollowing(false);
      }
    }
  );

  const mutateHookFollowers = useMutation(
    ['updateFollowers', followTo],
    (data) => updateFollowers(data),
    {
      onSuccess() {
        setIsLoadingFollowers(false);
      },
      onError() {
        setIsLoadingFollowers(false);
      }
    }
  );

  const onClickFollow = () => {
    if (isLoadingFollowing || isLoadingFollowers) return;
    setIsLoadingFollowing(true);
    setIsLoadingFollowers(true);

    const userFollowing = [...user.following, followTo];
    const userFollowers = [...followToFollowersData, user.userId];

    mutateHookFollowing.mutate({ userFollowing, userId: user.userId });
    mutateHookFollowers.mutate({ userFollowers, userId: followTo });
  };

  const onClickUnfollow = () => {
    if (isLoadingFollowing || isLoadingFollowers) return;
    setIsLoadingFollowing(true);
    setIsLoadingFollowers(true);

    const userFollowing = [...user.following];
    const userFollowers = [...followToFollowersData];
    const index = userFollowing.indexOf(followTo);
    const indexFollowers = userFollowers.indexOf(user.userId);

    if (index > -1) {
      userFollowing.splice(index, 1);
    }

    if (indexFollowers > -1) {
      userFollowers.splice(indexFollowers, 1);
    }

    mutateHookFollowing.mutate({ userFollowing, userId: user.userId });
    mutateHookFollowers.mutate({ userFollowers, userId: followTo });
  };

  return (
    <FilledButton customClassName={followStyles} onClick={action === 'follow' ? onClickFollow : onClickUnfollow}>
      {children}
    </FilledButton>
  );
}

export default Follow;
