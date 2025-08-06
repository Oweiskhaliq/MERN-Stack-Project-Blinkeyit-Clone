import { useState } from "react";
import CardLoading from "../components/CardLoading";

const SearchPage = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const loadingArray = new Array(10).fill(null);
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length} </p>

        {/* show product and loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* loading */}
          {loading &&
            loadingArray.map((_, index) => {
              return <CardLoading key={index} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
