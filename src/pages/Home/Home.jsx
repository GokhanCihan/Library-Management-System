import PageNavigation from "../../components/PageNavigation";
import RandomQuote from "../../components/RandomQuote";
import "./Home.styles.css";

export default function Home() {
  
  return (
    <>
      <div className="start">
        <h1>Library Manager</h1>
        <RandomQuote />
      </div>
      <PageNavigation />
    </>
  )
}