import { useNavigate } from "react-router-dom";
import home from "../../assets/images/home.png";
import author from "../../assets/images/author.png";
import book from "../../assets/images/book.png";
import borrowing from "../../assets/images/borrowing.png";
import category from "../../assets/images/category.png";
import publisher from "../../assets/images/publisher.png";
import "./PageNavigation.styles.css"

function PageNavigation() {
  const navigations = [
    {name: "home", imgUrl: home, path: "/"},
    {name: "authors", imgUrl: author, path: '/authors'},
    {name: "books", imgUrl: book, path: '/books'},
    {name: "borrowings", imgUrl: borrowing, path: '/borrowings'},
    {name: "categories", imgUrl: category, path: '/categories'},
    {name: "publishers", imgUrl: publisher, path: '/publishers'}
  ]

  return (
    <div className="page-navigation">
      {navigations.map((item, index) => {
        return (
          <PageLink
            key={index}
            name={item.name} 
            path={item.path} 
            imgUrl={item.imgUrl} 
          />
        )
      })}
    </div>
  )
}

function PageLink({name, path, imgUrl}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  }

  return (
    <button key={name} className="page-link" onClick={handleClick}>
      <img src={imgUrl} alt={name}/>
      <span>{name}</span>
    </button>
  )
}

export default PageNavigation