import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import Stage1Page from "../Stage1Page/Stage1Page";
import Stage2Page from "../Stage2Page/Stage2Page";
import KategoriPage from "../KategoriPage/KategoriPage";
import PelulusStage1Page from "../PelulusStage1Page/PelulusStage1Page";
import PelulusStage2Page from "../PelulusStage2Page/PelulusStage2Page";
import CalonStage2Page from "../CalonStage2Page/CalonStage2Page";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "stage1":
                return <Stage1Page />;
case "stage2":
                return <Stage2Page />;
case "kategori":
                return <KategoriPage />;
case "pelulusStage1":
                return <PelulusStage1Page />;
case "pelulusStage2":
                return <PelulusStage2Page />;
case "calonStage2":
                return <CalonStage2Page />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
