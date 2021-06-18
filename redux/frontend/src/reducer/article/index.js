const initialState = {
    article : [],
  };
  
  ///////
  //reducer

  const article = (state = initialState, { type, payload }) => {
    switch (type) {
      case 'SET_ARTICLES':
        return { article: [...payload] };
  
      case 'ADD_ARTICLE':
        
  
        return { article: [...state.article, payload] };
      
      case 'UPDATE_ARTICLE':
        
        return {
            article: state.article.map((elem, i) => {
            if (elem._id === payload._id) {
              return payload;
            }
            return elem;
          }),
        };
  
     
  
      case 'DELETE_ARTICLE':
     
        return state.article.filter((elem) => elem._id !== payload._id);
  
      default:
        
        return state;
    }
  };
  
  export default article;





  /////////////////////////
  //action 

  export const setArticle = (articles) => {
    return {
      type: 'SET_ARTICLES',
      payload: articles,
    };
  };
  
  export const createArticle = (article) => {
    return {
      type: 'ADD_ARTICLE',
      payload: article,
    };
  };
  
  export const updateArticle = (article) => {
    return {
      type: 'UPDATE_ARTICLE',
      payload: article,
    };
  };
  
  export const deleteArticle = (article) => {
    return {
      type: 'DELETE_ARTICLE',
      payload: article,
    };
  };