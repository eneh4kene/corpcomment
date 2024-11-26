import { useFeedbackItemsContext } from "../lib/hooks";

type HashtagItemProp = {
  key: string;
  company: string;
  onSelectCompany: (companyName: string) => void;
};

export default function HashtagList() {
  const { companyList, handleSelectCompany } = useFeedbackItemsContext()
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem key={company} company={company} 
        onSelectCompany={handleSelectCompany}/>
      ))}
    </ul>
  );
}


function HashtagItem( { company, onSelectCompany }: HashtagItemProp) {
  return (
    <li>
      <button onClick={()=> {onSelectCompany(company)}}>#{company}</button>
    </li>
  )
}

