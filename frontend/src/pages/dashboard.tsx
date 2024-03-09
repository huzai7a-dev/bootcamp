import ReleasesPerYearChart from '../components/ReleasePerYearChart';
import ProductionBudgetChart from './../components/ProductionBudgetChart';
const Dashboard = ()=> {
    return (
        <div>
            <ProductionBudgetChart/>
            <ReleasesPerYearChart/>
        </div>
    )   
}

export default Dashboard