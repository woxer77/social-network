import React from 'react';

import styles from './Main.module.scss';

import PostAdding from '../PostAdding/PostAdding';
import PostContainer from '../../../containers/elements/Post/PostContainer';
// TODO: добавить бд
// TODO: подумать как хранить изображения в posts
// TODO: подумать как хранить время (часовой пояс)
// TODO: развернуть api express приложение
// TODO: через middleware multer сделать загрузку изображений

const authorName1 = 'Denis Ohrimenko';
const authorName2 = 'Philipp Sarilat';
const authorName3 = 'Frederico Melicent';
const authorName4 = 'John Carpentry';
const authorName5 = 'Vinchenco Camado';
const authorName6 = 'Richard Falko';

const text1 = 'text1text1text1text1text1text1text1text1text1';
const text2 = 'text2text2';
const text3 = 'text3text3text3text3text3text3text3text3text3text3text3text3text3text3text3text3text3text3';
const text4 = 'text4text4text4text4text4text4text4text4text4text4';
const text5 = 'text5text5text5text5';
const text6 = 'text6';

const availability1 = 'for all';
const availability2 = 'for all';
const availability3 = 'for me';
const availability4 = 'for me';
const availability5 = 'for all';
const availability6 = 'for friends';

const itemData1 = [
  {
    img: 'https://images.unsplash.com/photo-1659933263268-365993789d63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
];

const itemData2 = [
  {
    img: 'https://images.unsplash.com/photo-1659935275716-69e12c6499e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659893862922-1a77e280cf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
];

const itemData3 = [
  {
    img: 'https://images.unsplash.com/photo-1659889711813-f48421eeb8f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659879003660-3decb5819bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659624950451-8b8d89c00723?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
];

const itemData4 = [
  {
    img: 'https://images.unsplash.com/photo-1659875459585-5153b9535c6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659875459322-43b970c6642e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659631559620-934edaad620c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659592516254-c00ca7af3db4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  }
];

const itemData5 = [
  {
    img: 'https://images.unsplash.com/photo-1659877896436-c68914c0b348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1607100800921-9a0f93e88312?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1657299170950-9da95993c9ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659812903039-d577a4844802?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659846960718-aab68e05fdc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
];

const itemData6 = [
  {
    img: 'https://images.unsplash.com/photo-1659824807787-b80188e28f10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1426&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659795004677-f0f02d3b28ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659817003995-45eb5225ed86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659825216991-e79b56e23325?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659851854011-30f7e9893289?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1659733683446-5837c203be5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  }
];

function Main() {
  // TODO: Сделать компонент ивентов
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.posts}>
          <PostAdding />
          <PostContainer
            authorName={authorName1}
            text={text1}
            availability={availability1}
            imagesData={itemData1}
          />
          <PostContainer
            authorName={authorName2}
            text={text2}
            availability={availability2}
            imagesData={itemData2}
          />
          <PostContainer
            authorName={authorName3}
            text={text3}
            availability={availability3}
            imagesData={itemData3}
          />
          <PostContainer
            authorName={authorName4}
            text={text4}
            availability={availability4}
            imagesData={itemData4}
          />
          <PostContainer
            authorName={authorName5}
            text={text5}
            availability={availability5}
            imagesData={itemData5}
          />
          <PostContainer
            authorName={authorName6}
            text={text6}
            availability={availability6}
            imagesData={itemData6}
          />
        </div>
        <div className={styles.events}>
          <div>event 1</div>
          <div>event 2</div>
          <div>event 2</div>
          <div>event 2</div>
        </div>
      </div>
    </main>
  );
}

export default Main;
