import React from 'react';

import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import styles from './Messages.module.scss';
import Header from '../../elements/Header/Header';
import LeftSidebar from '../../elements/LeftSidebar/LeftSidebar';
import Chat from '../../elements/Chat/Chat';
import { getUsersByIds } from '../../../services/users';
import { url } from '../../../configs/config';
import robot from '../../../assets/images/gifs/hi-robot.gif';

function Messages() {
  const user = useSelector((state) => state.userReducer.user);
  const [receiver, setReceiver] = React.useState(undefined);

  const { data } = useQuery(['getUsersByIds', user.following], () => getUsersByIds(user.following));
  const following = data?.data || [];

  let content;
  if (user.following.length !== 0) {
    content = following.map((person) => (
      <div
        className={styles['following-block']}
        key={`${user.userId}-following-message-${person.userId}`}
        onClick={() => setReceiver({
          userId: person.userId,
          avatar: person.avatar,
          firstName: person.firstName,
          secondName: person.secondName
        })}
      >
        <img className="icon" src={`${url}/images/${person.avatar}`} alt={`${person.userId}-avatar`} />
        <div className={styles.name}>{person.firstName} {person.secondName}</div>
      </div>
    ));
  } else {
    content = <div className={styles['no-following']}>You don&apos;t follow anyone &#x1F61E;</div>;
  }

  return (
    <div className={styles.messages}>
      <Header />
      <LeftSidebar />
      <div className={styles['messages-container']}>
        <div className={styles.friends}>
          <p className={styles.title}>You are following</p>
          {content}
        </div>
        { receiver && (<Chat receiver={receiver} />) }
        { !receiver && (
          <div className={styles.welcome}>
            <img src={robot} alt="robot" />
            <p className={styles.text}>{`Welcome, ${user.firstName}`}</p>
            <p className={styles.text}>Please select a chat to Start Messaging</p>
            <p className={styles.text}>(or follow to someone if you didn&apos;t)</p>
          </div>
        ) }
      </div>
    </div>
  );
}

export default Messages;
