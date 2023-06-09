import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserById } from '../../../services/users';
import { useLazyComponent } from '../../../hooks/useLazyComponent';
import Profile from '../../../components/pages/Profile/Profile';

const NotFoundLazy = useLazyComponent(() => import('../../../components/pages/NotFound/NotFound'));

function ProfileContainer() {
  const params = useParams();
  const { id } = params;

  if (typeof Number(id) === 'number' && !Number.isNaN(Number(id))) {
    const { isLoading, isError, data } = useQuery(['getUserById', id], () => getUserById(id));
    const user = data?.data || [];

    if (isLoading || isError) return null;

    return (
      <Profile
        userId={user.user_id}
        firstName={user.first_name}
        secondName={user.second_name}
        email={user.email}
        dateOfBirth={user.date_of_birth}
        gender={user.gender}
        country={user.country}
        phone={user.phone}
        avatar={user.avatar}
        coverPhoto={user.cover_photo}
        followers={user.followers}
        following={user.following}
        key={`profile-${user.user_id}`}
      />
    );
  }
  return <NotFoundLazy />;
}

export default ProfileContainer;
