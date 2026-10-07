import StatsCards from "./StatsCards";
import FeatureBanner from "./FeatureBanner";
import PopularBlocks from "./PopularBlocks";
import QuickLinks from "../QuickLinks/QuickLinks";
import "./Overview.scss";

const Overview = (props) => {



  return (
    <>
      <main className="guten-builder-overview-wraper">
        {/* Stats Cards */}
        <StatsCards {...props}/>

        {/* Feature / Video Banner Card */}
        <FeatureBanner {...props} />

        {/* Featured / Popular Blocks */}
        <PopularBlocks />

        {/* Help & Resources Quick Links */}
        <QuickLinks />
      </main>
    </>
  );
};

export default Overview;
